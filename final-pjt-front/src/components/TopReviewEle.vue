<template>
  <div class="row px-2">
    <!-- 영화 포스터 -->
    <div id="mini-poster-container" class="col-2">
      <img class='' :src="`https://image.tmdb.org/t/p/original${posterurl}`" alt="영화이미지">
    </div>

    <div class="col-10">
      <p>영화이름: {{ title }}</p>
      <!-- 내용 -->
      <div>
        내용 : {{ content }}
      </div>
      작성자 : {{ user }}

    </div>

    <hr class="my-2">
  </div>
</template>

<script>
export default {
  name: 'TopReviewEle',
  props: {
    review: Array,
  },
  computed: {
    cnt() {
      return this.review[0]
    },
    title() {
      return this.review[1]
    },
    posterurl() {
      return this.review[2]
    },   
    user() {
      return this.review[3]
    },   
    content() {
      return this.review[4]
    },  
  }
}
</script>

<style>

</style>