<template>
  <div>
    <h3> 내가 리뷰한 게시글 MyReviews.vue </h3>
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
  computed: {
    MyReviews() {
      return this.$store.state.myReview;
    }
  }
}
</script>

<style>

</style>