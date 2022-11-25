<template>
  <div class="container">
    <!-- 영화 검색 페이지 -->
    
    <!-- 검색 결과 개수 div -->
    <div class="mt-5 mb-3 d-flex justify-content-between">
      <p class="h5">
        <span class="" style="color: #00ABB3; font-weight: 700; font-size: 22px;">{{ searchResultsCount }}</span> 개의 검색 결과를 찾았습니다.
      </p>
      <div>
        <span style="cursor: pointer;" @click="isShow=true" :class="{thisShow: isShow}">리스트 보기</span> | 
        <span style="cursor: pointer;" @click="isShow=false" :class="{thisShow: !isShow}">갤러리 보기</span>
      </div>
    </div>

    <hr>
    
    <div v-if="isShow">
      <!-- 개별 검색 결과 컴포넌트 -->
      <SearchMovie
        v-for="movie in searchResults"
        :key="`searchMovie-${movie.movie_id}`"
        :movie="movie"
      />
    </div>

    <div v-if="!isShow" class="d-flex flex-wrap">
      <div v-for="(movie, idx) in searchResults"
        :key="idx" class="me-3 mb-3" style="width: 200px; height: 280px; overflow: hidden; position: relative;"
      >
        <img :src="`https://image.tmdb.org/t/p/w500/` + movie.poster_path" alt="searchposter"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          class="rounded image-hover"
          @click="toDetail(movie)"
        >
      </div>
    </div>
    
  </div>
</template>

<script>
import SearchMovie from '@/components/SearchMovie'

export default {
  name: 'SearchMovieView',
  components: {
    SearchMovie,
  },
  data() {
    return {
      isShow: true,
    }
  },
  computed: {
    searchResults() {
      return this.$store.state.searchMovieResults
    },
    searchResultsCount() {
      return this.searchResults.length

    }
  },
  methods: {
    moveToDetail(item, event) {
      console.log(item, event)
    },
    toDetail(movie) {
      console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!',movie)
      this.$router.push({name: 'MovieDetailView', params: {moviePk: movie.movie_id}})
    }
  }
}
</script>

<style>
#searchMovie {
  cursor: pointer;
}

.thisShow {
  color: #00ABB3;
  font-weight: 700;
}

.image-hover:hover {
  background-color: gray;
  opacity: 0.5;
  cursor: pointer;
}
</style>