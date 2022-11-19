<template>
  <div>
    <h3> 영화 제목 줄거리 등등 의 정보들 MovieDetail.vue</h3>
    <h3>제목: {{ movie.title }}</h3>
    <h4>줄거리: {{ movie.overview }}</h4>
    <h4>기타 추가 정보</h4>
    <hr>
  </div>
</template>

<script>
export default {
  neme: 'MovieDetail',
  props: {
    movie: Object
  }
}

</script>

<style>

</style>