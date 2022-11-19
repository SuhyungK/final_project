<template>
  <nav class="navbar my-3">
    <!-- Nav 로고 -->
    <div id="nav-bar-logo">
      LOGO
      <!-- <h3 style="font-weight: 900;">LOGO</h3> -->
    </div>

    <!-- Nav 검색창 -->
    <div>
      <div id="nav-bar-search" class="input-group">
        <i class="bi bi-search input-group-text" id="search-bar" @click="searchMovie"></i>
        <input type="text" class="form-control" placeholder="영화검색" @keyup.enter="searchMovie" aria-label="search" aria-describedby="search-bar">
      </div>

      <!-- <button class="button-nav-list" @click="searchMovie">영화검색</button> -->
    </div>

    <!-- Nav 프로필-관심영화-로그아웃 -->
    <div id="nav-bar-end">
      <button class="button-nav-list me-3" @click="toProfile">PROFILE</button>
      <button class="button-nav-list me-3" @click="toMyMovie">LIST</button>
      <button class="button-nav-list" @click="logOut">SIGN OUT</button>
      
    </div>
    <!-- <button class="button-nav-list" @click="test">test</button>
    <button class="button-nav-list" @click="test1">test1 : 유저가 좋아요한 목록</button>
    <button class="button-nav-list" @click="test2">test2 : 영화추천 알고리즘</button>
    <button class="button-nav-list" @click="test3">test3 : 유저가 좋아요한 영화목록 - 디테일</button> -->
      
  </nav>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";

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
      console.log('로그아웃 누름!')
      this.$store.dispatch('logOut')
      console.log('로그아웃 누름!')
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
    }
  }
}
</script>

<style>
.button-nav-list {
  all: unset;
  font-weight: 900;
  font-size: 16px;
}

#nav-bar-search {
  position: relative;
  left: 25%;
}

#nav-bar-search > i{
  cursor: pointer;
}

#nav-bar-logo {
  font-weight: 900;
  font-size: 16px;
}

#nav-bar-end, #nav-bar-logo {
}
</style>>