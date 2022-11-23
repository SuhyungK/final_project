<template>
  <div>
    <h3> 뱃지 리스트 BadgeList.vue</h3>
    <!-- {{defaultBadges[0].name}} -->
    <!-- {{myBadges}} -->
    <div>
      <div>
        <div class='d-flex flex-row justify-content-evenly'>
          <p class='badge' v-if='myBadges[0].isGet'>{{defaultBadges[0].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[0].isGet'>{{defaultBadges[0].name}} 없는 배지</p>
          <p class='badge' v-if='myBadges[1].isGet'>{{defaultBadges[1].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[1].isGet'>{{defaultBadges[1].name}} 없는 배지</p>
          <p class='badge' v-if='myBadges[2].isGet'>{{defaultBadges[2].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[2].isGet'>{{defaultBadges[2].name}} 없는 배지</p>
        </div>
        <div class='d-flex flex-row justify-content-evenly'>
          <p class='badge' v-if='myBadges[3].isGet'>{{defaultBadges[3].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[3].isGet'>{{defaultBadges[3].name}} 없는 배지</p>
          <p class='badge' v-if='myBadges[4].isGet'>{{defaultBadges[4].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[4].isGet'>{{defaultBadges[4].name}} 없는 배지</p>
          <p class='badge' v-if='myBadges[5].isGet'>{{defaultBadges[5].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[5].isGet'>{{defaultBadges[5].name}} 없는 배지</p>
        </div>
        <div class='d-flex flex-row justify-content-evenly'>
          <p class='badge' v-if='myBadges[6].isGet'>{{defaultBadges[6].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[6].isGet'>{{defaultBadges[6].name}} 없는 배지</p>
          <p class='badge' v-if='myBadges[7].isGet'>{{defaultBadges[7].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[7].isGet'>{{defaultBadges[7].name}} 없는 배지</p>
          <p class='badge' v-if='myBadges[8].isGet'>{{defaultBadges[8].name}} 있는 배지</p>
          <p class='locked' v-if='!myBadges[8].isGet'>{{defaultBadges[8].name}} 없는 배지</p>
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

.badge {
  width : 100px;
  height: 100px;
  background-color: #10a3e2;
  border: 1px solid red;
}

.locked {
  width : 100px;
  height: 100px;
  background-color: #43494b;
  border: 1px solid red;
}

</style>