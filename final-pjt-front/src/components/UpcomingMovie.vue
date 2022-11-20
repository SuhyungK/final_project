<template>
  <div>
    <p class="header-title">
      Upcoming Movie
    </p>
    <div 
      id="trending-movie-list"
      class="row d-flex justify-content-center" 
      >
      <div class="col-6 m-3"
        v-for="trdMovie in trendingMovieList"
        :key="trdMovie.id"
      >
        <img :src="`https://image.tmdb.org/t/p/w300/`+trdMovie.poster_path" :alt="trdMovie.title" class="rounded">
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
	name: 'UpcomingMovie',
  data() {
    return {
      trendingMovieList: []
    }
  },
	created() {
		axios({
			method: 'get',
			url: 'https://api.themoviedb.org/3/movie/upcoming?api_key=26f430349f35e05f01c48db888f30795&language=en-US&page=1',
		})
      .then((res) => {
        this.trendingMovieList = res.data.results
        // https://image.tmdb.org/t/p/w500/
      })
      .catch((err) => {
        console.log(err)
      })
	}
}
</script>

<style>
#trending-movie-list > div {
  width: 150px;
  padding: 0;
  margin: 0;
}

#trending-movie-list > div:hover {
  cursor: pointer;
  /* border: .2rem solid green;
  border-radius: .375rem; */
}

#trending-movie-list img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-sizing: border-box;
}
</style>