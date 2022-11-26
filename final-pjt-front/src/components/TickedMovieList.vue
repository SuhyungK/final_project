<template>
  <div class="p-3">
    <p class="h4 fw-bolder text-start"> 예매한 영화들</p>
    <hr>
    <!-- 임시 대체 이미지 -->
    <!-- <img style="width: 100%;" src="https://www.shutterstock.com/shutterstock/photos/2021147534/display_1500/stock-vector-concert-ticket-template-concert-party-or-festival-ticket-design-template-with-crowd-of-people-in-2021147534.jpg" alt=""> -->
    <div class="d-flex me-3">
      <TicketedMovie v-for='(movie, index) in myPayedMovies'
      :key='index'
      :movie='movie'/>
    </div> 
  </div>
</template>

<script>
import TicketedMovie from '@/components/TicketedMovie'

export default {
  name: 'TickedMovieList',
  data() {
    return {
      // myPayedMovies: this.$store.state.myPayedMovies
    }
  },
  components: {
    TicketedMovie,
  },
  computed: {
    myPayedMovies() {
      return this.$store.state.myPayedMovies
    }
  },
}
</script>

<style>

</style>