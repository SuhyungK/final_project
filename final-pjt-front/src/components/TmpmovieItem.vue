<template>
  <div>
    <h5 @click='createReview'>{{ movie.title }}, {{movie.id}}</h5>
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
      this.$router.push({name: 'TmpReviewC', params:{movieId: this.movie.id}})
    }
  }
}
</script>

<style>

</style>