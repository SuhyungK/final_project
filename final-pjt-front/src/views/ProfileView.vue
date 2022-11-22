<template>
  <div class="container">
    <!-- <h1>프로필 페이지 ProfileView.vue</h1> -->
    {{profileOwner}}
    {{this.$store.state.followingsList}}
    {{this.$store.state.followsList}}
    <div class="row mt-5">

      <div class="col-4">
        <ProfileInfomation class="mb-2"
        :profileOwner='profileOwner'/>
        <MovieGage class="box"/>
      </div>


      <div class="col-8">
        <TickedMovieList class="box mb-4"/>
        <div class="d-flex flex-row">
        <BadgeList class="box"/>
        <MyReviews class="box"
        :profileOwner='profileOwner'/>
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
  data() {
    return {
      profileOwner: this.$route.params.username
    }
  },
  computed: {
    myBadges() {
      return this.$store.state.myBadges
    },
  },
  mounted() {
    
    },
  beforeCreate() {
    this.$store.dispatch('myReview', this.$route.params.username) // 리뷰 불러오기
    this.$store.dispatch('reqMyPayedMovies', this.$route.params.username) // 내가 예매한 영화 불러오기
    // this.$store.dispatch('myMovieGenres') // 게이지 데이터 뽑기
    this.$store.dispatch('reqFollowingsList', this.$route.params.username)
    this.$store.dispatch('reqFollowsList', this.$route.params.username)

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