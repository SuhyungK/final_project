<template>
<!-- 인덱스 페이지 -->
  <div class="container">    
    <!-- <NavbarPage/> -->
    <!-- 쇼츠 영상 재생 / 상위 -->
    <ShortPage class="mt-4"/>

    <!-- 상영 중인 영화 -->
    <NowPlayingMovie/>

    <!-- 최다 리뷰 + 아니면 다른 사이트 리뷰 +  오늘 탑 영화?암튼 / 하위 -->
    <div class="row my-4">
      <TopReviewMovie class="col-8"/>
      <UpcomingMovie class="col-4"/>
    </div>

  </div>
</template>

<script>
// import NavbarPage from '@/components/NavbarPage.vue'
import ShortPage from '@/components/ShortPage.vue'
import TopReviewMovie from '@/components/TopReviewMovie.vue'
import UpcomingMovie from '@/components/UpcomingMovie.vue'
import NowPlayingMovie from '@/components/NowPlayingMovie.vue'
import "bootstrap-icons/font/bootstrap-icons.css";

export default {
  name: 'IndexView',
  components: {
    // NavbarPage,
    ShortPage,
    NowPlayingMovie,
    TopReviewMovie,
    UpcomingMovie,
  },
  
  created() {
    const tmp = this.$store.getters.isLogin
    if (!tmp) {
      alert('로그인이 필요한 서비스 입니다!')
      // this.$router.push({name:'LoginView'})
    }
    this.$store.dispatch('myLikeMovies')
    this.$store.dispatch('topReviewMovie')
    this.$store.dispatch('badgeUpdate')
  },
  mounted() {
    this.$store.dispatch('defaultBadges') // 뱃지 표본 불러오기
    this.$store.dispatch('myBadges', this.$store.state.userInfo.userName) // 내 뱃지들 불러오기
    this.$store.dispatch('badgeUpdate')
    this.$store.dispatch('algorithmRecommendedMovies') // 추천 영화 뽑기
  },

}

</script>

<style>
.button-nav-list {
  all: unset;
  font-weight: 900;
  font-size: 16px;
}

<<<<<<< HEAD
.button-nav-list {
  all: unset;
  font-weight: 900;
  font-size: 16px;
}

=======
>>>>>>> c7de071afecee823faa963f5c76248615a72cf18
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
<<<<<<< HEAD

=======
>>>>>>> c7de071afecee823faa963f5c76248615a72cf18
</style>