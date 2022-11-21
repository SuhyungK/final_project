<template>
  <div>
    <h1>프로필 페이지 ProfileView.vue</h1>
    <div class="d-flex flex-row">

      <div>
        <ProfileInfomation class="box"/>
        <MovieGage class="box"/>
      </div>


      <div>
        <TickedMovieList class="box"/>
        <div class="d-flex flex-row">
        <BadgeList class="box"/>
        <MyReviews class="box"/>
        </div>
      </div>

    </div>

    <!-- 추가 -->
    <div class="container">
      <div class="mt-5 mb-3 row">
        <!-- 프로필 정보 -->
        <div class="col-4 border d-flex flex-column">
          <ProfileInfomation/>
          <MovieGage/>
        </div>

        <!-- 프로필 정보 외 -->
        <div class="col-8 border d-flex flex-column">
          <!-- 예매 정보 & 뱃지 정보 -->
          <div class="row row-cols-2">
            <TickedMovieList/>
            <BadgeList/>
          </div>

          <!-- 내가 쓴 리뷰 -->
          <MyReviews/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileInfomation from '@/components/ProfileInfomation'
import MovieGage from '@/components/MovieGage'
import TickedMovieList from '@/components/TickedMovieList'
import BadgeList from '@/components/BadgeList'
import MyReviews from '@/components/MyReviews'

export default {
  name: 'ProfileView',
  components: {
    ProfileInfomation,
    MovieGage,
    TickedMovieList,
    BadgeList,
    MyReviews,
  },
  computed: {
    myBadges() {
      return this.$store.state.myBadges
    }
  },
  mounted() {
    
    },
  beforeCreate() {
    this.$store.dispatch('myReview') // 리뷰 불러오기
    this.$store.dispatch('reqMyPayedMovies') // 내가 예매한 영화 불러오기
    // this.$store.dispatch('myMovieGenres') // 게이지 데이터 뽑기
  }



  
}
</script>

<style>

.box {
  width : auto;
  height: auto;
  background-color: #f5d682;
  border: 1px solid red;
}

</style>