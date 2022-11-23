<template>
  <div class="row px-2">

    <!-- 영화 포스터 -->
    <div id="mini-poster-container" class="col-2">
      <img class='' :src="`https://image.tmdb.org/t/p/original${posturl}`" alt="영화이미지">
    </div>

    <div class="col-10">

      <!-- 내용 -->
      <div>
        내용 : {{ review.content }}
      </div>
      작성일자 : {{ review.created_at }}
      <!-- 뭔영환지 : {{ review.movie }} -->
      별점 : {{ review.rating }}

    </div>

    <hr class="my-2">
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
      posturl: 'xx'
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
        console.log(res.data)
        this.posturl = res.data.poster_path
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