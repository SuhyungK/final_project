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
        <!-- <p class="position-absolute t-50" id="#button-mouse-hover" value="test">
          {{ i + 1 }}
        </p> -->
        <div class="position-absolute d-flex flex-column justify-content-center" style="width: 100px;">
          <button class="btn btn-success position-absolute" id="#button-mouse-hover" value="test"
            style=""
          >
            상세보기
          </button>
          <button class="btn btn-warning position-absolute" id="#button-mouse-hover" value="test"
            style=""
          >
            예매하기
          </button>

        </div>
        <img  
          :src="`https://image.tmdb.org/t/p/w500/` + npMovie.poster_path" 
          :alt="npMovie.title"
          @mouseover="showInfo" 
          style="width: 200px; cursor: pointer;"
          class="me-3 rounded"
          @click="test(npMovie)"
        >
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
      isShow: false,
    }
  },
  methods: {
    test(v) {
      console.log(v)
    },
    showInfo() {
      this.isShow = true
    },
  },
  created() {
    axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/now_playing?api_key=26f430349f35e05f01c48db888f30795&language=ko-KR&page=1&region=KR'
    })
      .then((res) => {
        this.nowPlayingMovieList = res.data.results
      })
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

#button-mouse-hover {
  width: 200px;
  height: 300px;
  z-index: 10000;
  position: absolute;
  opacity: 0.5;
}

.now-play > img:hover {
  opacity: 0.7;
}
</style>