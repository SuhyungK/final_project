<template>
  <div>
    <h1>예매 페이지 TicketingView</h1>
    selectedTheaterData : {{selectedTheaterData}}<br>
    <!-- alreadyReserved : {{$store.state.alreadyReserved}} -->
    
    <div class='d-flex flex-row'>
    <TicketingPoster :movie='movie'
    :selectedDate='selectedDate'
    :selectedTimeData='selectedTimeData'
    :selectedTheaterData='selectedTheaterData'
    @payment='payment'/>
      <div>
        <DatePickerSelect @sendData='sendData'/>
        <!-- @reqClearResSeat='reqClearResSeat'/> -->
        <TicketingSeatSelect v-if='selectedTheaterData'
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
      movie: this.$route.params.movie,

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
        movieId: this.movie.id
      }
      this.$store.dispatch('paymentMovie', payload)
    }
  },
  computed: {
  },
  updated() {
    // 상영관 까지 다 선택했을때
    if (this.selectedTheaterData) {
      const payload = {
        date: this.selectedDate,
        time: this.selectedTimeData,
        theater: this.selectedTheaterData,
        movieId: this.movie.id
      }
      this.$store.dispatch('requestSeatInfoDB', payload)
    } else {
      this.$store.dispatch('clearSeat')
    }
  }
}
</script>

<style>

</style>