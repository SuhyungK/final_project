<template>
  <div class="text-start row pt-2">

    <div class="col-2 px-3 pt-1">
      <!-- 프로필 이미지 -->
      <div id="review-profile" @click='toOtherProfile' class="rounded-circle" style="width: 65px; height: 65px;">
        <img src="https://img.asiatoday.co.kr/file/2021y/07m/16d/2021071601001598100096001.jpg" alt="IU">
      </div>
    </div>
    
    <!-- 리뷰 목록 -->
    <div class="col-10">

      <!-- 작성자 & 별점 -->
      <div class="d-flex justify-content-between">
        <div>
          <p class="d-inline-block fs-5 fw-bolder me-3">{{ review.username }}</p>
          <p class="d-inline-block">평점 : {{ review.rating }}</p>
        </div>
        <!-- 작성시간 -->
        <div>
          <p class="" style="font-size: 14px;">{{ $store.state.timeStamp }}</p>
        </div>
      </div>
      <!-- 내용 -->
      <p v-if="showReviewContent" class="mb-5" style="text-align: justify;">{{ updateReviewContent }}</p>
      <form @submit.prevent="putReview">
        <textarea v-if="!showReviewContent" type="text" class="form-control mb-2" :value="updateReviewContent" @input="updateReview"></textarea>
        <div v-if="!showReviewContent" class="text-end">
          <input type="submit" class="btn btn-primary mb-2">
        </div>
      </form>

      <!-- 좋아요 + 좋아요 개수  //  대댓글 작성하는 input창 띄우기-->
      <div class="d-flex justify-content-between" style="margin-bottom: -15px;">

        <div class="d-flex">
          <!-- 좋아요 누르기 + 좋아요 개수 -->
          <div class="d-flex">
            <!-- 좋아요 버튼 toggle -->
            <button v-if="!alreadyLiked" @click="likeReview" style="all: unset;"><i style="position: relative; top: -5px;" class="bi bi-heart fs-6 fw-bolder"></i></button>
            <button v-if="alreadyLiked" @click="likeReview"  style="all: unset;"><i style="position: relative; top: -5px;" class="bi bi-arrow-through-heart-fill fs-6 fw-bolder"></i></button>
            
            <!-- 좋아요 개수 -->
            <span class="fs-6 ms-2" style="">{{ review.like_users.length }} </span>
          </div>

          <!-- 대댓작성 창 띄우는 아이콘 -->
          <form @submit.prevent="createComment">
            <div class="ms-3" style="margin-top: 1px;">
              <i class="bi bi-chat-left fs-6 cursor-pointer" @click="commentInputShow=!commentInputShow"></i>
            </div>
          </form>
        </div>
        
        <!-- 수정 | 삭제 -->
        <div class="d-flex" style="font-size: 14px;">
          <!-- 수정 -->
          <div class="me-2" @click="showReviewContent=!showReviewContent">
            <p style="cursor: pointer;">수정</p> 
          </div> | 
          <div style="cursor: pointer;" class="ms-2" @click="deleteReview">
            삭제         
          </div>
        </div>
        
      </div>
      <hr>
      <!-- 대댓글 -->
      <!-- 대댓 작성 버튼 -->
      <!-- <button @click="show=!show">대댓글 보여주기</button>-->
      <!-- <Transition> -->
        <div v-show="commentInputShow">
          <form @submit.prevent="createComment">
            <div class="d-flex">
              <input type="text" class="form-control me-3" @input="inputComment" :value="comment">
              <input type="submit" value="댓글쓰기" class="btn btn-primary">
            </div>
          </form>
          <div v-for="comment in commentListC" :key="comment.id" class="mt-3">
            <p class="d-flex justify-content-between mb-0">
              <span class="fs-6 fw-bolder">{{ comment.username }}</span>
              <span style="font-size: 14px;">{{ timeCount(comment.created_at) }}</span>
            </p>
              <span class="" style="font-size: 14px;">{{ comment.content }}</span>
          </div>
        </div>
      <!-- </Transition>  -->
    </div>
    <hr class="mt-4">
    <!-- 리뷰들 AllReviews.vue -->
  </div>
</template>

<script>
import axios from 'axios'
import TimeCounting from 'time-counting'

export default {
  name: 'AllReviews',
  data() {
    return {
      commentInputShow: false,
      comment: null,
      DJANGO_API_URL: 'http://127.0.0.1:8000',
      commentList: [],
      nowTime: '',
      showReviewContent: true,
      updateReviewContent: this.review.content
    }
  },
  props: {
    review: Object,
    movieId: Number,  
  },
  computed: {
    liked() {
      return this.$store.state.myLikeReview
    },
    alreadyLiked() {
      // console.log('확인용', this.review.like_users.includes(this.$store.state.userInfo.userPk))
      return this.review.like_users.includes(this.$store.state.userInfo.userPk)
    },
    // reviewComment() {
    //   return this.$store.state.reviewComment
    // },
    commentListC() {
      return this.commentList
    },
    timeStamp() {
      this.$store.dispatch()
      return this.nowTimes()
    },
    changeReviewCotent() {
      return this.review.content
    },
  },
  methods: {
    likeReview() {
      const payload = {
        reviewId: this.review.id,
        movieId: this.movieId,
      }
      this.$store.dispatch('likeReview', payload)
    },
    // 리뷰에 댓글 작성 메서드
    createComment() {
      axios({
        method: 'post',
        url: `${this.DJANGO_API_URL}/movies/comment/${this.review.id}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
        data: {
          content: this.comment,
        }
      })
        .then((res) => {
          console.log(res)
          this.getAllComments()
        })
    },
    inputComment(e) {
      this.comment = e.target.value
    },
    getAllComments() {
      axios({
        method: 'get',
        url: `${this.DJANGO_API_URL}/movies/comment/${this.review.id}/`,
        headesr: {
          Authorization: `Token ${this.$store.state.token}`
        },
    })
      .then((res) => {
        // console.log(res.data)
        this.commentList = res.data
        this.comment = ''
      })
      .catch((err) => {
        console.log(err)
      })
    },
    // 리뷰 아래 아이콘 클릭 했을 때 각 리뷰에 달린 댓글 조회
    reviewComments() {
      axios({
        method: 'get',
        url: `${this.DJANGO_API_URL}/comments/${this.review.id}/`,
        headesr: {
          Authorization: `Token ${this.$store.state.token}`
        },
      })
        .then((res) => {
          console.log(res)
        })
    },
    toOtherProfile() {
      console.log('확인',this.review.username)
      this.$store.dispatch('otherUserNameSave', this.review.username)
      this.$router.push(`/profile/${this.review.username}`)

    },
    // setDate() {
    //   let year = new Date().getFullYear()
    //   let month = new Date().getMonth() + 1 < 10? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1
    //   let date = new Date().getDate() < 10? "0" + new Date().getDate(): new Date().getDate()
    //   let hh = new Date().getHours() < 10? "0" + new Date().getHours(): new Date().getHours()
    //   let mm = new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes()
    //   let ss = new Date().getSeconds() < 10? "0" + new Date().getSeconds(): new Date().getSeconds()

    //   return {
    //     'year': year, 'month': month, 'date': date, 'hh': hh, 'mm': mm, 'ss': ss
    //   }
    // }, 
    // nowTimes() {
    //   this.nowTime = this.setDate().year + "-" + this.setDate().month + "-" + this.setDate().date + " " + this.setDate().hh + ":" + this.setDate().mm + ":" + this.setDate().ss
    // },
    timeCount(targetTime) {
      this.$store.dispatch('setDate')

      const option = {
        lang: "ko",
        objectTime: this.nowTime,
        calculate: {
          justNow: 60
        }
      }

      return TimeCounting(targetTime, option)
    },
    // 댓글 수정
    putReview() {
      if (this.review.content != this.updateReviewContent) {
        const DJANGO_API_URL = 'http://127.0.0.1:8000'
        const content = this.updateReviewContent
        const reviewId = this.review.id

        axios({
          method: 'put',
          url: `${DJANGO_API_URL}/movies/review/${reviewId}/`,
          headers: {
            Authorization: `Token ${this.$store.state.token}`
          },
          data: {
            content 
          }
        }) 
          .then((res) => {
            this.updateReviewContent = res.data.content
            this.showReviewContent = true
            this.$store.dispatch('movieReviews', this.movieId)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    // 실시간 댓글 변경사항 반영
    updateReview(e) { 
      this.updateReviewContent = e.target.value
    },
    deleteReview() {
      const DJANGO_API_URL = 'http://127.0.0.1:8000'
      const reviewId = this.review.id

      axios({
        method: 'delete',
        url: `${DJANGO_API_URL}/movies/review/${reviewId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
      }) 
        .then(() => {
          this.$store.dispatch('movieReviews', this.movieId)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  },
  mounted() {
    this.getAllComments()
  },
  created() {
    this.$store.dispatch('timeCount', this.review.created_at)
  }
}
</script>

<style>
#review-profile {
  overflow: hidden;
}

#review-profile > img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>