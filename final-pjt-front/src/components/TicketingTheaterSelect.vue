<template>
  <div>
    상영관 선택 TicketingTheaterSelect.vue

    <div class='d-flex flex-row'>
    
      <div class='timebox' @click='theaterSelect1'>
        상영 1관
      </div>

      <div class='timebox' @click='theaterSelect2'>
        상영 2관
      </div>

      <div class='timebox' @click='theaterSelect3'>
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
      theater: 0
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
  }
}
</script>

<style>

</style>