<template>
  <div>
    <h3>네브바NavbarPage.vue </h3>
    <button @click="toProfile">프로필</button>
    <button @click="toMyMovie">관심 영화</button>
    <button @click="searchMovie">영화검색</button>
    <button @click="logOut">로그아웃</button>
    <button @click="test">test</button>
    
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
      this.$router.push({ name: 'MyMovieView'})
    },
    searchMovie() {
      this.$router.push({ name: 'SearchMovieView' })
    },
    logOut () {
      // 로그아웃 기능
      console.log('로그아웃 누름!')
      this.$store.dispatch('logOut')
      console.log('로그아웃 누름!')
      this.$router.push({name: 'LoginView'})
    },
    test() {
      this.$router.push({name: 'TmpView'})
    }
  }
}
</script>

<style>

</style>