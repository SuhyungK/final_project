<template>
  <div class='box1'>
    <h4>예매 시간 선택 TicketingTimeSelect.vue</h4>
    {{time}}
    <div class='d-flex flex-row justify-content-evenly fw-bold text-center fs-3'>

        <div id='9' :class="{ 'MouseOver': tigger==9, 'beforeMouseOver': tigger!=9}"
        @click='timeSelectM' @mouseover="mouseover" @mouseout="mouseout">
          아침 9시
        </div>

        <div id='13' :class="{ 'MouseOver': tigger==13, 'beforeMouseOver': tigger!=13}"
        @click='timeSelectL' @mouseover="mouseover" @mouseout="mouseout">
          점심 13시
        </div>

        <div id='19' :class="{ 'MouseOver': tigger==19, 'beforeMouseOver': tigger!=19}"
        @click='timeSelectE' @mouseover="mouseover" @mouseout="mouseout">
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
      time: this.selectedTime,
      tigger: null,
    }
  },
  props: {
    selectedTimeData: Number
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
    mouseover(e) {
      this.tigger = e.target.id
    },
    mouseout() {
      this.tigger = null
    }
  },
  computed: {

  }
}
</script>

<style>
  .beforeMouseOver {
  width : 120px;
  height: 40px;
  background-color: #ffffff;
  /* border: 1px solid rgb(12, 12, 12); */
  }

  .MouseOver {
  width : 120px;
  height: 40px;
  background-color: #fcfb9b;
  /* border: 1px solid rgb(12, 12, 12); */
  }
</style>