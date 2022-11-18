<template>
  <div id="container" class="d-flex justify-content-center align-items-center">
    <iframe :src="src" title="YouTube video player" frameborder="0" autoplay="1" allow="autoplay">

    </iframe>
    <div id="login-container" class="d-inline-block text-white d-flex flex-column">
      <div class="d-flex justify-content-start">
        <p class="h2 mb-4 mt-2 fw-bolder" style="color:red;">LOGIN</p>
      </div>
      <form @submit.prevent="logIn">
        <div id="form-input" class="form-floating mb-4">
          <!-- <label for="username">username : </label> -->
          <input type="text" id="username" class="form-control" v-model="username" placeholder="username">
          <label for="username">Enter the username</label>
        </div>

        <div class="form-floating mb-4">
          <!-- <label for="password"> password : </label> -->
          <input type="password" id="password" class="form-control" v-model="password" placeholder="password">
          <label for="password">Enter the password</label>
        </div>

        <input type="submit" id="button-submit" class="btn-floating mb-1 text-white" value="로그인">
        <hr>
        <div class="d-flex justify-content-end">
          <router-link :to="{ name : 'SignUpView' }" class="text-decoration-none"><p class="fs-6 fw-bolder text-white">회원가입</p></router-link>
        </div>
      </form>

      <button class="button" @click="toIndex">로그인(Index)</button>
      <button @click='toSignUp'>회원가입</button>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
    }
  },
  computed: {
    src() {
      const srcUrl = 'https://www.youtube.com/embed/pjMt1MIk2EA?start=5&autoplay=1&controls=0&mute=1&origin=http://localhost:8080/'
      return srcUrl
    },
  },
  methods: {
    logIn () {
      const username = this.username
      const password = this.password

      const payload = {
        username, password
      }
      this.$store.dispatch('logIn', payload)
    },

    toIndex() {
      this.$router.push({name: 'IndexView'})
    },
    toSignUp() {
      this.$router.push({name: 'SignUpView'})
    }
  },
}
</script>

<style scoped>
#container {
  /* border: 0.5rem solid red; */
  width: 100vw;
  height: 100vh;
  /* background-image: url('https://image.tmdb.org/t/p/original/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg');
  background-size: cover; */
  /* background: rgb(0, 0, 0) */
  overflow: hidden;
}

#container > iframe {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  transform: scale(2)
}

#login-container {
  position: absolute;
  z-index: 9999;
  /* border: 0.1rem solid black; */
  /* border-radius: 0.625rem; */
  padding: 1.5rem 1.8rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.8);
  /* backdrop-filter: blur(10px); */
}

#login-container input[type=text], input[type=password] {
  border: none;
  /* border-radius: 0.5rem; */
  background: rgba(0, 0, 0, 0.75);
  /* border-bottom: 0.5rem solid red; */
}

input[type=submit] {
  /* background-color: #00ABB3; */
  background-color: red;
  border: none;
  /* border-radius: 0.5rem; */
  width: 300px;
  height: 50px;
}

</style>