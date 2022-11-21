<template>
  <div>
    {{movie.title}}
  </div>
</template>

<script>
export default {
  name: 'TicketedMovie',
  props: {
    movie: Object,
  }
}
</script>

<style>

</style>