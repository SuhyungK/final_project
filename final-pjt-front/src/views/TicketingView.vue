<template>
  <!-- <h1>예매 페이지 TicketingView</h1> -->
  <div class="container">
    <!-- 배경이미지...? -->
    <div id="ticket-container" style="height: 300px;">
      <img :src="'https://image.tmdb.org/t/p/original' + movie.backdrop_path" alt="">
    </div>

    <!-- {{movie}} -->
    <!-- selectedTheaterData : {{selectedTheaterData}}<br> -->
    <!-- alreadyReserved : {{$store.state.alreadyReserved}} -->
    
    <div class="d-flex flex-column">
      
      <div style="margin-top: -30px; z-index: 10000;">
        <TicketingPoster :movie='movie'
          :selectedDate='selectedDate'
          :selectedTimeData='selectedTimeData'
          :selectedTheaterData='selectedTheaterData'
          @payment='payment'/>
      </div>
    
      <div class="">
        <DatePickerSelect class="border" @sendData='sendData'/>
        <!-- @reqClearResSeat='reqClearResSeat'/> -->
        <TicketingSeatSelect class="border" v-if='selectedTheaterData'
        :selectedTheaterData="selectedTheaterData"
        @payment='payment'/>
      </div>
    </div>

  </div>
</template>

<script>
import TicketingPoster from '@/components/TicketingPoster'
import TicketingSeatSelect from '@/components/TicketingSeatSelect'
import DatePickerSelect from '@/components/DatePickerSelect'

export default {
  name: 'TicketingView',

  components: {
    TicketingPoster,
    TicketingSeatSelect,
    DatePickerSelect,
  },
  data() {
    return {
      // movie: this.$route.params.movie,
      // movie: this.$store.state.movieinfo,
      selectedDate: null,
      selectedTimeData: null,
      selectedTheaterData: null,
    }
  },
  methods: {
    sendData(payload) {
      this.selectedTimeData = payload.time
      this.selectedTheaterData = payload.theater
      this.selectedDate = payload.date
    },
    payment() {
      const payload = {
        date: this.selectedDate,
        time: this.selectedTimeData,
        theater: this.selectedTheaterData,
        movieId: this.movie.movie_id
      }
      this.$store.dispatch('paymentMovie', payload)
    }
  },
  computed: {
    movie() {
      return this.$store.state.movieinfo
    }
  },
  updated() {
    // 상영관 까지 다 선택했을때
    if (this.selectedTheaterData) {
      const payload = {
        date: this.selectedDate,
        time: this.selectedTimeData,
        theater: this.selectedTheaterData,
        movieId: this.movie.movie_id
      }
      this.$store.dispatch('requestSeatInfoDB', payload)
    } else {
      this.$store.dispatch('clearSeat')
    }
  },
  beforeCreate() {
    const moviePk = this.$route.params.moviePk
    this.$store.dispatch('checkMovie', moviePk)
  }
}
</script>

<style>
#ticket-container {
  position: relative;
  overflow: hidden;
  box-shadow: inset 50px 50px 100px 50px white;
}

#ticket-container > img {
  filter: opacity(25%);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  object-fit: cover;
  
}
</style>