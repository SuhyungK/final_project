<template>   <div id="app">
    <!-- <div v-if="this.$store.getters.isLogin" class="my-0 bg-light"> -->
    <div v-if="isNavShow" class="my-0 bg-light">
      
      <NavbarView class="container py-3 bg-light"/>
    </div>
    <router-view :key="$route.fullPath"/>

    <!-- <footer v-if="this.$store?.getters?.isLogin?true:false" class="mt-4 mb-5"> -->
    <footer v-if="isNavShow" class="mt-4 mb-5">
      <p class="h4 fst-italic" style="font-weight: 900;">FOOTER</p>
    </footer>
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
      isNavShow: true,
    }
  },
  methods: {
    notShowNavBar() {
      const thisPathname = document.location.pathname
      if (thisPathname === '/Login' || thisPathname === '/sign-up') {
        this.isNavShow = false
      } else {
        this.isNavShow = true
      }
    }
  },
  beforeRouteUpdate(to, from, next) {
    const thisPathname = document.location.pathname
    if (thisPathname === '/Login' || thisPathname === '/sign-up') {
      this.isNavShow = false
      next()
    } else {
      this.isNavShow = true
      next()
    }
  },
  beforeCreate() {
    // this.$router.push({ name: 'LoginView' })
    this.notShowNavBar()
  },
  created() {
  },
  updated() {
    // this.$router.push({ name: 'LoginView' })
    this.notShowNavBar()
  },
}
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700;900&family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
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

.cursor-pointer {
  cursor: pointer;
}
</style>