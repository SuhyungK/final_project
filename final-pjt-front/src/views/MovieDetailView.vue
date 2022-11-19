<template>
  <div>
    <h1>영화 상세 페이지 MovieDetailView.vue</h1>
    {{ movie }}
    <hr>
    <div class="d-flex flex-row">

      <div>
        <DetailPoster :moviePostUrl='movie.poster_path'/>
      </div>

      <div>
        <MovieDetail :movie='movie'/>
        <WriteReview :movieId='movie.id'/>
        <ReviewList :movieId='movie.id'/>
      </div>

    </div>
  </div>
</template>

<script>
import MovieDetail from '@/components/MovieDetail'
import ReviewList from '@/components/ReviewList'
import DetailPoster from '@/components/DetailPoster'
import WriteReview from '@/components/WriteReview'

export default {
  name: 'MovieDetailView',
  data() {
    return {
      movie: this.$route.params.movie,
    }
  },
  components: {
    MovieDetail,
    ReviewList,
    DetailPoster,
    WriteReview,
  },
  mounted() {
    // console.log('무비 아이디', movie.id)
    // this.$store.dispatch('movieReviews', movie.id)
  }
}
</script>

<style>

</style>