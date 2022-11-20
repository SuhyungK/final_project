<template>
  <div id="container" class="d-flex justify-content-center align-items-center">
    <!-- <iframe :src="src" title="YouTube video player" frameborder="0" autoplay="1" allow="autoplay; encrypted-media">

    </iframe> -->
    <div id="login-container" class="d-inline-block text-white d-flex flex-column">
      <div class="d-flex justify-content-start">
        <p class="h3 mb-4 mt-2" id="login-place" style="font-weight: 900;">LOGIN</p>
      </div>
      <form @submit.prevent="logIn">
        <div class="form-floating mb-3">
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
          <p class="fs-6 fw-bolder text-white" @click='toSignUp' style="cursor:pointer;">회원가입</p>
        </div>
      </form>

      <button class="button" @click="toIndex">로그인(Index)</button>
      <!-- <button @click='toSignUp'>회원가입</button> -->

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
  } 
}
</script>

<style scoped>
#container {
  /* border: 0.5rem solid red; */
  width: 100vw;
  height: 100vh;
  background-image: url('https://image.tmdb.org/t/p/original/mqsPyyeDCBAghXyjbw4TfEYwljw.jpg');
  background-size: cover;
  /* background: rgb(0, 0, 0) */
  overflow: hidden;
}

#container > iframe {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  transform: scale(2);
  pointer-events: none;
}

#login-container {
  position: absolute;
  z-index: 9999;
  /* border: 0.1rem solid black; */
  /* border-radius: 0.625rem; */
  padding: 1.5rem 1.8rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  /* backdrop-filter: blur(10px); */
}

#login-place {
  color: red;
  /* font-size: 24px; */
  /* font-weight: 900; */
}

#login-container input[type=text], input[type=password] {
  border: none;
  /* border-radius: 0.5rem; */
  background: rgba(0, 0, 0, 0.75);
  /* border-bottom: 0.5rem solid red; */
  color: white;
}

input[type=submit] {
  /* background-color: #00ABB3; */
  background-color: gray;

  /* 로그인 버튼 그라데이션 효과 */
  /* background-image: linear-gradient(to right, #16222A 0%, #3A6073  51%, #16222A  100%); */
  
  border: none;
  /* border-radius: 0.5rem; */
  padding: 15px 140px;
  transition: 0.3s;
  background-size: 200% auto;
}

input[type=submit]:hover {
  background-color: red;

  /* 로그인 버튼 그라데이션 효과(hover) */
  background-position: left right; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>