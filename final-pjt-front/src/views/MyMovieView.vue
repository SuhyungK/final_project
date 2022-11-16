<template>
  <div>
    <h1>관심영화 페이지</h1>
    <MymovieList/>
  </div>
</template>

<script>
import MymovieList from '@/components/MymovieList'
export default {
  name: 'MyMovieView',
  components: {
    MymovieList,
  }

}
</script>

<style>

</style>