<template>
  <div>
    <h1>리뷰작성 {{movieId}},  {{userPk}}</h1>

    <form @submit.prevent="reviewC">
      <label for="content">content : </label>
      <input type="text" id="content" v-model='content'><br>
      <label for="rating"> rating: </label>
      <input type="rating" id="rating" v-model="rating"><br>

      <input type="submit" value="작성">
    </form>


  </div>
</template>

<script>
export default {
  name: 'TmpReviewC',
  data() {
    return {
      movieId: this.$route.params.movieId,
      userPk: this.$store.state.userInfo.userPk,
      content: null,
      rating: 0,
    }
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
    },
  },

}
</script>

<style>

</style>