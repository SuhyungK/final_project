<template>
  <div>
    <h1>프로필 페이지</h1>
    <ProfileInfomation/>
    <MovieGage/>
    <TickedMovie/>
    <BadgeList/>
    <MymovieList/>
    <MyReview/>
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