<template>
<div>
  <h1>리뷰 작성 페이지 WriteReview.vue </h1>
  {{ movieId }}
  {{ userPk }}
  <form @submit.prevent="reviewC">
      <label for="content">content : </label>
      <input type="text" id="content" v-model='content'><br>

      <label for="rating"> rating: </label>
      <input type="rating" id="rating" v-model="rating"><br>

      <input type="submit" value="작성">
    </form>
  <hr>
</div>
</template>

<script>
export default {
  name: 'WriteReview',
  data() {
    return {
      userPk: this.$store.state.userInfo.userPk,
      content: null,
      rating: 0,
    }
  },
  props: {
    movieId: Number,
  },
  methods: {
    reviewC() {
      const movieId = this.movieId
      const content = this.content
      const rating = this.rating
      
      const payload = {
        movieId,
        content,
        rating,
      }
      this.$store.dispatch('reviewC', payload)
      this.content = null
      this.rating = 0
    },
  },

}
</script>

<style>

</style>