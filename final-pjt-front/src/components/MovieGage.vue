<template>
  <div>
    <h1>영화게이지MovieGage.vue </h1>
    <MovieGageEle
    v-for='(cnt, genre, index) in genresGage'
    :key='index'
    :genre='genre'
    :cnt='cnt'
    :genresGageSize='genresGageSize'/>


  </div>
</template>

<script>
import MovieGageEle from '@/components/MovieGageEle'

export default {
  name: 'MovieGage',
  data() {
    return {

    }
  },
  components: {
    MovieGageEle,
  },
  computed: {
    genresGage() {
      console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      return this.$store.state.genresGage
    },
    genresGageSize() {
      return this.$store.state.genresGageSize
    },
  },

  created() {
    // this.$store.dispatch('myMovieGenres')
  },
}
</script>

<style>

</style>