<template>
  <div class="text-start row">

    <div class="col-2 px-3 pt-1">
      <!-- 프로필 이미지 -->
      <div id="review-profile" class="rounded-circle" style="width: 65px; height: 65px;">
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
        <div>
          <p class="fs-6">{{ review.created_at.substring(0, 10) }}</p>
        </div>
      </div>
      <!-- 내용 -->
      <p>내용 : {{ review.content }}</p>

      <!-- 좋아요 + 좋아요 개수 -->
      <p>좋아요 개수 : {{ review.like_users.length }} </p>
      <button v-if="!alradyLiked" @click="likeReview">임시 좋아요 버튼</button>
      <button v-if="alradyLiked" @click="likeReview">임시 좋아요 취소 버튼</button>
      
      <hr>
      <!-- 대댓글 -->
      <!-- 대댓 작성 버튼 -->
      <button @click="show=!show">대댓글 보여주기</button>
      <Transition>
        <div v-if="show">
          <form @submit.prevent="createRecomment">
            <input type="text" class="form-control" @input="inputRecomment" :value="recomment">
            <input type="submit">
          </form>
        </div>
      </Transition>
      
    </div>
    <hr class="mt-4">
    <!-- 리뷰들 AllReviews.vue -->
  
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AllReviews',
  data() {
    return {
      show: false,
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
    alradyLiked() {
      console.log('좋아요 했는지 확인')
      return this.liked.includes(this.review.id)
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
    createRecomment() {
      const DJANGO_API_URL = 'http://127.0.0.1:8000'
      const reviewId = this.review.id

      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/movies/comment/${reviewId}/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        },
        data: {
          content: this.recomment,
        }
      })
        .then((res) => {
          console.log(res)
        })
    },
    inputRecomment(e) {
      this.recomment = e.target.value
    },
  },
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