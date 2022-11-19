<template>
  <div>
    <h3>영화 디테일에 들어갈 포스터 DetaialPoster.vue</h3>
    <img style="width: 200px; height: auto;" :src='`https://image.tmdb.org/t/p/original${moviePostUrl}`' alt="no image">
    <button @click="toTicketing">포스터 하단에 예매하기 버튼</button>
  </div>
</template>

<script>
export default {
  name: 'DetailPoster',
  props:{
    moviePostUrl: String,
  },
  methods: {
    toTicketing() {
      this.$router.push({ name: 'TicketingView' })
    }
  },
}
</script>

<style>

</style>