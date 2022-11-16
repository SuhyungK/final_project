<template>
  <div>
    <h1>인덱스 IndexView.view </h1>
    <NavbarPage/>
    <ShortPage/>
  </div>
</template>

<script>
import NavbarPage from '@/components/NavbarPage.vue'
import ShortPage from '@/components/ShortPage.vue'

export default {
  name: 'IndexView',
  components: {
    NavbarPage,
    ShortPage,
  },
  
  mounted() {
    const tmp = this.$store.getters.isLogin
    if (!tmp) {
      alert('로그인이 필요한 서비스 입니다!')
      // this.$router.push({name:'LoginView'})
    }
  }

}

</script>

<style>

</style>