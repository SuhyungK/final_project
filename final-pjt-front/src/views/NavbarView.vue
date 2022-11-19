<template>
  <!-- Navbar -->
  <nav class="navbar d-flex justify-content-between my-3">
    <!-- Nav 로고 -->
    <div id="nav-bar-logo">
      LOGO
      <!-- <h3 style="font-weight: 900;">LOGO</h3> -->
    </div>

    <!-- Nav 검색창 -->
    <div id="nav-bar-search" :style="{display: isNone, left: searchBarLeft }">
      <div class="input-group">
        <i class="bi bi-search input-group-text" id="search-bar" @click="searchMovie"></i>
        <input type="text" class="form-control" placeholder="영화검색" @keyup.enter="searchMovie" aria-label="search" aria-describedby="search-bar">
      </div>

      <!-- <button class="button-nav-list" @click="searchMovie">영화검색</button> -->
    </div>

    <!-- Nav 프로필-관심영화-로그아웃 -->
    <div id="nav-bar-end" :style="{'visibility': isHidden, 'display': isNone }">
      <router-link :to="{name: 'ProfileView' }" class="button-nav-list me-4" @click="toProfile">PROFILE</router-link>
      <router-link :to="{name: 'MyMovieView' }" class="button-nav-list me-4" @click="toMyMovie">MOVIELIST</router-link>
      <p class="button-nav-list" @click="logOut">SIGN OUT</p>
    </div>


    <!-- Nav toggler < 990px : Nav 오른쪽 없애기 / < 750px : Nav 검색창 없애기-->
    <div :style="{'display' : isBtnNone }" >
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
        <span class="navbar-toggler-icon"></span>
      </button>
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
  data() {
    return {
      windowWidth: 0,
      windowHeight: 0,
    }
  },
  computed: {
    isHidden() {
      if (this.windowWidth <= 1200) {
        return 'hidden'
      } else {
        return 'visible'
      }
    },
    isNone() {
      if (this.windowWidth <= 773) {
        return 'none'
      } else {
        return 'block'
      }
    },
    isBtnNone() {
      if (this.windowWidth <= 1200) {
        return 'block'
      } else {
        return 'none'
      }
    },
    searchBarLeft() {
      if (this.windowWidth <= 995) {
        return '20%'
      } else if (this.windowWidth <= 1200) {
        return '20%'
      } else if (this.windowWidth <= 1400) {
        return '10%'
      } else {
        return '8.5%'
      }
    } 
  },
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
      if (document.location.pathname != '/search') {
        this.$router.push({ name: 'SearchMovieView' })
      }
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
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight;
      // console.log(this.isNone)
    }
  },
  created() {
    // this.$store.dispatch('myLikeMovies') // 인덱스 페이지 오면 유저가 좋아요한 영화 pk 수집
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
  
}
</script>

<style>
.button-nav-list {
  all: unset;
  font-weight: 900;
  font-size: 16px;
}

.button-nav-list:hover {
  cursor: pointer;
  color: #00ABB3;
}

#nav-bar-logo {
  font-weight: 900;
  font-size: 16px;
}

#nav-bar-search {
  position: relative;
  /* left: 12%; */
}

#nav-bar-search > span {
  background-color: white;
}

#nav-bar-search > i {
  cursor: pointer;
}

#nav-bar-end, #nav-bar-logo {
}
</style>>