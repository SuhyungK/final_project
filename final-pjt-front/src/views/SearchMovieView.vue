<template>
  <div>
    <!-- 영화 여러개 검색됐을 때 보여지는 결과창 -->

  </div>
</template>

<script>
export default {
  name: 'SearchMovieView',
  created() {
    this.$store.dispatch('CLEAR_SEARCH_MOVIE_LIST')
  }
}
</script>

<style>

</style>