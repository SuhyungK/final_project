<template>
  <div>
    <p class="header-title">
        Top Review Movie
    </p>
    <TopReviewEle
    v-for='review in TopReviewMovies'
    :key='review.id'
    :review='review'/>
  </div>
</template>

<script>
import TopReviewEle from '@/components/TopReviewEle'

export default {
    name: 'TopReviewMovie',
    components: {
        TopReviewEle
    },
    data() {
      return {
        // reviews : this.$store.state.TopReviewMovies
    }
  },
  computed: {
    TopReviewMovies() {
      return this.$store.state.TopReviewMovies

    }
  }
}
</script>

<style>

</style>