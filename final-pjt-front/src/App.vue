<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  created() {
    this.$router.push({ name: 'LoginView' })
  }
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
  box-sizing: border-box;
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
