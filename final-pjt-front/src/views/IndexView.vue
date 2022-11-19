<template>
<!-- 인덱스 페이지 -->
  <div class="container">    
    
    <!-- 쇼츠 영상 재생 / 상위 -->
    <ShortPage/>

    <!-- 최다 리뷰 + 아니면 다른 사이트 리뷰 +  오늘 탑 영화?암튼 / 하위 -->
    <div class="row my-4">
      <TopReviewMovie class="col-8"/>
      <TrendingMovie class="col-4"/>
    </div>
  </div>
</template>

<script>
// import NavbarPage from '@/components/NavbarPage.vue'
import ShortPage from '@/components/ShortPage.vue'
import TopReviewMovie from '@/components/TopReviewMovie.vue'
import TrendingMovie from '@/components/TrendingMovie.vue'
import "bootstrap-icons/font/bootstrap-icons.css";

export default {
  name: 'IndexView',
  components: {
    // NavbarPage,
    ShortPage,
    TopReviewMovie,
    TrendingMovie,
  },
  data() {
    return {
    }
  },
  created() {
    // this.$store.dispatch('myLikeMovies') // 인덱스 페이지 오면 유저가 좋아요한 영화 pk 수집
  },
  mounted() {
    const tmp = this.$store.getters.isLogin
    if (!tmp) {
      alert('로그인이 필요한 서비스 입니다!')
      // this.$router.push({name:'LoginView'})
    }
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

</style>