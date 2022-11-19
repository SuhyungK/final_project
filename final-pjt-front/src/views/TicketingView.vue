<template>
  <div>
    <h1>예매 페이지 TicketingView</h1>
    <TicketingPoster/>
    <SelectorDate :movieId='movie.id'/>
    <SelectorSeat/>
  </div>
</template>

<script>
import TicketingPoster from '@/components/TicketingPoster'
import SelectorDate from '@/components/SelectorDate'
import SelectorSeat from '@/components/SelectorSeat'

export default {
  name: 'TicketingView',
  components: {
    TicketingPoster,
    SelectorDate,
    SelectorSeat,
  },
  data() {
    return {
      movie: this.$route.params.movie,
    }
  }

}
</script>

<style>

</style>