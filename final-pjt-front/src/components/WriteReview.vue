<template>
  <div class="p-3">
    <!-- 리뷰 작성 페이지 WriteReview.vue -->
    <div class="text-start">
      <p class="h4 fw-bolder position-relative" style="top: 4px;">
        리뷰 작성 페이지
      </p>
    </div>

    <hr>

    <form @submit.prevent="reviewC">
      <label for="rating"> rating: </label>
      <input type="rating" id="rating" v-model="rating" @focus="expandInput"><br>

      <!-- <label for="content">content : </label> -->
      <!-- <input class="form-control" type="text" id="content" v-model='content' ><br> -->

      <div class="form-floating">
        <textarea class="form-control" placeholder="Leave a comment here" id="commentContent" v-model="content" style="height: 150px;"></textarea>
        <label for="commentContent">영화 리뷰 남기기</label>
      </div>

      <div class="d-flex justify-content-end mt-3hbmbn ">
        <input type="submit" class="btn btn-primary" value="리뷰쓰기">
      </div>
      <br>
      
    </form>

      <!-- <button @click="show = !show">Toggle</button>
      <Transition>
        <p v-if="show">hello</p>
      </Transition> -->
  </div>
</template>

<script>
export default {
  name: 'WriteReview',
  data() {
    return {
      userPk: this.$store.state.userInfo.userPk,
      content: null,
      rating: 0,
    }
  },
  props: {
    movieId: Number,
  },
  methods: {
    reviewC() {
      const movieId = this.movieId
      const content = this.content
      const rating = this.rating
      
      if (content) {
        const payload = {
          movieId,
          content,
          rating,
        }
        this.$store.dispatch('reviewC', payload)
        this.content = ''
        this.rating = 0
      }
    },
    expandInput(e) {
      console.log(e.target.width)
    }
  },

}
</script>

<style>

</style>