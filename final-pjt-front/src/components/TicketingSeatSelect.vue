<template>
  <div>
    <h3>좌석선택 TicketingSeatSelect.vue</h3>
    {{$store.state.selectSeats}}
    <h5>{{$store.state.alreadyReserved}}</h5>
    <!-- 5x5 열 -->
    <div v-if="selectedTheaterData">
      <div class='d-flex flex-row' v-for='i in 5' :key='i'>
        <TicketingSeat v-for='j in 5' :key='j' :seatNum='String(i)+String(j)'/>
      </div>
    </div>

    <button @click='payment'>결제하기</button>
  </div>
</template>

<script>
import TicketingSeat from '@/components/TicketingSeat'

export default {
  name: 'TicketingSeatSelect',
  components: {
    TicketingSeat,
  },
  props: {
    selectedTheaterData: Number,
  },
  methods: {
    payment() {
      this.$router.push({name: 'PaymentView'})
      this.$emit('payment')
    }
  },
  beforeCreate() {
    this.$store.dispatch('clearReversedSeat')
  }
}
</script>

<style>


</style>