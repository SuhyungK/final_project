<template>
  <div class="container">
    <!-- 영화 상세 페이지 -->
    <h2>{{ this.$route.params }}</h2>
    
    <button @click="toTicketing">포스터 하단에 예매하기 버튼</button>
    <MovieDetail/>
    <ReviewList/>
  </div>
</template>

<script>
import MovieDetail from '@/components/MovieDetail'
import ReviewList from '@/components/ReviewList'

export default {
  name: 'MovieDetailView',
  components: {
    MovieDetail,
    ReviewList,
  },
  data() {
    return {
    }
  },
  computed: {
    movieInfo() {
      return this.$route.params
    }
  },
  beforeRouteUpdata(to, from, next) {
    this.movieInfo = to.params.sMovie
    next()
  },
  methods: {
    toTicketing() {
      this.$router.push({ name: 'TicketingView' })
    }
  }
}
</script>

<style>

</style>