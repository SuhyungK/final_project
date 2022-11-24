<template>
  <div class="d-flex flex-column align-items-center">
    <!-- 영화 디테일에 들어갈 포스터 DetaialPoster.vue -->
    <img class="py-3" style="width: 200px; height: auto;" 
      :src='`https://image.tmdb.org/t/p/original${movie.poster_path}`' alt="no image">

    <!-- <button type="submit" id="button-submit" class="btn-floating mb-1 text-white">예매하기</button> -->

    <div id="clickButton" class="rounded-pill w-100 p-2" @click="toTicketing">예매하기</div>

    <!-- <button @click="toTicketing">포스터 하단에 예매하기 버튼</button> -->

  </div>
</template>

<script>
export default {
  name: 'DetailPoster',
  props:{
    // moviePostUrl: String,
    movie: Object,
  },
  data() {
  },
  computed: {
  },
  methods: {
    toTicketing() {
      // this.$router.push({ name: 'TicketingView' })
      this.$router.push({name:'TicketingView', params: {movie: this.movie}})
    }
  },
}
</script>

<style>
#clickButton {
  background-color: white;
  border: 0.17rem solid #00ABB3;
  color: #00ABB3;
  cursor: pointer;
}

#clickButton:hover {
  color: white;
  border-color: #00ABB3;
  background-color: #00ABB3;
}
</style>