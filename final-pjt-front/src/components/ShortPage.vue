<template>
  <div>

    <!-- 추천영화 carousel -->
    <div class="d-flex flex-column header-title">
      <!-- carousel title -->
      <p class="h3 fw-bold">
        Recommend Movie List
      </p>

      <!-- carousel content -->
      <carousel-3d :autoplay="true" :autoplayHoverPause="true" :perspective="10" :space="300">
        <slide v-for="(slide, i) in slides" :index="i" :key="i">
          <h1>slide</h1>
          <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
            <div 
              :data-index="index" 
              :class="{ 
                current: isCurrent, 
                onLeft: (leftIndex >= 0), 
                onRight: (rightIndex >= 0) 
                }" 
              
            >

              <youtube :video-id='slides[index]' ref="youtube">

              </youtube>
                <h1>dssds</h1>
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

    }
  },
  computed: {
    slides() {
      let ysrc = this.$store.state.recommendMovies.map((movie) => {
        return movie.trailer_path
      })
      return ysrc
    }
    
  },
  methods: {
    playVideo() {
      this.$refs.youtube.player.playVideo()
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

</style>