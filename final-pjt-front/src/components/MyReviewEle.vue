<template>
  <!-- <div>
    {{ review }}
  </div> -->
  <div class="">
    내용 : {{ review.content }}
    작성일자 : {{ review.created_at }}
    뭔영환지 : {{ review.movie }}
    별점 : {{ review.rating }}
    유저이름 : {{ review.movie }}
    {{ review }}
  </div>
</template>

<script>
export default {
  name: 'MyReviewEle',
  props: {
    review: Object,
  }
}
</script>

<style>

</style>