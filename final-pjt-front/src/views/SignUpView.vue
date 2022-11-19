<template>
  <div>
    <h1>SignUp Page SignUpView.vue</h1>
    <form @submit.prevent="signUp">
      <p v-if="usernameLength < 5">아이디는 5글자 이상으로 해주세요</p>
      <label for="username">username : </label>
      <input type="text" id="username" v-model='username'><br>

      <label for="password1"> password : </label>
      <input type="password" id="password1" v-model="password1"><br>

      <label for="password2"> password confirmation : </label>
      <input type="password" id="password2" v-model="password2">
      
      <input type="submit" value="SignUp">
    </form>

  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: "",
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      // console.log(username, password1, password2)
      const payload = {
        username, password1, password2
      }

      // 비밀번호 영문 숫자 특문 8개 이상
      // let check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

      // // 정규 표현식을 통과하지 못하면
      // if(!check.test(password1)) {
      //   alert('비밀 번호는 영문, 숫자, 특문 8자 이상입니다.')
      // } else if (username.length < 5) {
      //   alert('아이디는 5자 이상 으로 만들어주세요.')
      // } else {
      //   this.$store.dispatch('signUp', payload)
      //   this.$router.push({name: 'LoginView'})
      // }
      this.$store.dispatch('signUp', payload)
      this.$router.push({name: 'LoginView'})
    }
  },
  computed: {
    usernameLength() {
      return this.username.length
    }
  }
}
</script>

<style>

</style>