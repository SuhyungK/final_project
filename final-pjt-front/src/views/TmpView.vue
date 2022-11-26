<template>
  <div>
    <h1>test 창 TmpView.view</h1>
    <button @click="tmpCallMovie">무비 불러오기</button>
    <TmpmovieItem
    v-for='movie in tmpMovies'
    :key='movie.id'
    :movie='movie'/>

    {{ tmpMovies }}

  </div>
</template>

<script>
import TmpmovieItem from '@/components/TmpmovieItem';

export default {
  name: 'TmpView',
  components: {
    TmpmovieItem
  },
  methods: {
    tmpCallMovie() {
      this.$store.dispatch('tmpCallMovie')
    },
  },
  computed: {
    tmpMovies() {
      return this.$store.state.tmpMovies
    }
  }
}
</script>

<style>

</style>