<template>
  <div style="width: 200px; height: 280px; overflow: hidden; position: relative" @click="toDetail">
    <!-- {{movie.title}} -->
    <img :src="`https://image.tmdb.org/t/p/w500` + movie.poster_path" alt="" class="rounded" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
  </div>
</template>

<script>
export default {
  name: 'TicketedMovie',
  props: {
    movie: Object,
  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'MovieDetailView', params: {moviePk: this.movie.movie_id}})
    }
  }
}
</script>

<style>

</style>