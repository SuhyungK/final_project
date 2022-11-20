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

  },
  beforeCreate() {
    this.$store.dispatch('myReview') // 리뷰 불러오기
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