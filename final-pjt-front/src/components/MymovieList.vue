<template>
  <div>
    <h3>관심있는 영화 리스트 MymovieList.vue</h3>
    <MyMovies/>
  </div>
</template>

<script>
import MyMovies from '@/components/MyMovies'
export default {
  name: 'MymovieList',
  components: {
    MyMovies,
  }
}
</script>

<style>

</style>