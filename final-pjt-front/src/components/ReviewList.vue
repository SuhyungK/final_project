<template>
  <div>
    <h3>리뷰 목록 ReviewList.vue</h3>
    <AllReviews
    v-for='review in movieReviews'
    :key='review.id'
    :review='review'
    :movieId='movieId'/>
    <hr>
  </div>
</template>

<script>
import AllReviews from '@/components/AllReviews'

export default {
  name: 'ReviewList',
  components: {
    AllReviews,

  },
  computed: {
    movieReviews() {
      return this.$store.state.movieReviews
    }
  },
  props: {
    movieId: Number,
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('movieReviews', this.movieId)
  }
}
</script>

<style>

</style>