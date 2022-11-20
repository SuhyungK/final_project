<template>
  <div>
    <!-- 개별 영화 div -->
    <div id="searchMovie" class="d-flex row">
      
      <!-- 개별 영화 포스터 -->
      <div class="offset-lg-1 offset-md-0 col-lg-3 col-md-12 p-3">
        <img 
          :src="`https://image.tmdb.org/t/p/w200/` + movie.poster_path" 
          :alt="`searchMovie-${movie.title}`" 
          class="rounded">
      </div>

      <!-- 개별 영화 제목 & 내용 & 장르 & 줄거리 ...  -->
      <div class="col-lg-7 col-md-12 p-3 d-flex flex-column" style="cursor: default;">
          
          <!-- 영화 제목 & 개봉 연도 -->
          <div class="text-start mb-3">
            <span class="h3 fw-bold me-2" style="cursor: pointer;" id="movie-title-hover"
              @click="moveToDetail(movie, $event)"
            >
              {{ movie.title }}
            </span>
            <span class="" style="position: relative; top: -1px;">({{ movie.release_date.substring(0, 4) }})</span>
            <p class="fst-italic mt-1">{{ movie.original_title }}</p>
          </div>

          <!-- 영화 줄거리 -->
          <div>
            <p class="text-start fs-5">
              {{ movie.overview }}
            </p>
          </div>

          <!-- 영화 장르 / 버튼 형식? 해시 태그 형식? -->
          <div>
            {{ genres }}
          </div>
      </div>
      <hr class="mt-3">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchMovie',
  props: {
    movie: Object,
  }, 
  data() {
    return {
      genres: JSON.parse(this.movie.genres).result
    }
  },
  methods: {
    moveToDetail() {
      this.$router.push({name: 'MovieDetailView', params: {}})
    }
  }
}
</script>

<style>
#movie-title-hover:hover {
  color: #00ABB3;
}
</style>