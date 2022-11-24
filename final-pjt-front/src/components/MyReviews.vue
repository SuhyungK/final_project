<template>
  <!-- <div>
    <h3> 내가 리뷰한 게시글 MyReviews.vue </h3>
    <MyReviewEle
    v-for='review in MyReviews'
    :key='review.id'
    :review='review'/>

  </div> -->
  <div class="p-3">
    <!-- <h3>리뷰 목록 ReviewList.vue</h3> -->
    <div class="text-start">
      <p class="h4 fw-bolder"><span style="font-weight: 900; color: #00ABB3;">{{ profileOwner }}</span>의 리뷰</p>
    </div>
    
    <hr>
    <MyReviewEle
    v-for='review in MyReviews'
    :key='review.id'
    :review='review'/>

  </div>
</template>

<script>
import MyReviewEle from '@/components/MyReviewEle'

export default {
  name: 'MyReviews',
  components: {
    MyReviewEle,
  },
  props: {
    profileOwner: String,
  },
  computed: {
    MyReviews() {
      return this.$store.state.myReview;
    }
  },
  created() {
    if (!this.myReview) {
      this.$emit('noMyReview')
    }
  }
}
</script>

<style>

</style>