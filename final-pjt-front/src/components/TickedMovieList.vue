<template>
  <div>
    <h3> 예매한 영화들 TickedMovieList.vue </h3>
    <TicketedMovie v-for='(movie, index) in myPayedMovies'
    :key='index'
    :movie='movie'/>

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