<template>
  <div class='box1'>
    <h4>예매 시간 선택 TicketingTimeSelect.vue</h4>
    {{time}}
    <div class='d-flex flex-row'>
    
      <div class='timebox' @click='timeSelectM'>
        아침 9시
      </div>

      <div class='timebox' @click='timeSelectL'>
        점심 13시
      </div>

      <div class='timebox' @click='timeSelectE'>
        저녁 19시
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'TicketingTimeSelect',
  data() {
    return {
      time: 0,
    }
  },
  methods: {
    timeSelectM() {
      this.time = '0900'
      this.$emit('selectedTime', this.time)
    },
    timeSelectL() {
      this.time = 1300
      this.$emit('selectedTime', this.time)
    },
    timeSelectE() {
      this.time = 1900
      this.$emit('selectedTime', this.time)
    },
  }
}
</script>

<style>
  .timebox {
  width : 100;
  height: 100;
  background-color: #f5d682;
  border: 1px solid rgb(12, 12, 12);
  }
</style>