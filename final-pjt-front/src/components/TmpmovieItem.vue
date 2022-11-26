<template>
  <div>
    <h5 @click='createReview'>{{ movie.title }}, {{movie.id}}</h5>
    <button v-if="!alradyLiked" @click="likeMovie">임시 좋아요 버튼</button>
    <button v-if="alradyLiked" @click="likeMovie">임시 좋아요 취소 버튼</button>
    {{alradyLiked}}
    {{liked}}
  </div>
</template>

<script>
export default {
  name: 'TmpmovieItem',
  props: {
    movie: Object
  },
  methods: {
    createReview() {
      this.$router.push({name: 'TmpReviewC', params:{movieId: this.movie.movie_id}})
    },
    likeMovie() {
      this.$store.dispatch('likeMovie', this.movie.movie_id)
    }
  },
  computed: {
    liked() {
      return this.$store.state.myLikeMovies
    },
    alradyLiked() {
      return this.liked.includes(this.movie.id)
    }
  }
}
</script>

<style>

</style>