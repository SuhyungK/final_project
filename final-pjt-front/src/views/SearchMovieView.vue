<template>
  <div class="container">
    <!-- 영화 검색 페이지 -->
    
    <!-- 검색 결과 개수 div -->
    <div class="mt-5 mb-3 text-start">
      <p class="h5">
        <span class="" style="color: #00ABB3; font-weight: 700; font-size: 22px;">{{ searchResultsCount }}</span> 개의 검색 결과를 찾았습니다.
      </p>
    </div>

    <hr>

    <!-- 전체 목록 div -->
    <div
      v-for="movie in searchResults"
      :key="`searchMovie-${movie.movie_id}`"
    >
      <!-- 개별 영화 div -->
      <div id="searchMovie" class="d-flex row" @click="moveToDetail(movie, $event)">
        
        <!-- 포스터 이미지 -->
        <div class="col-4 p-3">
          <img :src="`https://image.tmdb.org/t/p/w200/` + movie.poster_path" :alt="`searchMovie-${movie.title}`" class="rounded">
        </div>
        <div class="col-8 border">1</div>
      </div>

    <hr>
    </div>

    {{ searchResults }}
  </div>
</template>

<script>
export default {
  name: 'SearchMovieView',
  data() {
    return {
      
    }
  },
  computed: {
    searchResults() {
      return this.$route.params.sMovieList
    },
    searchResultsCount() {
      return this.searchResults.length

    }
  },
  methods: {
    moveToDetail(item, event) {
      console.log(item, event)
    }
  }
}
</script>

<style>
#searchMovie {
  cursor: pointer;
}
</style>