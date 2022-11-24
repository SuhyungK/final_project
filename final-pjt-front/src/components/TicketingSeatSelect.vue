<template>
  <div class='back rounded pb-5'>
    <!-- <h3>좌석선택 TicketingSeatSelect.vue</h3> -->

    <div class='d-flex justify-content-center rrrr mb-3'>
      <div class='screen'></div>
    </div>
    <!-- 5x5 열 -->
    <div v-if="selectedTheaterData" class='d-flex flex-column align-items-center'>
      <div class='d-flex flex-row' v-for='i in 5' :key='i'>
        <TicketingSeat v-for='j in 7' :key='j' :seatNum='String(i)+String(j)'/>
      </div>
    </div>

    <!-- <button @click='payment'>결제하기</button> -->
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
.screen {
  /* border: 1px solid red; */
  background-color: #fff;
  /* background-color: rgb(221, 254, 100); */
  height: 150px;
  width: 90%;
  margin: 15px 0;
  transform: rotateX(-45deg);
  box-shadow: 0 3px 10px rgba(255, 255, 255, 0.7);
}
.back {
  background-color: #242333;
}

.rrrr {
  perspective: 1000px;
  margin-bottom: 30px;
}

</style>