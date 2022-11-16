<template>
  <div>
    <h1>로그인 페이지</h1>
    <button @click="toIndex">로그인</button>
    <button @click="to">디버그용 MovieDetailView 로 이동</button>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  methods: {
    toIndex() {
      this.$router.push({name: 'IndexView'})
    },
    to() {
      this.$router.push({name: 'MovieDetailView'})
    }
  }
}
</script>

<style>

</style>