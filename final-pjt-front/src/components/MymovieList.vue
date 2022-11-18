<template>
  <div>
    <h3>관심있는 영화 리스트 MymovieList.vue</h3>

    <MyMovies
    v-for='movie in myLikeMoviesDetail'
    :key='movie.id'
    :movie='movie'/>

  </div>
</template>

<script>
import MyMovies from '@/components/MyMovies'
export default {
  name: 'MymovieList',
  components: {
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