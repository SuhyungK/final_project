<template>
  <div class="container">
    <!-- 영화 상세 페이지 -->
    
    <div class="effect" id="backdrop-container" style="border-radius: 50rem; border: 1px solid white">
      <img :src="`https://image.tmdb.org/t/p/original` + movie.backdrop_path" alt="image"
            class="position-absolute effect" style="z-index: -1; border-radius: 50rem; border: 1px solid white"
      >
    </div>

    <div id="detail-cotent" class="d-flex row">

      <div class="offset-lg-1 col-lg-3 offset-md-0 col-md-12">
        <DetailPoster :moviePostUrl='movie.poster_path'/>
      </div>

      <div class="col-lg-7 col-md-12">
        <MovieDetail style="margin-bottom: 100px;" :movie='movie'/>
        <ReviewList :movieId='movie.id'/>
        <WriteReview :movieId='movie.id'/>
      </div>

    </div>
    <!-- {{ this.$route.query }} -->
  </div>
</template>

<script>
import MovieDetail from '@/components/MovieDetail'
import ReviewList from '@/components/ReviewList'
import DetailPoster from '@/components/DetailPoster'
import WriteReview from '@/components/WriteReview'

export default {
  name: 'MovieDetailView',
  data() {
    return {
      movie: JSON.parse(this.$route.query.movie),
    }
  },
  components: {
    MovieDetail,
    ReviewList,
    DetailPoster,
    WriteReview,
  },
  mounted() {
    // console.log('무비 아이디', movie.id)
    this.movie = JSON.parse(this.$route.query.movie)
    console.log('영화', this.movie.id)
    this.$store.dispatch('movieReviews', this.movie.id)
  },
  // beforeRouteUpdate(to, from, next) {
  //   next({name: 'MovieDetailView', query: {movie: JSON.stringify(this.movie)}})
  // }
}
</script>

<style>
#backdrop-container {
  /* background: radial-gradient(transparent 50px, white); */
  width: inherit;
  height: 600px;
  position: relative;
  box-shadow: inset 0 0 50px 60px rgba(255, 255, 255, 1), inset 10px 0 50px 70px rgba(255, 255, 255, 1);
  /* box-shadow: inset 0 0 0 0 blue, inset 0 0 0 0 red; */
  /* border-radius: 50%; */
  /* margin-top: -40px; */
}

#backdrop-container > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* #backdrop-div {
  background: radial-gradient(transparent, white);
  width: 1320px;
  height: 600px;
} */

/* @media (max-width: 1340px) {
  #backdrop-container, #backdrop-div {
    width: 1320px;
    height: 600px;
  }
} */
/* 
@media (max-width: 1140px) {
  #backdrop-container, #backdrop-div {
    width: 1140px;
    height: 600px;
  }
}

@media (max-width: 960px) {
  #backdrop-container, #backdrop-div {
    width: 1140px;
    height: 600px;
  }

  #backdrop-container {
    box-shadow: inset 10px 0 80px 50px rgba(255, 255, 255, 1);
}
}

@media (min-width: 720px) {
  #backdrop-container, #backdrop-div {
    width: 720px;
    height: 600px;
  }
}

@media (min-width: 576px) {
  #backdrop-container, #backdrop-div {
    width: 576px;
    height: 600px;
  }
} */

#detail-cotent {
  position: relative;
  top: -80px;
  z-index: 9999;
}

/* .effect {
  display: inline-block;
  position: relative;
}

.effect::after {
  position: absolute;
  display: block;
  content: '';
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 
     inset 0 0 20px #fff
     inset 0 0 20px #fff
     inset 0 0 20px #fff
     inset 0 0 20px #fff;
} */
</style>