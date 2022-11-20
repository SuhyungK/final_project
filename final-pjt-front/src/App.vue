<template>
  <div id="app">
    <div v-if="this.$store.getters.isLogin" class="sticky-top my-0 bg-light">
      
      <NavbarView class="container py-3"/>
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
      isNavShow: null,
    }
  },
  // beforeRouteUpdate(to, from, next) {
  //   const thisPathname = document.location.pathname
  //   if (thisPathname === '/Login' || thisPathname === '/sign-up') {
  //     this.isNavShow = false
  //     next()
  //   } else {
  //     this.isNavShow = true
  //     next()
  //   }
  // },
  // created() {
  //   // this.$router.push({ name: 'LoginView' })
  //   const thisPathname = document.location.pathname
  //   if (thisPathname === '/Login' || thisPathname === '/sign-up') {
  //     this.isNavShow = false
  //   } else {
  //     this.isNavShow = true
  //   }
  // },
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

.text-hover {
  color: #00ABB3;
}
</style>
