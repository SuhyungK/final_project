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
    
    <!-- 개별 검색 결과 컴포넌트 -->
    <SearchMovie
      v-for="movie in searchResults"
      :key="`searchMovie-${movie.movie_id}`"
      :movie="movie"
    />
    
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
    }
  }
}
</script>

<style>
#searchMovie {
  cursor: pointer;
}
</style>