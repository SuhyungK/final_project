<template>
  <div class="p-3 mb-3">
    <!-- <h3> 도전 과제</h3> -->
    <p class="text-start h4 fw-bolder ">도전 과제</p>
    <hr>
    <!-- {{defaultBadges}} -->
    <div>
      <div>
        <div class='d-flex flex-row justify-content-evenly'>
          <img class='badge_size' v-if='!myBadges[0].isGet' :title='`${defaultBadges[0].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[0].isGet' :title='`${defaultBadges[0].after_get}`' src="@/assets/images/badge_movie_a.png">
          <img class='badge_size' v-if='!myBadges[1].isGet' :title='`${defaultBadges[1].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[1].isGet' :title='`${defaultBadges[1].after_get}`' src="@/assets/images/badge_movie_b.png">
          <img class='badge_size' v-if='!myBadges[2].isGet' :title='`${defaultBadges[2].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[2].isGet' :title='`${defaultBadges[2].after_get}`' src="@/assets/images/badge_movie_c.png">
        </div>
        <div class='d-flex flex-row justify-content-evenly'>
          <img class='badge_size' v-if='!myBadges[3].isGet' :title='`${defaultBadges[3].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[3].isGet' :title='`${defaultBadges[3].after_get}`' src="@/assets/images/badge_review_a.png">
          <img class='badge_size' v-if='!myBadges[4].isGet' :title='`${defaultBadges[4].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[4].isGet' :title='`${defaultBadges[4].after_get}`' src="@/assets/images/badge_review_b.png">
          <img class='badge_size' v-if='!myBadges[5].isGet' :title='`${defaultBadges[5].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[5].isGet' :title='`${defaultBadges[5].after_get}`' src="@/assets/images/badge_review_c.png">
        </div>
        <div class='d-flex flex-row justify-content-evenly'>
          <img class='badge_size' v-if='!myBadges[6].isGet' :title='`${defaultBadges[6].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[6].isGet' :title='`${defaultBadges[6].after_get}`' src="@/assets/images/badge_follow_a.png">
          <img class='badge_size' v-if='!myBadges[7].isGet' :title='`${defaultBadges[7].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[7].isGet' :title='`${defaultBadges[7].after_get}`' src="@/assets/images/badge_follow_b.png">
          <img class='badge_size' v-if='!myBadges[8].isGet' :title='`${defaultBadges[8].before_get}`' src="@/assets/images/badge_lock.png">
          <img class='badge_size' v-if='myBadges[8].isGet' :title='`${defaultBadges[8].after_get}`' src="@/assets/images/badge_follow_c.png">
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
  },
}
</script>

<style>

.badge_size {
  width : 150px;
  height : 150px;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}

</style>