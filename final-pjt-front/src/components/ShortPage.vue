<template>
  <div>

    <!-- 추천영화 carousel -->
    <div class="d-flex flex-column header-title">
      <!-- carousel title -->
      <p class="h3" style="font-weight: 900;">
        Recommend Movie List
      </p>

      <!-- carousel content -->
      <carousel-3d :autoplay="true" :autoplayHoverPause="true" :perspective="10" :space="300">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
            <div 
              :data-index="index" 
              :class="{ 
                current: isCurrent, 
                onLeft: (leftIndex >= 0), 
                onRight: (rightIndex >= 0) 
                }" 
              :src="slide.src"
              style="z-index: -1; positon: relative;"
              
            >
              <div v-if="isCurrent" @mouseover="thismouserover=true" @mouseout="thismouserover=false" id="likeIcon" class="position-absolute d-flex justify-content-center align-items-center rounded-circle shadow-lg bg-body" 
                style="z-index: 99999; opacity: 0.7; bottom: 5px; right: 5px; font-size: 30px; width: 50px; height: 50px; background-color: #FFFFFF;"
                >
                <i @click="likeMovie(index)" v-if="!thislike[index]" id="likeLike" class="bi bi bi-suit-heart"></i>
                <i @click="likeMovie(index)" v-if="thislike[index]" id="likeLike" class="bi bi bi-suit-heart-fill" style="color: red;"></i>
                <!-- <i class="bi bi-suit-heart"></i> -->
              </div>

              <img v-if="!slide.trailer_path" 
                :src="'https://image.tmdb.org/t/p/w500' + slide.poster_path" alt="img"
                id="ytb"  
              >
              <youtube id="ytb" :video-id="slide.trailer_path?slide.trailer_path:gW1mqEZNpns" ref="youtube"
                v-if="slide.trailer_path"
              >

              </youtube>  
            </div>
          </template>
        </slide>
      </carousel-3d>
      <!-- <carousel-3d>
        <slide v-for="(slide, i) in slides" :key="i">
          1
          <img src="https://swiperjs.com/demos/images/nature-1.jpg">
        </slide>
      </carousel-3d> -->

      <!-- <youtube video-id="pjMt1MIk2EA" ref="youtube" :player-vars="playerVars" @playing="playing"></youtube> -->
      <!-- <button @click="playVideo">play</button> -->
    </div>
    <hr>
    <router-view></router-view>
    <!-- {{thislike}} -->
  </div>
</template>

<script src="vue-youtube/dist/vue-youtube.js"></script>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';

export default {
  name: 'ShortPage',
  components: {
    Carousel3d,
    Slide,
  },
  data() {
    return {
      // thislike: false,
      thislike: [false, false,false,false,false,false,false,false,false,false,],
      thismouserover: false,
    }
  },
  computed: {
    slides() {
      return this.$store.state.recommendMovies
    },
    likeMovieList() {
      return this.$store.state.myLikeMovies
    },
  },
  methods: {
    playVideo() {
      this.$refs.youtube.player.playVideo()
    },
    likeMovie(index) {
      // const moviePk = this.slides[index].movie_id
      // const arr = this.$store.state.myLikeMovies
      this.$store.dispatch('likeMovie', this.slides[index].movie_id)
      this.thislike[index] = !this.thislike[index]
      console.log(this.thislike)
    }
  },
  mounted() {
  }
}
</script>


<style>
#example template {
  overflow: hidden;
}

#carousel img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* #carousel-title {
  font-weight: 900;
  font-size: 20px;
  /* letter-spacing: .08rem;
} */

#ytb {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#likeIcon:hover {
  transform: translate(-3px, -7px);
}

#likeLike:hover {
  transform: scale(1.2, 1.2);
}
</style>