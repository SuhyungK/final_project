<template>
  <div>
    <!-- 타이틀 -->
    <p class="header-title">
      Now Playing Movie
      {{ npList }}
    </p>

    <!-- Now Playing Movie -->
    <div class="d-flex mb-4" style="overflow-x: scroll">

      <!-- Now Playing 개별 이미지 -->
      <div v-for="(npMovie, i) in npList" :key="i"
        class="now-play position-relative"
      >
        <div @mouseover="showBtn(i)" @mouseleave="hiddenBtn(i)">
          <img 
          :src="`https://image.tmdb.org/t/p/w500/` + npMovie.movie.poster_path" 
          :alt="npMovie.title"
          style="width: 200px; cursor: pointer; height: 280px;"
          class="me-3 rounded"
        >

         <!-- 마우스 올렸을 때 버튼 -->
         {{ npMovie.isShow }}
          <div v-if="npMovie.isShow" class="rounded bg-dark position-absolute top-0 left-0 d-flex flex-column justify-content-center align-items-center" style="width: 200px; height: 280px; opacity: 0.7;">
            <button id="detail-button" class="w-75 mb-1 rounded-pill" style="padding: 0.2rem 0.1rem" @click="toMovieDetail">상세 보기</button>
            <button id="ticket-button" class="w-75 mt-1 rounded-pill" style="padding: 0.2rem 0.1rem" @click="ticketing">예매 하기</button>
          </div>
        </div>
 
      </div>
      
    </div>

   <hr>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'NowPlayingMovie',
  components: {
  },
  data() {
    return {
      nowPlayingMovieList: [],
    }
  },
  computed: {
    npList() {
      const tmp = this.nowPlayingMovieList.map()
      return tmp
    }
      // return this.nowPlayingMovieList.map((movie) => {
      //   return {
      //     movie: movie.movie,
      //     isShow: movie.isShow
      //   }
      // })
  },
  methods: {
    // moveToTicketing(movie) {
    //   console.log(movie.title)
    //   this.$router.push({name: 'MovieDetailView', params: {moviePk: movie.id}} )
    // },
    showBtn(idx) {
      this.nowPlayingMovieList[idx].isShow = true
      console.log(this.npList[idx].movie.title, this.npList[idx].isShow)
    },
    hiddenBtn(idx) {
      this.nowPlayingMovieList[idx].isShow = false
      console.log(this.npList[idx].movie.title, this.npList[idx].isShow)
    }
  },
  created() {
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
        this.nowPlayingMovieList = tmp2.map((movie) => {
          return {
            movie: movie, 
            isShow: false,
          }
        })
        
      })
  },
  beforeCreate() {
    this.$store.dispatch('reqMyPayedMovies', this.$store.state.userInfo.userName)
  },
  mounted() {
    
  }
}
</script>

<style scoped>
* {
  visibility: visible;
  opacity: 1;
}

#now-playing-movie > div {
  width: 180px;
  display: inline-block;
}

#npMovie {
  width: 100%;
  height: 100%; 
  object-fit: cover;
}

.button-design {
  background-color: white;
  border: .15rem solid gray;
  color: gray;
}

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