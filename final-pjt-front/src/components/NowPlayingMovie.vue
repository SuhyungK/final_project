<template>
  <div>
    <!-- 타이틀 -->
    <p class="header-title">
      Now Playing Movie
    </p>

    <!-- Now Playing Movie -->
    <div class="d-flex mb-4" style="overflow-x: scroll">
      <img v-for="(npMovie, i) in nowPlayingMovieList" :key="i" 
        :src="`https://image.tmdb.org/t/p/w500/` + npMovie.poster_path" 
        :alt="npMovie.title"
        style="width: 200px;"
        class="me-3"
      >
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

</style>