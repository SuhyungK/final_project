<template>
  <div class="container">
    <div class="row">
      <!-- 프로필 정보 -->
      <div class="col-4 border d-flex flex-column">
        <ProfileInfomation/>
        <MovieGage/>
      </div>

      <!-- 프로필 정보 외 -->
      <div class="col-8 border d-flex flex-column">
        <!-- 예매 정보 & 뱃지 정보 -->
        <div class="row row-cols-2">
          <TickedMovie/>
          <BadgeList/>
        </div>
        
        <!-- 내가 좋아요 한 영화? -->
        <MymovieList/>

        <!-- 내가 쓴 리뷰 -->
        <MyReview/>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileInfomation from '@/components/ProfileInfomation'
import MovieGage from '@/components/MovieGage'
import TickedMovie from '@/components/TickedMovie'
import BadgeList from '@/components/BadgeList'
import MymovieList from '@/components/MymovieList'
import MyReview from '@/components/MyReview'

export default {
  name: 'ProfileView',
  components: {
    ProfileInfomation,
    MovieGage,
    TickedMovie,
    BadgeList,
    MymovieList,
    MyReview,
  },
  created() {
    this.$store.dispatch('myLikeMovies') // 인덱스 페이지 오면 유저가 좋아요한 영화 pk 수집
  }
}
</script>

<style>

</style>