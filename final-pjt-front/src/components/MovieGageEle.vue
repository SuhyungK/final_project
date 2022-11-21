<template>
  <div>
    {{ genre }} :
    {{ gage }}
  </div>
</template>

<script>
export default {
  name: 'MovieGageEle',
  props: {
    genresGageSize: Number,
    genre: String,
    cnt: Number,
  },
  computed: {
    gage() {
      return Math.round((this.cnt / this.genresGageSize) * 100) / 10
    }
  }
  
}
</script>

<style>

</style>