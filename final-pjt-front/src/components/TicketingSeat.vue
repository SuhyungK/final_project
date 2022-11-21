<template>
  <div>
    <div class='seat-X' @click='selectSeat' v-if="!isSelected && !isReserved"></div>
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
      border : 1px solid;
      padding : 30px;
      background-color: #53535a;
      width : 80px;
      height : 80px;
    }

  .seat-X{
      border : 1px solid;
      padding : 30px;
      background-color: #bcbcd6;
      width : 80px;
      height : 80px;
    }
  .seat-R{
      border : 1px solid;
      padding : 30px;
      background-color: #3333ef;
      width : 80px;
      height : 80px;
    }
</style>