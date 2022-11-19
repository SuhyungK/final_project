<template>
  <div>
    <p>리뷰들 AllReviews.vue</p>
    <p>평점 : {{ review.rating }}</p>
    <p>내용 : {{ review.content }}</p>
    <p>작성자 : {{ review.username }}</p>
    <p>좋아요 개수 : {{ review.like_users.length }} </p>
    <button v-if="!alradyLiked" @click="likeReview">임시 좋아요 버튼</button>
    <button v-if="alradyLiked" @click="likeReview">임시 좋아요 취소 버튼</button>
    <hr>

  </div>
</template>

<script>
export default {
  name: 'AllReviews',

  props: {
    review: Object,
    movieId: Number,
  },
  methods: {
    likeReview() {
      const payload = {
        reviewId: this.review.id,
        movieId: this.movieId,
      }
      this.$store.dispatch('likeReview', payload)
    }
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

}
</script>

<style>

</style>