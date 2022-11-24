<template>
  <div>
    <!-- 타이틀 -->
    <p class="header-title">
      Now Playing Movie
    </p>

    <!-- Now Playing Movie -->
    <div class="d-flex mb-4 position-relative" style="overflow-x: scroll">
      <div v-for="(npMovie, i) in nowPlayingMovieList" :key="i"
        class="now-play"
      >
        <!-- <div class="position-absolute d-flex flex-column justify-content-center" style="width: 100px;">
          <button class="rounded-pill position absolute button-design" id="button-mouse-hover" value="test" @>
            ??
          </button>
          <button @click="moveToTicketing()" class="btn btn-warning position absolute" id="button-mouse-hover" value="test">
            ??
          </button>
        </div> -->
        <img 
          :src="`https://image.tmdb.org/t/p/w500/` + npMovie.poster_path" 
          :alt="npMovie.title"
          style="width: 200px; cursor: pointer;"
          class="me-3 rounded"
          @click="moveToTicketing(npMovie)"
        >

      </div>
      <div v-if="showInfo" class="bg-dark rounded" id="image-mouse-hover"></div>
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
      showInfo: false,
    }
  },
  methods: {
    moveToTicketing(movie) {
      console.log(movie.title)
      this.$router.push({name: 'MovieDetailView', params: {moviePk: movie.id}} )
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
        this.nowPlayingMovieList = tmp2
      })
  },
  beforeCreate() {
    this.$store.dispatch('reqMyPayedMovies', this.$store.state.userInfo.userName)
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

#image-mouse-hover {
  width: 200px;
  height: 300px;
  z-index: 10000;
  position: absolute;
  opacity: 0.5;
}

.now-play > img:hover {
  opacity: 0.7;
}

.button-design {
  background-color: white;
  border: .15rem solid gray;
  color: gray;
}
</style>