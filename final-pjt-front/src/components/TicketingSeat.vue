<template>
  <div :class="{ 'maginR': (j == 2), 'maginL': (j == 6), 'maginLi': (j == 1), 'maginRi': (j == 7)}">
  <!-- <div :class="{ (j == 2)? 'maginR': '', (j == 6)? 'maginL': ''}"> -->
    <div class='seat-N' @click='selectSeat' v-if="!isSelected && !isReserved"></div>
    <div class='seat-O' @click='cancelSeat' v-if='isSelected && !isReserved'></div>
    <div class='seat-R' v-if='isReserved'></div>
  </div>
  
</template>

<script>

export default {
  name: 'TicketingSeat',
  data() {
    return {
      i : Number(this.seatNum.slice(0,1)), // 선택한 행
      j : Number(this.seatNum.slice(1)), // 선택한 열
      isSelected: false,
      alreadyReserved: this.$store.state.alreadyReserved
    }
  },
  props: {
    seatNum: String,
  },
  methods: {
    selectSeat() {
      const i = this.i
      const j = this.j
      const payload = {
        i, j
      }
      this.$store.dispatch('selectSeat', payload)
      this.isSelected = true
    },
    cancelSeat() {
      const i = this.i
      const j = this.j
      const payload = {
        i, j
      }
      this.$store.dispatch('cancelSeat', payload)
      this.isSelected = false
    },
  },

  computed: {
    isReserved() {
      const reArr = this.$store.state.alreadyReserved
      const arr2 = [this.i, this.j]
      for (const v of reArr) {
        console.log(v)
        const arr = [v.i, v.j]
        if (JSON.stringify(arr) == JSON.stringify(arr2)) {
          return true
        }
      }
      return false
    },
  },


}
</script>

<style>
  .seat-O{
    background-color: #6feaf6;
    height: 60px;
    width: 75px;
    margin: 3px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
}

  .seat-R{
    background-color: #fff;
    height: 60px;
    width: 75px;
    margin: 3px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }

  .seat-N {
    background-color: #444451;
    height: 60px;
    width: 75px;
    margin: 3px;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
  }

  .maginR {
    margin-right: 3rem;
  }

  .maginL {
    margin-left: 3rem;
  }

  .maginLi {
    margin-left: 2rem;
  }

  .maginRi {
    margin-right: 2rem;
  }
</style>