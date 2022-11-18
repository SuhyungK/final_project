<template>
  <div>
    <h1>프로필 페이지 ProfileView.vue</h1>
    <div class="d-flex flex-row">

      <div>
        <ProfileInfomation class="box"/>
        <MovieGage class="box"/>
      </div>


      <div>
        <TickedMovie class="box"/>
        <div class="d-flex flex-row">
        <BadgeList class="box"/>
        <MymovieList class="box"/>
        <MyReview class="box"/>
        </div>
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
  computed: {
    myBadges() {
      return this.$store.state.myBadges
    }
  },
  mounted() {
    this.$store.dispatch('badgeUpdate') // 뱃지 정보 업데이트
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