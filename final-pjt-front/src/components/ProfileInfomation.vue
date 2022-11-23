<template>
  <div class="d-flex flex-column align-items-center">
    <!-- <h1>프로필 정보</h1> -->

    <!-- 프로필 이미지 -->
    <div id="profile-image" class="border rounded-circle">
      <img src="https://pbs.twimg.com/profile_images/799445590614495232/ii6eBROd_400x400.jpg" alt="프로필이미지"
        sytle=""
      >
    </div>
    <div v-if='profileOwner != userInfo.userName'>
      <button @click='doFollow' v-if='!isfollowed'>팔로우</button>
      <button @click='doFollow' v-if='isfollowed'>팔로우 취소</button>
    </div>
    <h5>팔로우 : {{followsCount}} // 팔로잉 : {{ followingsCount }}</h5>

    <!-- 유저 정보 -->
    <div class="m-4">
      <span class="h3" style="color: #00ABB3; font-weight: 900;">{{ profileOwner }}</span>
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
</style>