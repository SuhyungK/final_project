<template>
  <div>
    <h3>네브바NavbarPage.vue </h3>
    <button @click="toProfile">프로필</button>
    <button @click="toMyMovie">관심 영화</button>
    <button @click="searchMovie">영화검색</button>
    <button @click="logOut">로그아웃</button>
    <button @click="test">test</button>
    <button @click="test1">test1 : 유저가 좋아요한 목록</button>
    <button @click="test2">test2 : 영화추천 알고리즘</button>
    <button @click="test3">test3 : 유저가 좋아요한 영화목록 - 디테일</button>
    <button @click="test4">test4 : badgeList 데이터 생성하러 가기</button>
    <button @click="test5">test5 : badgeList 생성</button>
    <button @click="test6">test6 : 내뱃지들 생성</button>
    <button @click="test7">test7 : 사용자가 쓴 리뷰 조회</button>
    <button @click="test8">test8 : DatePicker Test</button>
    
  </div>
</template>

<script>
export default {
  name: 'NavbarPage',
  methods: {
    toProfile () {
      this.$router.push({ name: 'ProfileView' })
    },
    toMyMovie () {
      this.$store.dispatch('myLikeMoviesDetail')
      .then(() => {
        this.$router.push({ name: 'MyMovieView'}) // 내가 좋아요한 영화 목록(디테일) 만들고 이동
      })
    },
    searchMovie() {
      this.$router.push({ name: 'SearchMovieView' })
    },
    logOut () {
      // 로그아웃 기능
      this.$store.dispatch('logOut')
      this.$router.push({name: 'LoginView'})
    },
    test() {
      this.$router.push({name: 'TmpView'})
    },
    test1() {
      this.$store.dispatch('myLikeMovies')
    },
    test2() {
      this.$store.dispatch('algorithm')
    },
    test3() {
      this.$store.dispatch('myLikeMoviesDetail')
    },
    test4() {
      this.$router.push({name: 'TmpBadgeDataCreate'})
    },
    test5() {
      this.$store.dispatch('initialBadge')
    },
    test6() {
      this.$store.dispatch('myBadges')
    },
    test7() {
      this.$store.dispatch('myReview')
    },
    test8() {
      this.$router.push({name: 'DatePickerTestView'})
    },
  }
}
</script>

<style>

</style>