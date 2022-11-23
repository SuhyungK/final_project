<template>
  <div class="d-flex justify-content-center row">
    <div class="d-flex flex-column col-4 align-items-center" style="width: 300px;">
      <!-- 영화 예매에 들어갈 포스터 TicketingPoster.vue -->
      <img class="py-3 w-100" style="margin-top: -100px;" 
        :src='`https://image.tmdb.org/t/p/original${movie.poster_path}`' alt="no image">
    </div>
    <!-- <img class='mb-3 TicketingPosterimg' :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="image"> -->
    
    <!-- 예매 추가 정보 -->
    <div class="d-flex col-8 flex-column pt-5 px-3">
      <p class="h3 text-start h3" style="font-weight: 700;">{{movie.title}}</p>
      <h3 v-if='selectedDate'>영화 시작일: {{Datee}}</h3>
      <h3 v-if='selectedTimeData'>영화 시작 시간: {{Timee}}시</h3>
      <h3 v-if='selectedTheaterData'> 상영 {{selectedTheaterData}}관</h3>
      <h3 v-if='PON'>인원: {{ PON }}명</h3>
      <h3 v-if='PON'>가격: {{ price }}원</h3>
      <button v-if='price' @click="payment">결제하기</button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'TicketingPoster',
  props: {
    movie: Object,
    selectedDate: String,
    selectedTimeData: String,
    selectedTheaterData: Number,
  },
  computed: {
    Datee() {
      const D = this.selectedDate
      const YYYY = D.slice(0,4)
      const MM = D.slice(4,6)
      const DD = D.slice(6)
      return YYYY+'년 '+MM+'월 '+DD+'일'
    },
    Timee() {
      return this.selectedTimeData / 100
    },
    PON() {
      return this.$store.state.selectSeats.length
    },
    price() {
      return this.PON * 8000
    }
  },
  methods: {
    payment() {
      this.$router.push({name: 'PaymentView'})
      this.$emit('payment')
    }
  }
}
</script>

<style>
  .TicketingPosterimg {
    width: 350px;
    height: auto;

  }
</style>