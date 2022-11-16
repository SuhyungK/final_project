<template>
  <div>
    <h1>인덱스 IndexView.view </h1>
    <NavbarPage/>
    <ShortPage/>
  </div>
</template>

<script>
import NavbarPage from '@/components/NavbarPage.vue'
import ShortPage from '@/components/ShortPage.vue'

export default {
  name: 'IndexView',
  components: {
    NavbarPage,
    ShortPage,
  }
}

</script>

<style>

</style>