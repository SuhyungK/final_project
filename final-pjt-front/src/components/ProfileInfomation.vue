<template>
  <div>
    <!-- 상위 타이틀 -->
    <div class="h5">
      <span class="h3" style="color: #00ABB3; font-weight: 900;">{{ profileOwner }}</span> 님의 프로필
    </div>
    
    <hr style="position: relative; top: 10px;" class="mb-4">

    <div class="d-flex flex-column align-items-center">
      <!-- <h1>프로필 정보</h1> -->

      <!-- 프로필 이미지 -->
      <div id="profile-image" class="border rounded-circle mb-4">
        <img src="https://pbs.twimg.com/profile_images/799445590614495232/ii6eBROd_400x400.jpg" alt="프로필이미지"
          sytle=""
        >
      </div>

      <!-- 팔로잉/팔로우 여부-->
      
      <div class="mb-3">
        <p class="h5"><span class="me-2">{{followsCount}} follower</span> | <span class="ms-2">{{ followingsCount }} following</span></p>
      </div>

      <div v-if='profileOwner != userInfo.userName'>
        <button id="follow-button" class="p-2 rounded-pill" style="border: 0.15rem solid #00ABB3; background-color: white; color: #00ABB3; width: 100px;" 
        @click='doFollow' v-if='!isfollowed'>팔로우</button>
        <button class="p-2 rounded-pill" style="border: 0.15rem solid white; background-color: #00ABB3; color: white; width: 100px;" 
        @click='doFollow' v-if='isfollowed'>언팔로우</button>
      </div>


      <!-- 유저 정보 -->
      <div class="m-4">
        
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileInfomation',
  props: {
    profileOwner: String,
  },
  data() {
    return {
      userInfo: this.$store.state.userInfo,
    }
  },
  computed: {
    isfollowed() {
      return this.$store.state.followingsList.includes(this.userInfo.userPk)
    },
    followingsCount() {
      return this.$store.state.followingsList.length
    },
    followsCount() {
      return this.$store.state.followsList.length
    },

  },
  methods: {
    doFollow() {
      this.$store.dispatch('doFollow', this.profileOwner)
    }
  }
}
</script>

<style>
#profile-image {
  position: relative;
  width: 250px;
  height: 250px;
  overflow: hidden;
}

#profile-image > img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

#follow-button:hover {
  color: red;
}
</style>