<template>
  <div>
    <h1>예매 페이지</h1>
    <TicketingPoster/>
    <SelectorDate/>
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
  }

}
</script>

<style>

</style>