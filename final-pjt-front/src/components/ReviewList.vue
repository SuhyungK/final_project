<template>
  <div class="p-3">
    <!-- <h3>리뷰 목록 ReviewList.vue</h3> -->
    <div class="text-start">
      <p class="h3 fw-bolder">리뷰 목록</p>
    </div>
    
    <hr>
    <!-- {{ this.$store.state.moviesReviewList }} -->

    <AllReviews
      v-for='review in movieReviews'
      :key='review.id'
      :review='review'
      :movieId='movieId'
    />
  </div>
</template>

<script>
import AllReviews from '@/components/AllReviews'

export default {
  name: 'ReviewList',
  components: {
    AllReviews,
  },
  // data() {
  //   return {
  //     movieReviewData: [...this.$store.state.movieReviews]
  //   }
  // },
  props: {
    movieId: Number,
  },
  computed: {
    movieReviews() {
      return this.$store.state.movieReviews
    },
  },
}
</script>

<style>

</style>