<template>
  <div class="d-flex flex-column align-items-center">
    <!-- <h1>프로필 정보</h1> -->

    <!-- 프로필 이미지 -->
    <div id="profile-image" class="border rounded-circle">
      <img src="https://pbs.twimg.com/profile_images/799445590614495232/ii6eBROd_400x400.jpg" alt="프로필이미지"
        sytle=""
      >
    </div>

    <!-- 유저 정보 -->
    <div class="m-4">
      <span class="h3" style="color: #00ABB3; font-weight: 900;">{{ userInfo.userName }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProfileInfomation',
  data() {
    return {
      userInfo: this.$store.state.userInfo
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