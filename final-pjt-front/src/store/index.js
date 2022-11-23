import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'
import TimeCounting from 'time-counting'

Vue.use(Vuex)

const DJANGO_API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
    userInfo: null, // {userPk, useName}
    tmpMovies : [],
    myLikeMovies : [], // 내가 좋아요한 영화 pk 값
    myLikeMoviesDetail: [], // 영화 전체 정보
    myBadges: [],  // 내 뱃지들
    defaultBadges: [], // 뱃지 표본
    myReview: [], // 사용자가 쓴 리뷰
    movieReviews: [], // 특정 영화에 대한 리뷰들
    myLikeReview: [], // 내가 좋아요한 리뷰 pk 값 
    searchMovieResults: [], // 검색한 영화 정보
    selectSeats: [], // 선택한 좌석들
    alreadyReserved: [], // 이제 결제된 좌석들
    myPayedMovies: [], // 내가 예매(구매)한 영화
    genresGage: {}, // 프로필에 장르게이지에 쓸거
    genresGageSize: 0, // 장르게이지 전체 크기
    recommendMovies: [], // 알고리즘 기반 추천영화 목록
    otheruser: null, // 프로필 이동할때 목적으로 하는 다른 유저 이름
    followingsList: [], // 팔로잉 리스트(유저 pk)
    followsList: [], // 팔로우 리스트(유저 pk)
    nowTimes: '',
    timeStamp: '',
    TopReviewMovies: [], // 리뷰 좋아요 순 출력
    movieinfo: [] // 특정 영화에 대한 정보
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
      // 토큰이 null 값이면 false, 아니면 true 사용자가 로그인했지 확인을 위해 사용
    },
    countReview(state) {
      return state.myReview.length
      // 사용자가 작성한 리뷰 개수 = 뱃지 획득여부에 사용
    },
    countPayedMovie(state) {
      return state.myPayedMovies.length
      // 사용자가 예매한 영화 개수 = 뱃지 획득여부에 사용
    },
    isFollowed(state) {
      return state.followingsList.includes(state.userInfo.userPk)
    },
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
    },
    CLEAR_TOKEN(state) {
      state.token = null
      state.userInfo = null
      state.myBadges =  []
      state.myReview = []
    },
    TMP_CALL_MOVIE(state, movies) {
      state.tmpMovies = movies
    },
    USER_SAVE(state, user) {
      const tmp = {
        userPk: user.pk,
        userName: user.username
      }
      state.userInfo = tmp      
    },
    MY_LIKE_MOVIE_DETAIL(state, movieList) {
      state.myLikeMoviesDetail = movieList
    },
    MY_BADGES(state, badges) {
      state.myBadges = badges
    },
    DEFAULT_BADGES(state, badges) {
      state.defaultBadges = badges
    },
    MY_REVIEWS(state, reviews) {
      state.myReview = reviews
    },
    MOVIE_REVIEWS(state, reviews) {
      state.movieReviews = reviews
    },
    SAVE_SEARCH_MOVIE(state, searchMovieList) {
      state.searchMovieResults = searchMovieList
    },
    SELECT_SEAT(state, info) {
      const i = info.i
      const j = info.j
      state.selectSeats.push([i,j])
    },
    CANCEL_SEAT(state, info) {
      console.log("좌석빼기")
      const i = info.i
      const j = info.j
      const arr = [i,j]

      const filtered = state.selectSeats.filter((ele) => JSON.stringify(ele) != JSON.stringify(arr))
      state.selectSeats = filtered
    },
    CLEAR_SEAT(state) {
      state.selectSeats = []
    },
    CLEAR_REVERSED_SEAT(state) {
      state.alreadyReserved = []
    },
    REQ_MY_PAYED_MOVIES(state, data) {
      state.myPayedMovies = data
    },
    MYGENRE_GAGE(state, data) {
      state.genresGage = data.genredict
      state.genresGageSize = data.cnt
    },
    ALGORITHEM_RECOMMENDED_MOVIES(state, data) {
      state.recommendMovies = data
    },
    OTHER_USER_NAME_SAVE(state, name) {
      state.otheruser = name
    },
    REQ_FOLLOWING_LIST(state, data) {
      state.followingsList = data.followings_list
    },
    REQ_FOLLOW_LIST(state, data) {
      state.followsList = data.follows_list
    },
    SET_DATE(state, time) {
      state.nowTimes = time
    },
    TOP_REVIWE_MOVIE(state, data) {
      state.TopReviewMovies = data
    },
    CHECK_MOVIE(state, data) {
      state.movieinfo = data
    }
  },
  actions: {
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2
      console.log(context)
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/accounts/signup/`,
        data: {
          username, password1,password2
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
          context.dispatch('initialBadge')
        })
        .catch(() => {
          console.log('회원가입 실패!')
          // 회원가입 정보 유효성 통과 못하면 다시 회원가입 페이지로
          router.push({ name: 'SignUpView'})
        })
    },

    logIn(context, payload) {
      const username = payload.username
      const password = payload.password
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
        .then((res) => {
          console.log('로그인 성공!')
          context.commit('SAVE_TOKEN', res.data.key)
          context.dispatch('getUser')
          // 로그인이 정상 작동하면 내가 좋아요한 영화 목록 불러오기
          // const userPk = context.state.userInfo.userPk
          context.dispatch('myLikeMovies')
          router.push({ name: 'IndexView'})
        })
        .catch((err) => {
          console.log('로그인 실패!')
          console.log(err)
        })
    },

    logOut(context) {
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/accounts/logout/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          console.log('로그아웃 성공!')
          console.log(res)
        })
        .catch((err) => {
          console.log('로그아웃 실패!!')
          console.log(err)
        })

      context.commit('CLEAR_TOKEN')
      // 로컬 저장소 삭제
      window.localStorage.clear()
    },

    // 전체 영화 데이터 소환
    tmpCallMovie(context) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/movies/tmp_list/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          context.commit('TMP_CALL_MOVIE', res.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    
    //임시
    reviewC(context, payload) {
      const movieId = payload.movieId
      const content = payload.content
      const rating = payload.rating

      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/movies/tmp_reviewC/${movieId}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          movie: movieId,
          content,
          rating
        }
      })
        .then(() => {
          console.log('리뷰작성 완료!')
          context.dispatch('movieReviews', movieId)
        })
        .then(() => {
          context.dispatch('badgeUpdate') // 리뷰 작성 후 뱃지 업데
        })
        .catch(() => {
          console.log('리뷰작성 실패!')
          console.log()
        })
    },

    // 유저 pk 등 로그인한 유저 정보 필요할때 사용
    getUser(context) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/accounts/user/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) =>{
          console.log('유저 정보 소환!!!', res.data)
          context.commit('USER_SAVE', res.data)
          return context.state.userInfo.userPk
        })
        .catch(() => {
          console.log('유저 정보 소환실패!!!')
        })
    },

    // 영화 좋아요
    likeMovie(context, movie_pk) {
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/movies/like/${movie_pk}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then(() =>{
          console.log('영화 좋아요 성공!')
          context.dispatch('myLikeMovies') // 내가 좋아요한 목록 갱신
        })
        .catch(() => {
          console.log('영화 좋아요 실패ㅜ')
        })
    },

    // 유저가 좋아요한 영화 목록 뽑기
    myLikeMovies(context) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/movies/like-list/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) =>{
          console.log('좋아요 목럭 불러오기 성공!')
          context.state.myLikeMovies = res.data.liked
        })
        .catch(() => {
          console.log('좋아요 목럭 불러오기 실패!')
        })
    },

    // 영화 추천 받기
    algorithm(context) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/movies/algorithm/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
      .then(() =>{
        console.log('영화 추천 받기 성공!')
      })
      .catch(() => {
        console.log('영화 추천 받기 실패!')
      })
    },

    // 좋아요한 영화 리스트 만들기 (영화 전체 정보)
    myLikeMoviesDetail(context) {
      const movieList = context.state.myLikeMovies

      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/movies/like-list-Detail/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          movieList
        }
      })
        .then((res) =>{
          console.log('좋아요 영화 리스트(디테일) 만들기 성공!')
          context.commit('MY_LIKE_MOVIE_DETAIL', res.data)

        })
        .catch(() => {
          console.log('좋아요 영화 리스트(디테일) 만들기 실패!')
        })
    },

    // 회원가입후 초기 뱃지 생성(미획득 상태)
    initialBadge(context) {
      context.dispatch('getUser')
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/badges/initailBadge/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then(() => {
          console.log('초기 뱃지 목록 생성!')
        })
        .catch(() => {
          console.log('초기 뱃지 목록 생성 실패!!')
        })
    },

    // 지금 내 뱃지들 불러오기
    myBadges(context, name) {
      const username = name
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/badges/mybages/${username}`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then((res) => {
          console.log('내 뱃지들 불러오기 성공!')
          context.commit('MY_BADGES', res.data)
        })
        .catch(() => {
          console.log('내 뱃지들 불러오기 실패!')
        })
    },

    // 배지 표본들 불러오기
    defaultBadges(context) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/badges/defaultbadges/`,
      })
        .then((res) => {
          console.log('배지 표본들 불러오기 성공')
          context.commit('DEFAULT_BADGES', res.data)
        })
        .catch(() => {
          console.log('배지 표본들 불러오기 실패')
        })
      },
    
    // 사용자가 작성한 리뷰 조회
    myReview(context, username) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/movies/my-review/${username}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then((res) => {
          console.log('내가 작성한 리뷰 조회 성공!')
          context.commit('MY_REVIEWS', res.data) 
        })
        .then(() => {
          context.dispatch('myBadges', username) // 내 뱃지 업데이트
        })
        .catch(() => {
          console.log('내가 작성한 리뷰 조회 실패!')
        })
    },
    
    // 뱃지 얻을 수 있는거 얻기
    badgeUpdate(context) {

      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/badges/badgeUpdate/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          reviewCount : context.getters.countReview,
          payedMovieCount : context.getters.countPayedMovie,
        }
      })
        .then((res) => {
          console.log(res, '뱃지 업데이트 성공!')
        })
        .catch(() => {
          console.log('뱃지 업데이트 실패!')
        })
    },

    // 특정 영화에 대한 리뷰들 불러오기
    movieReviews(context, movie_pk) {
      axios({
        methods: 'get',
        url: `${DJANGO_API_URL}/movies/reviews/${movie_pk}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        params: {
          movie_pk
        }
      })
        .then((res) => {
          console.log('특정 영화 리뷰들 불러오기 성공')
          context.commit('MOVIE_REVIEWS', res.data)
        })
        .catch(() => {
          console.log('특정 영화 리뷰들 불러오기 실패')
        })
    },

    // 리뷰 좋아요 기능
    likeReview(context, payload) {
      const reviewId = payload.reviewId
      const movieId = payload.movieId
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/movies/like-review/${reviewId}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then(() => {
          console.log('리뷰 좋아요 성공!')
          context.dispatch('myLikeReview')
        })
        .then(() => {
          // 좋아요 실시간 반영을 위해 리뷰목록 다시 불러와야함
          context.dispatch('movieReviews', movieId)
        })
        .catch(() => {
          console.log('리뷰 좋아요 실패!')
        })
    },

    // 내가 좋아요한 리뷰 리스트 갱신하기
    myLikeReview(context) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/movies/like-reviews-list/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) =>{
          console.log('좋아요한 리뷰 목록 불러오기 성공!')
          context.state.myLikeReview = res.data.liked
        })
        .catch(() => {
          console.log('좋아요한 리뷰 목록 불러오기 실패!')
        })
    },

    // 예매 관련 함수들 ##################################
    // 선택한 좌석에 추가
    selectSeat(context, payload) {
      console.log('좌석 선택')
      context.commit('SELECT_SEAT', payload)
    },
    // 선택한 좌석 선택 취소
    cancelSeat(context, payload) {
      console.log('좌석 선택 취소')
      context.commit('CANCEL_SEAT', payload)
    },
    // 선택한 좌석 비우기
    clearSeat(context) {
      console.log('선택한 좌석 클리어')
      context.commit('CLEAR_SEAT')
    },
    // 예약된 죄석 배열 초기화
    clearReversedSeat(context) {
      console.log('sdsdsss')
      context.commit('CLEAR_REVERSED_SEAT')
    },
    // 날짜, 시간, 상영관 선택 다했어 이 time 테이블 기준으로
    // 좌석 테이블 가져와
    requestSeatInfoDB(context, payload) {
      const time = payload.time
      const theater = payload.theater
      const date = payload.date
      const movieId = payload.movieId

      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/ticketings/request-seat-data/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          date, time, theater, movieId,
        }
      })
        .then((res)=> {
          console.log('좌석정보 불러옴', res)
          // alreadyReserved 에 저장하러 ㄱㄱ
          // context.commit('ALREADY_RESERVED', res.data)
          context.state.alreadyReserved = res.data
        })
        .catch(() => {
          console.log('좌석정보 불러오기 실패함')
        })
    },
    paymentMovie(context, payload) {
      const time = payload.time
      const theater = payload.theater
      const date = payload.date
      const movieId = payload.movieId
      const selectSeats = context.state.selectSeats
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/ticketings/payment/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          date, time, theater, movieId,selectSeats
        }
      })
        .then(() => {
          console.log('결제한 좌석 정보 저장 성공')
          context.dispatch('badgeUpdate')
          context.dispatch('algorithmRecommendedMovies')
        })
        .catch(() => {
          console.log('결제한 좌석 정보 저장 실패')
        })
    },
    // 예매한 영화 목록 가져오기
    reqMyPayedMovies(context, username) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/ticketings/my-payed-movies/${username}`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          console.log('내가 예매한 영화 목록 가져오기 성공')
          context.commit('REQ_MY_PAYED_MOVIES', res.data)
        })
        .then(() => {
          context.dispatch('myMovieGenres')
        })
        .catch(() => {
          console.log('내가 예매한 영화 목록 가져오기 실패')
        })
    },
    // ########################################################예매 관련

    // 영화 게이지 장르 뽑기 예매한 영화 기준
    myMovieGenres(context) {
      const myMovies = context.state.myPayedMovies
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/movies/genres-gage/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
        data: {
          myMovies
        }
      })
        .then((res) => {
          console.log('장르게이지 데이터 뽑아내기 성공')
          context.commit('MYGENRE_GAGE', res.data)
        })
        .catch(() => {
          console.log('장르게이지 데이터 뽑아내기 실패')
        })
    },

    // 시간 계산 함수
    setDate(context) {
      let year = new Date().getFullYear()
      let month = new Date().getMonth() + 1 < 10? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1
      let date = new Date().getDate() < 10? "0" + new Date().getDate(): new Date().getDate()
      let hh = new Date().getHours() < 10? "0" + new Date().getHours(): new Date().getHours()
      let mm = new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes()
      let ss = new Date().getSeconds() < 10? "0" + new Date().getSeconds(): new Date().getSeconds()
      
      this.nowTime = year + "-" + month + "-" + date + " " + hh + ":" + mm + ":" + ss
      
      context.commit('SET_DATE', this.nowTime)
    }, 
    
    // 시간 차이 계산
    timeCount(context, targetTime) {
      context.dispatch('setDate')

      const option = {
        lang: "ko",
        objectTime: this.nowTimes,
        calculate: {
          justNow: 60
        }
      }

      context.state.timeStamp = TimeCounting(targetTime, option)
    },

    // 알고리즘 영화 목록 뽑기.
    algorithmRecommendedMovies(context) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/movies/algorithm/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
       .then((res) => {
          console.log('알고리즘 기반 영화 추천 받기 성공')
          context.commit('ALGORITHEM_RECOMMENDED_MOVIES', res.data)
       })
       .catch(() => {
        console.log('알고리즘 기반 영화 추천 받기 실패')
       })
    },

    // 이동할 프로필 유저(다른 사람)
    otherUserNameSave(context, name) {
      context.commit('OTHER_USER_NAME_SAVE', name)
    },

    // 아무개를 팔로우 하고 있는 사람들 목록 뽑기
    reqFollowingsList(context, username) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/profile/followings-list/${username}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then((res) => {
          console.log('프로필 주인 팔로잉 목록 소환 성공')
          context.commit('REQ_FOLLOWING_LIST', res.data)
        })
        .catch(() => {
          console.log('프로필 주인 팔로잉 목록 소환 실패')
        })
    },
    // 팔로우 리스트 요청
    reqFollowsList(context, username) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/profile/follows-list/${username}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then((res) => {
          console.log('프로필 주인 팔로우 목록 소환 성공')
          context.commit('REQ_FOLLOW_LIST', res.data)
        })
        .catch(() => {
          console.log('프로필 주인 팔로우 목록 소환 실패')
        })
    },
    doFollow(context, username) {
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/profile/follow/${username}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then(() => {
          console.log('팔로우 기능 무사히 수행!')
          context.dispatch('reqFollowingsList', username)
        })
        .catch(() => {
          console.log('팔로우 기능 실패!')
        })
    },
    topReviewMovie(context) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/movies/top-review-movie/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
        .then((res) => {
          console.log('리뷰 좋아요순 정렬 성공')
          const tmp = JSON.parse(res.data.res)
          context.commit('TOP_REVIWE_MOVIE', tmp)
        })
        .catch(() => {
          console.log('리뷰 좋아요순 정렬 실패')
        })
    },
    // 특정 영화 조회하기
    checkMovie(context, moviePk) {
      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/movies/movie-infomation/${moviePk}/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        },
      })
       .then((res) => {
        console.log('특정 영화 정보 조회 성공')
        context.commit('CHECK_MOVIE', res.data)
       })
       .catch(() => {
        console.log('특정 영화 정보 조회 실패')
       })

    }
  },
  modules: {
  }
})
