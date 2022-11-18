<template>
  <div>
    <h3> 뱃지 리스트 BadgeList.vue</h3>
    <!-- {{defaultBadges[0].name}} -->
    <!-- {{myBadges}} -->
    <div>
      <div>
        <div>
          <p v-if='myBadges[0].isGet'>{{defaultBadges[0].name}} 있는 배지</p>
          <p v-if='!myBadges[0].isGet'>{{defaultBadges[0].name}} 없는 배지</p>
        </div>
        <div>
          <p v-if='myBadges[3].isGet'>{{defaultBadges[3].name}} 있는 배지</p>
          <p v-if='!myBadges[3].isGet'>{{defaultBadges[3].name}} 없는 배지</p>
          <p v-if='myBadges[4].isGet'>{{defaultBadges[4].name}} 있는 배지</p>
          <p v-if='!myBadges[4].isGet'>{{defaultBadges[4].name}} 없는 배지</p>
          <p v-if='myBadges[5].isGet'>{{defaultBadges[5].name}} 있는 배지</p>
          <p v-if='!myBadges[5].isGet'>{{defaultBadges[5].name}} 없는 배지</p>
        </div>
      </div>  
    
    </div>
  
  </div>
</template>

<script>
export default {
  name: 'BadgeList',
  computed: {
    myBadges() {
      return this.$store.state.myBadges
    },
    defaultBadges() {
      return this.$store.state.defaultBadges
    },
  }
}
</script>

<style>

</style>