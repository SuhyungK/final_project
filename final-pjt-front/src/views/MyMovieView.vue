<template>
  <div>
    <h1>관심영화 페이지 MyMovieView.vue</h1>
    <!-- <MymovieList/> -->
    <MyMovies
    v-for='movie in myLikeMoviesDetail'
    :key='movie.id'
    :movie='movie'/>
  </div>
</template>

<script>
// import MymovieList from '@/components/MymovieList'
import MyMovies from '@/components/MyMovies'
export default {
  name: 'MyMovieView',
  components: {
    // MymovieList,
    MyMovies,
  },
  computed: {
    myLikeMoviesDetail() {
      return this.$store.state.myLikeMoviesDetail
    }
  }
}
</script>

<style>

</style>