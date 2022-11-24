<template>
  <!-- <div>
    <h3> 내가 리뷰한 게시글 MyReviews.vue </h3>
    <MyReviewEle
    v-for='review in MyReviews'
    :key='review.id'
    :review='review'/>

  </div> -->
  <div class="p-3">

    <!-- 내가 쓴 리뷰 목록이 존재할 때 -->
    <div v-if="MyReviews!=[]">
      <div class="text-start">
        <p class="h4 fw-bolder"><span style="font-weight: 900; color: #00ABB3;">{{ profileOwner }}</span>의 리뷰</p>
      </div>
      
      <hr>
      <MyReviewEle
        v-for='review in MyReviews'
        :key='review.id'
        :review='review'/>

    </div>

    <!-- 내가 쓴 리뷰 목록이 존재하지 않을 때 -->
    <div v-if="!MyReviews==[]">
      <p class="fs-5" style="font-weight: 700;">리뷰가 존재하지 않음</p>
    </div>
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
  methods: {
  },
  mounted() {
    console.log(this.MyReviews)
  }
}
</script>

<style>

</style>