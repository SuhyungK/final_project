<template>
  <!-- Navbar -->
  <div class="navbar d-flex justify-content-between">
    <!-- Nav 로고 -->
    <div id="nav-bar-logo">
      <!-- <router-link :to="{name: 'IndexView'}" style="all: unset; cursor: pointer;"><p class="h4 fw-bolder fst-italic">PJT</p></router-link> -->
      <router-link :to="{name: 'IndexView'}" style="text-decoration: none; color: inherit;"><p class="h4 fw-bolder fst-italic">PJT</p></router-link>
      <!-- <h3 style="font-weight: 900;">LOGO</h3> -->
    </div>

    <!-- Nav 검색창 -->
    <div id="nav-bar-search">
      <div class="input-group">
        <i class="bi bi-search input-group-text" id="search-bar"></i>
        <input type="text" class="form-control" placeholder="영화검색" 
          @input="searchMovie"
          @keydown.enter="moveToSearchPage"

          aria-label="search" aria-describedby="search-bar">
      </div>

      <!-- <button class="button-nav-list" @click="searchMovie">영화검색</button> -->
      <div class="list-group position-absolute" :style="{width: '100%'}">
        <router-link class="list-group-item list-group-item-action"
          v-for="sMovie in searchMovieList" 
          :key="sMovie.movie_id" 
          :to="{name: 'MovieDetailView', query: {movie: JSON.stringify(sMovie)} }"
          @click.native="clearSearchList"
          style="z-index: 99999;"
          >
            {{ sMovie.title }}
        </router-link>
      </div>
    </div>
    
    <!-- Nav 프로필-관심영화-로그아웃 -->
    <div id="nav-bar-end">
      <router-link :to="{name: 'ProfileView', params: {username: this.$store.state.userInfo.userName}}" class="button-nav-list h6 me-4" :style="{'font-weight': '800'}" @click="toProfile">PROFILE</router-link>
      <router-link :to="{name: 'MyMovieView' }" class="button-nav-list h6 me-4" :style="{'font-weight': '800'}" @click="toMyMovie">MOVIELIST</router-link>
      <p class="button-nav-list h6" :style="{'font-weight': '800'}" @click="logOut">SIGN OUT</p>
    </div>

    <!-- Nav toggler -->
    <div id="navbar-toggler-div">
      <b-button v-b-toggle.sidebar-right class="navbar-toggler" type="button">
        <span class="navbar-toggler-icon"></span>
        <b-sidebar id="sidebar-right" title="Navbar" right shadow>
          <div class="my-4">
            <router-link :to="{name: 'ProfileView', params: {username: this.$store.state.userInfo.userName} }" class="button-nav-list h6 me-4" :style="{'font-weight': '800'}" @click="toProfile">PROFILE</router-link>
          </div>
          <div class="my-4">
            <router-link :to="{name: 'MyMovieView' }" class="button-nav-list h6 me-4" :style="{'font-weight': '800'}" @click="toMyMovie">MOVIELIST</router-link>
          </div>
          <div>
            <p class="button-nav-list h6" :style="{'font-weight': '800'}" @click="logOut">SIGN OUT</p>
          </div>
        </b-sidebar>
      </b-button>
    </div>
    
    <!-- <button class="button-nav-list" @click="test">test</button>
    <button class="button-nav-list" @click="test1">test1 : 유저가 좋아요한 목록</button>
    <button class="button-nav-list" @click="test2">test2 : 영화추천 알고리즘</button>
    <button class="button-nav-list" @click="test3">test3 : 유저가 좋아요한 영화목록 - 디테일</button> -->
    
  </div>
</template>

<script>
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from 'axios'

export default {
  name: 'NavbarPage',
  data() {
    return {
      searchMovieList: [],
    }
  },
  computed: {
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
    // searchMovie(e) {
    //   if (document.location.pathname != '/search') {
    //     this.$router.push({ name: 'SearchMovieView' })
    //   }
    
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
    searchMovie(e) {
      if (e.target.value) {
        const DJANGO_API_URL = 'http://127.0.0.1:8000'
        axios({
          method: 'get',
          url: `${DJANGO_API_URL}/movies/search/`,
          params: {
            search_word: e.target.value
          }
        })
          .then((res) => {
            this.searchMovieList = res.data
            // console.log(res.data)
            // console.log(this.searchMovieList)
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    moveToSearchPage(e) {
      if (e.target.value) {
        const DJANGO_API_URL = 'http://127.0.0.1:8000'
        axios({
          method: 'get',
          url: `${DJANGO_API_URL}/movies/search/`,
          params: {
            search_word: e.target.value
          }
        })
          .then((res) => {
            this.searchMovieList = res.data
            if (this.searchMovieList.length == 1) {
              this.searchMovieList = []
              this.$router.push({name: 'MovieDetailView', params: {moviePk: res.data[0].movie_id}})
              // this.$router.push({name: 'MovieDetailView', params: {movieId: , movie: res.data[0]}})
            } else {
              this.searchMovieList = []
              this.$store.commit('SAVE_SEARCH_MOVIE', res.data)
              this.$router.push({name: 'SearchMovieView'})
            }
          })
          .catch((err) => {
            console.log(err)
          })
        }
    },
    clearSearchList() {
      this.searchMovieList = []
    }
  },
  created() {
    // this.$store.dispatch('myLikeMovies') // 인덱스 페이지 오면 유저가 좋아요한 영화 pk 수집
  },
  destroyed() {
  },
}
</script>

<style>
.button-nav-list {
  all: unset;
}

.button-nav-list:hover {
  cursor: pointer;
  color: #00ABB3;
  text-decoration: underline;
}

/* #nav-bar-logo {
  font-weight: 900;
  font-size: 16px;
} */

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

@media (min-width: 992px) {
  #nav-bar-end {
    display: block;
  }
  #nav-bar-search {
    display: block;
    left: 9%;
  }
  #navbar-toggler-div {
    display: none;
  }
  .nav-bar-search {
    left: 20%;
  }
}

@media (max-width: 992px) {
  #nav-bar-end {
    display: none;
  }
  #nav-bar-search {
    display: none;
  }
  #navbar-toggler-div {
    display: block;
  }
}
</style>