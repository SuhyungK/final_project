<template>
  <div class="d-flex justify-content-center row mb-3">
    <div class="d-flex flex-column offset-1 col-3 align-items-center" style="width: 200px;">
      <!-- 영화 예매에 들어갈 포스터 TicketingPoster.vue -->
      <img class="py-3 w-100" style="margin-top: -100px;" 
        :src='`https://image.tmdb.org/t/p/original${movie.poster_path}`' alt="no image">
    </div>
    <!-- <img class='mb-3 TicketingPosterimg' :src="`https://image.tmdb.org/t/p/original${movie.poster_path}`" alt="image"> -->
    
    <!-- 예매 추가 정보 -->
    <div class="d-flex col-8 flex-column text-start px-3">
      <p class="h3 mb-3 p-1" style="font-weight: 700;">{{movie.title}}</p>

      <!-- 영화 예매 정보 뜨는데  -->
      <div class="row row-cols-2">
        <!-- 왼쪽 bar -->
        <div>
          <!-- 1. 영화 예매일(일시) -->
          <p v-if='!selectedDate' class="h4 p-1" style="color: #dee2e6;">일시 | 2022년 00월 00일 </p>
          <p v-if='selectedDate' class="h4 p-1 shadow-sm" >일시 | 
            <span style="color: #00ABB3; font-weight: 700;">{{Datee}}</span>
          </p>

          <!-- 2. 영화 상영 시간 -->
          <p v-if='!selectedTimeData' class="h4 p-1" style="color: #dee2e6;">시간 | 00:00</p>
          <p v-if='selectedTimeData' class="h4 p-1 shadow-sm">시간 | 
            <span style="color: #00ABB3; font-weight: 700;">:00</span>
          </p>
          
          <!-- 3. 상영관 -->
          <p v-if='!selectedTheaterData' class="h4 p-1" style="color: #dee2e6;"> 상영관 | 0관</p>
          <p v-if='selectedTheaterData' class="h4 p-1 shadow-sm"> 상영관 | 
            <span style="color: #00ABB3; font-weight: 700;">{{selectedTheaterData}}</span>관
          </p>
        </div>
        
        <!-- 오른쪽 -->
        <div v-if="selectedDate && selectedTimeData && selectedTheaterData">
          <!-- 4. 인원 -->
          <p class="h4 p-1" v-if='!PON' style="color: #dee2e6;">인원 | 0명</p>
          <p class="h4 p-1 shadow-sm" v-if='PON'>인원 |
            <span style="color: #00ABB3; font-weight: 700;">{{ PON }}</span>명
          </p>

          <!-- 5. 가격 -->
          <p class="h4 p-1" v-if='!PON' style="color: #dee2e6;">가격 | 0원</p>
          <p class="h4 p-1 shadow-sm" v-if='PON'>가격 | 
            <span style="color: #00ABB3; font-weight: 700;">{{ price }}</span>원
          </p>

          <!-- 6. 결제 버튼 --> 
          <button v-if='!price' class="rounded-pill p-2 w-100" 
            style="border: 0.15rem solid #dee2e6; color: #dee2e6; background-color: white;"
            @click="payment">결제하기</button>
          <button v-if='price' class="rounded-pill p-2 w-100"
            style="border: 0.15rem solid #00ABB3; color: white; background-color: #00ABB3;"
            @click="payment">결제하기</button>
        </div>
      </div>
      

      
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