<template>
  <div class="row px-2">

    <!-- 영화 포스터 -->
    <div id="mini-poster-container" class="col-2" @click="toDetail">
      <img class='rounded' :src="`https://image.tmdb.org/t/p/original${posturl}`" alt="영화이미지"
      >
    </div>

    <!-- 영화 제목 + 내용 -->
    <div class="col-10 mb-3">
      <p class="h6 text-start mb-3" style="font-weight: 700;">{{ movietitle }}</p>
      <!-- <p class="fs-6 text-start pt-0 mt-0">{{ movieogtitle }}</p> -->
      <p class="text-start">{{ review.content }}</p>
    </div>
    <hr class="mt-3">
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'MyReviewEle',
  props: {
    review: Object,
  },
  data() {
    return {
      posturl: 'xx',
      movietitle : '',
      movieogtitle: '',
    }
  },
  methods: {
    toDetail() {
      this.$router.push({name: 'MovieDetailView', params: {moviePk: this.review.movie_id}} )
    }
  },
  created() {
    const DJANGO_API_URL = 'http://127.0.0.1:8000'
    const moviePk = this.review.movie
    axios({
      method: 'get',
      url: `${DJANGO_API_URL}/movies/movie-infomation/${moviePk}`,
      // params: {
      //   'movie_pk': this.review.movie
      // }
    })
      .then((res) => {
        this.posturl = res.data.poster_path
        this.movietitle = res.data.title
        this.movieogtitle = res.data.original_title
      })
      .catch((err) => {
        console.log(err)
      })
  },
}
</script>

<style>
#mini-poster-container > img{
  width: 100%;
  height: 100%; 
}
</style>