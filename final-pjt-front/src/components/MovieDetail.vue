<template>
  <!-- 개별 영화 제목 & 내용 & 장르 & 줄거리 ...  -->
  <div class="p-3 d-flex flex-column" style="cursor: default;">
      
    <!-- 영화 제목 & 개봉 연도 -->
    
    <div class="text-start mb-3">

      <!-- title(release_year) -->
      <span class="h3 fw-bold me-2" style="cursor: pointer;" id="movie-title-hover"
        @click="moveToDetail(movie)"
      >
        {{ movie.title }}
      </span>
      <span class="" style="position: relative; top: -1px;">({{ movie.release_date.substring(0, 4) }})</span>

      <div class="d-flex">
        <!-- original_title -->
        <p class="fst-italic mt-1 mb-0 me-3">{{ movie.original_title }}</p>

        <!-- genres -->
        <p v-for="(genre, i) in genres" :key="i" 
          class="mt-1 d-inline-block fst-italic"
          >
          |<span class="ms-2 me-2">{{ genre['genre'] }}</span>
        </p>
        <i class="mt-1">|</i>
      </div>
      
      
    </div>

    <!-- 영화 줄거리 -->
    <div class="text-start mt-4">
      <span class="h4 fw-bold position-relative" style="top: 5px;">줄거리</span>
      <hr>
      <p class="text-start fs-6">
        {{ movie.overview }}
      </p>
    </div>

    <!-- 영화 장르  -->
    
  </div>
</template>

<script>
export default {
  neme: 'MovieDetail',
  props: {
    movie: Object
  },
  data() {
    return {
      genres: JSON.parse(this.movie.genres).result
    }
  }
}

</script>

<style>

</style>