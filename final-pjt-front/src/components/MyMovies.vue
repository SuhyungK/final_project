<template>
  <div>
    <h3>내가 관심있는 영화 MyMovies.vue</h3>
    <button @click="toMovieDetail">영화 상세 페이지 이동</button>
    <button @click="ticketing">예매하기</button>
  </div>
</template>

<script>
export default {
  name: 'MyMovies',
  methods: {
    ticketing() {
      this.$router.push({name:'TicketingView'})
    },
    toMovieDetail() {
      console.log('MyMovies.vue 에서 toMovieDetail 함수 실행')
      this.$router.push({name:'MovieDetailView'})
      console.log('dssdds')
    }
  }
}
</script>

<style>

</style>