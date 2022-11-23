<template>
  <div>
    상영관 선택 TicketingTheaterSelect.vue

    <div class='d-flex flex-row justify-content-evenly fw-bold text-center fs-3'>
    
      <div id='1' :class="{ 'MouseOver': tigger==1, 'beforeMouseOver': tigger!=1}" 
      @click='theaterSelect1' @mouseover="mouseover" @mouseout="mouseout">
        상영 1관
      </div>

      <div id='2' :class="{ 'MouseOver': tigger==2, 'beforeMouseOver': tigger!=2}" 
      @click='theaterSelect2' @mouseover="mouseover" @mouseout="mouseout">
        상영 2관
      </div>

      <div id='3' :class="{ 'MouseOver': tigger==3, 'beforeMouseOver': tigger!=3}" 
      @click='theaterSelect3' @mouseover="mouseover" @mouseout="mouseout">
        상영 3관
      </div>

    </div>

  </div>
</template>

<script>
export default {
  name: 'TicketingTheaterSelect',
  data() {
    return {
      theater: 0,
      tigger: null,
    }
  },
  methods: {
    theaterSelect1() {
      this.theater = 1
      this.$emit('selectedTheater', this.theater)
    },
    theaterSelect2() {
      this.theater = 2
      this.$emit('selectedTheater', this.theater)
    },
    theaterSelect3() {
      this.theater = 3
      this.$emit('selectedTheater', this.theater)
    },
    mouseover(e) {
      this.tigger = e.target.id
    },
    mouseout() {
      this.tigger = null
    }
  }
}
</script>

<style>

</style>