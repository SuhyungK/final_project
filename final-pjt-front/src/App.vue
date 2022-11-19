<template>
  <div id="app">
    <div class="sticky-top bg-light my-0">
      <NavbarView v-if="isNavShow" class="container my-0 py-2"/>
    </div>
    <router-view/>
  </div>
</template>

<script>
import NavbarView from '@/views/NavbarView'

export default {
  name: 'App',
  components: {
    NavbarView
  },
  data() {
    return {
      isNavShow: true
    }
  },
  created() {
    // this.$router.push({ name: 'LoginView' })
    const thisPathname = document.location.pathname
    if (thisPathname === '/Login' || thisPathname === '/sign-up') {
      this.isNavShow = false
    }
  },
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@300;800;900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Noto+Sans:wght@300;800;900&display=swap');
</style>
<style>
* {
  font-family: 'Noto Sans', sans-serif;
  font-family: 'Noto Sans KR', sans-serif;
  /* box-sizing: border-box; */
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-title {
  font-weight: 900;
  font-size: 20px;
  /* letter-spacing: .08rem; */
}
</style>
