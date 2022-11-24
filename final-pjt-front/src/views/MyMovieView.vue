<template>
  <!-- 관심 영화 페이지 -->
  <div class="container mt-5">

      <div class="d-flex justify-content-between">
        <p class="h5">
          <span class="" style="color: #00ABB3; font-weight: 700; font-size: 22px;">관심영화</span> 
        <p>
        <p>
          <span class="position-relative me-2" style="top: 3px;">
            인기순 정렬 
          </span>
          |

        </p>
      </div>
      <hr class="mt-0">
      <!-- <MymovieList/> -->
      <div class="row row-cols-6">
        <MyMovies class=""
        v-for='movie in myLikeMoviesDetail'
        :key='movie.id'
        :movie='movie'/>
      </div>
  </div>
</template>

<script>
// import MymovieList from '@/components/MymovieList'
import MyMovies from '@/components/MyMovies'
import { ref } from 'vue'

export default {
  name: 'MyMovieView',
  components: {
    // MymovieList,
    MyMovies,
  },
  data() {
    return {
      ratingModel: ref(3)
    }
  },
  computed: {
    myLikeMoviesDetail() {
      return this.$store.state.myLikeMoviesDetail
    }
  },
  beforeCreate() {
    this.$store.dispatch('myLikeMoviesDetail')
  }
}
</script>

<style>
img {

}
</style>