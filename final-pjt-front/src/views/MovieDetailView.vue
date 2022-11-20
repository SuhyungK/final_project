<template>
  <div>
    <h1>영화 상세 페이지 MovieDetailView.vue</h1>
    <h2>{{ this.$route.params }}</h2>
    <DetailPoster/>
    <button @click="toTicketing">포스터 하단에 예매하기 버튼</button>
    <MovieDetail/>
    <ReviewList/>
  </div>
</template>

<script>
import MovieDetail from '@/components/MovieDetail'
import ReviewList from '@/components/ReviewList'
import DetailPoster from '@/components/DetailPoster'

export default {
  name: 'MovieDetailView',
  components: {
    MovieDetail,
    ReviewList,
    DetailPoster,
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