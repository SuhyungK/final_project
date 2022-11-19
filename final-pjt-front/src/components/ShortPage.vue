<template>
  <div id="example">
    <carousel-3d :autoplay="true" :autoplayHoverPause="true" :perspective="0" :space="300">
      <slide v-for="(slide, i) in slides" :index="i" :key="i">
        <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
          <img :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="slide.src">
        </template>
      </slide>
    </carousel-3d>
    <!-- <carousel-3d>
      <slide v-for="(slide, i) in slides" :key="i">
        1
        <img src="https://swiperjs.com/demos/images/nature-1.jpg">
      </slide>
    </carousel-3d> -->
    <div class="shadow">
      안녕
    </div>
    <youtube video-id="pjMt1MIk2EA" ref="youtube" :player-vars="playerVars" @playing="playing"></youtube>
    <button @click="playVideo">play</button>
  </div>
</template>

<script src="vue-youtube/dist/vue-youtube.js"></script>
<script>
import { Carousel3d, Slide } from 'vue-carousel-3d';
export default {
  name: 'ShortPage',
  components: {
    Carousel3d,
    Slide
  },
  data() {
    return {
      slides: 7,
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        start: 15, 
        end: 30, 
      }
    }
  },
  methods: {
    playVideo() {
      this.$refs.youtube.player.playVideo()
    }
  }
}
</script>


<style>

</style>