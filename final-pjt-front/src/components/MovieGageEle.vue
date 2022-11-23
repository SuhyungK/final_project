<template>
  <div class="progress my-1 mx-3" style="height: 30px;">
    <div class="progress-bar bg-success progress-bar-striped active" role="progressbar" :style="`width: ${ gage }%;`" :aria-valuenow="`${ gage }`" aria-valuemin="0" aria-valuemax="100">
    {{ genre }} : {{ gage }}%</div>
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
      return Math.round((this.cnt / this.genresGageSize) * 1000) / 10
    }
  }
  
}
</script>

<style>

</style>