<template>
  <div>
    <h1>로그인 페이지</h1>
    <form @submit.prevent="logIn">
      <label for="username">username : </label>
      <input type="text" id="username" v-model="username"><br>

      <label for="password"> password : </label>
      <input type="password" id="password" v-model="password"><br>

      <input type="submit" value="logIn">
    </form>

    <button @click="toIndex">로그인</button>
    <button @click='toSignUp'>회원가입</button>

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

<style>

</style>