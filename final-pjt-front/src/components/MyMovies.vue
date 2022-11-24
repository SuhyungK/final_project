<template>
  <div>
    <div v-if='isLike'>
      <h3>내가 관심있는 영화 MyMovies.vue</h3>
      <img style="width: 200px; height: auto;" :src='`https://image.tmdb.org/t/p/original${movie.poster_path}`' alt="no image">
      <h3>{{movie.title}}</h3>
      <button @click="toMovieDetail">영화 상세 페이지 이동</button>
      <button @click="ticketing">예매하기</button>
      <button @click='cancelLike'>관심영화 제거하기</button>
      <hr>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyMovies',
  props: {
    movie: Object
  },
  methods: {
    ticketing() {
      this.$router.push({name:'TicketingView', params: {movie: this.movie}})
    },
    toMovieDetail() {
      // console.log('MyMovies.vue 에서 toMovieDetail 함수 실행', this.movie.movie_id)
      // // this.$router.push({name:'MovieDetailView', params: {moviePK: this.movie.movie_id, movie: this.movie}})
      // this.$router.push({name:'MovieDetailView', params: {moviePK: this.movie.movie_id}})
      // console.log('으아아아아아아아아아!!!!!', this.movie.movie_id)

      const moviePk = this.movie.movie_id
      axios.get(`http://127.0.0.1:8000/movies/movie-infomation/${moviePk}/`)
      .then((res) => this.$store.commit('CHECK_MOVIE', res.data))
      .then(() => this.$router.push({name: 'MovieDetailView', params: {moviePk: this.movie.movie_id}}))
    },
    cancelLike() {
      this.$store.dispatch('likeMovie', this.movie.movie_id)
    }
  },
  computed: {
    isLike() {
      const moviePk = this.movie.movie_id
      const arr = this.$store.state.myLikeMovies
      for (let i of arr) {
        console.log(i)
        if (i == moviePk) {
          return true
        }
      }
      return false
    }
  }
}
</script>

<style>

</style>