<template>
  <div class="row px-2">
    <!-- 영화 포스터 -->
    <div id="mini-poster-container" class="col-2">
      <img class="rounded" :src="`https://image.tmdb.org/t/p/original${posterurl}`" alt="영화이미지"
        @click="toDetail"
      >
    </div>

    <div class="col-10 text-start">

      <!-- 영화 제목 -->
      <p class="h4 mb-3" style="font-weight: 700;">{{ title }}</p>

      <!-- 리뷰 작성자 정보 + 리뷰 내용 -->
      <div class="row" style="margin-left: -1px;">
        <!-- 리뷰 작성자 프로필 -->
        <div @click="toProfile" class="col-2 rounded-circle overflow-hidden position-relative" style="width: 65px; height: 65px;">
          <img src="https://img.etoday.co.kr/pto_db/2020/06/600/20200615143258_1472639_640_640.jpg" alt="김수현"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; object-fit: cover;"
          >
          1
        </div>
        <div class="col-10 d-flex flex-column">
          <!-- 리뷰 작성자 이름 -->
          <span class="h5 fw-bold">{{ user }}</span>

          <!-- 리뷰 내용 -->
          <p class="text-justify">{{ content }}</p>
        </div>

      </div>
      

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
  },
  methods: {
    toProfile() {
      this.$router.push({name: 'ProfileView', params: {username: this.user}})
    },
    toDetail() {
      this.$router.push({name: 'MovieDetailView', params: {moviePk: this.review.movie}})
    }
  }
}
</script>

<style>

</style>