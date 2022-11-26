<template>
  <div class="mb-5" style="height: 300px;">
    <!-- 타이틀 -->
    <div>
      <p class="h3" style="font-weight: 700;">현재 상영작</p>
    </div>

    <!-- Now Playing Movie -->
    <div class="d-flex mb-4" style="overflow-x: scroll">
      <div v-for="(movie, idx) in nowPlayingMovieList" :key="idx">
        <img :src="`https://image.tmdb.org/t/p/original` + movie.poster_path"
          :alt="movie.title"
          style="width: 200px; cursor: pointer; height: 280px;"
          class="me-3 rounded"  
          @click="toDetail(movie)"
        > 
        <div v-if="movie.isShow" class="rounded bg-dark position-absolute top-0 left-0 d-flex flex-column justify-content-center align-items-center" style="width: 200px; height: 280px; opacity: 0.7;">
          <button id="detail-button" class="w-75 mb-1 rounded-pill" style="padding: 0.2rem 0.1rem" @click="toMovieDetail">상세 보기</button>
          <button id="ticket-button" class="w-75 mt-1 rounded-pill" style="padding: 0.2rem 0.1rem" @click="ticketing">예매 하기</button>
        </div>

        
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NowPlayingMovie',
  data() {
    return {
      nowPlayingMovieList: []
    }
  },
  methods: {
    showBtn(idx) {
      this.nowPlayingMovieList[idx].isShow = true
      console.log(this.npList[idx].movie.title, this.npList[idx].isShow)
    },
    hiddenBtn(idx) {
      this.nowPlayingMovieList[idx].isShow = false
      console.log(this.npList[idx].movie.title, this.npList[idx].isShow)
    },
    toDetail(movie) {
      console.log('!!!!!!!!!!!!!!!!!!')
      console.log(movie)
      this.$router.push({name: 'MovieDetailView', params: {moviePk: movie.id}})
    }
  },
  mounted() {
    axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=26f430349f35e05f01c48db888f30795&language=ko-KR&page=1&region=KR'
    })
      .then((res) => {
        console.log(this.$store.state.myPayedMovies)
        const tmp = this.$store.state.myPayedMovies.map((ele) => {
          return ele.movie_id
        })
        let tmp2 = res.data.results.filter((ele) => {
          return !tmp.includes(ele.id)
        })
        this.nowPlayingMovieList = tmp2
        console.log(this.nowPlayingMovieList)
        
      })
  },
  beforeCreate() {
    this.$store.dispatch('reqMyPayedMovies', this.$store.state.userInfo.userName)
  },
}
</script>

<style>

</style>