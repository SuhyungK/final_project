import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)

const DJANGO_API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
    userInfo: null,
    tmpMovies : [],
    myLikeMovies : [], // 영화 pk 값
    myLikeMoviesDetail: [], // 영화 전체 정보
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
      // 토큰이 null 값이면 false, 아니면 true 사용자가 로그인했지 확인을 위해 사용
    }
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
    },
    CLEAR_TOKEN(state) {
      state.token = null
      state.userInfo = null
    },
    TMP_CALL_MOVIE(state, movies) {
      state.tmpMovies = movies
    },
    USER_SAVE(state, user) {
      const tmp = {
        userPk: user.pk,
        userName: user.name
      }
      state.userInfo = tmp      
    },
    MY_LIKE_MOVIE_DETAIL(state, movieList) {
      state.myLikeMoviesDetail = movieList
    }
  },
  actions: {
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2

      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/accounts/signup/`,
        data: {
          username, password1,password2
        }
      })
        .then((res) => {
          
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch((err) => {
          console.log(err)
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
          context.commit('SAVE_TOKEN', res.data.key)
          context.dispatch('getUser')
          // 로그인이 정상 작동하면 내가 좋아요한 영화 목록 불러오기
          // const userPk = context.state.userInfo.userPk
          context.dispatch('myLikeMovies')
          router.push({ name: 'IndexView'})
        })
        .catch((err) => {
          console.log(err)
        })
    },

    logOut(context) {
      console.log('로그아웃 버튼 누름')

      axios({
        method: 'get',
        url: `${DJANGO_API_URL}/accounts/logout/`,
        headers: {
          Authorization: `Token ${context.state.token}`
        }
      })
        .then((res) => {
          console(res)
        })
        .catch((err) => {
          console.log(err)
        })


      context.commit('CLEAR_TOKEN')
      // 로컬 저장소 삭제
      window.localStorage.clear()
    },

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
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
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
          console.log('유저 정보 소환!!!')
          context.commit('USER_SAVE', res.data)
        })
        .catch((err) => {
          console.log(err)
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
        .then((res) =>{
          console.log('좋아요 성공!')
          console.log(res)
          context.dispatch('myLikeMovies') // 내가 좋아요한 목록 갱신
        })
        .catch((err) => {
          console.log(err)
          console.log('좋아요 실패ㅜ')
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
          // console.log(context.state.myLikeMovies)
        })
        .catch((err) => {
          console.log(err)
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
      .then((res) =>{
        console.log('영화 추천 받기 성공!')
        console.log(res)

      })
      .catch((err) => {
        console.log(err)
        console.log('영화 추천 받기 실패!')
      })
    },

    // 좋아요한 영화 리스트 만들기 (영화 전체 정보)
    myLikeMoviesDetail(context) {
      const movieList = context.state.myLikeMovies
      console.log('!!!!', movieList)

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
        .catch((err) => {
          console.log(err)
          console.log('좋아요 영화 리스트(디테일) 만들기 실패!')
        })
    }


  },
  modules: {
  }
})
