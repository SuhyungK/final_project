<template>
  <div>
    <h1>로그인 페이지</h1>
    <button @click="toIndex">로그인</button>
    <button @click='toSignUp'>회원가입</button>

  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
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