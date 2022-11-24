<template>
  <div>
    <div v-if='isLike && !isTicketed' 
      style="position: relative; width: 200px; height: 350px; overflow: hidden;"
      @mouseover="showBtn"
      @mouseleave="hiddenBtn"
      >
      <!-- <h3>내가 관심있는 영화 MyMovies.vue</h3> -->
      <img class="rounded w-100" style="height: 280px;" :src='`https://image.tmdb.org/t/p/w500${movie.poster_path}`' alt="no image">
      <p class="h5 w-100 mt-2" style="white-space:nowrap; text-overflow: ellipsis; height: 26px;">{{movie.title}}</p>
      <!-- <button @click='cancelLike'>관심영화 제거하기</button> -->

      <div v-if="isShow" class="rounded w-100 bg-dark position-absolute top-0 left-0 d-flex flex-column justify-content-center align-items-center" style="height: 280px; opacity: 0.7;">
        <button id="detail-button" class="w-75 mb-1 rounded-pill" style="padding: 0.2rem 0.1rem" @click="toMovieDetail">상세 보기</button>
        <button id="ticket-button" class="w-75 mt-1 rounded-pill" style="padding: 0.2rem 0.1rem" @click="ticketing">예매 하기</button>
      </div>
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
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    ticketing() {
      this.$router.push({name:'TicketingView', params: {moviePk: this.movie.movie_id}})
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
    },
    showBtn() {
      this.isShow = true
    },
    hiddenBtn() {
      this.isShow = false
    }
  },
  computed: {
    isLike() {
      const moviePk = this.movie.movie_id
      const arr = this.$store.state.myLikeMovies
      for (let i of arr) {
        if (i == moviePk) {
          return true
        }
      }
      return false
    },
    isTicketed() {
      const moviePk = this.movie.movie_id
      const arr = this.$store.getters.myPayedMoviesPk
      for (let i of arr) {
        if (i == moviePk) {
          return true
        }
      }
      return false
    },
    isShowV() {
      return this.isShow
    }
  },
}
</script>

<style>
#detail-button, #ticket-button {
  background-color: white;
  opacity: 1;
  border: 0.15rem solid #00ABB3;
  color: #00ABB3;
  cursor: pointer;
}

#ticket-button {
  border: 0.15rem solid rgb(255, 99, 71);
  color: rgb(255, 99, 71)
}

#detail-button:hover {
  color: white;
  border-color: #00ABB3;
  background-color: #00ABB3;
}

#ticket-button:hover {
  color: white;
  border-color: rgb(255, 99, 71);
  background-color: rgb(255, 99, 71);
}
</style>