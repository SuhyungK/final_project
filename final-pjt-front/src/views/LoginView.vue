<template>
  <div id="container" :style="cssVars" class="d-flex justify-content-center align-items-center"
    > 
    <!-- <iframe :src="src" title="YouTube video player" frameborder="0" autoplay="1" allow="autoplay; encrypted-media">

    </iframe> -->
    <div id="login-container" class="d-inline-block text-white d-flex flex-column">
      <div class="d-flex justify-content-start">
        <p class="h3 mb-4 mt-2" id="login-place" style="font-weight: 900;">로그인</p>
      </div>
      <form @submit.prevent="logIn">
        <div class="form-floating mb-3">
          <!-- <label for="username">username : </label> -->
          <input type="text" id="username" class="form-control" v-model="username" placeholder="username">
          <label for="username">아이디를 입력하세요.</label>
        </div>

        <div class="form-floating mb-4">
          <!-- <label for="password"> password : </label> -->
          <input type="password" id="password" class="form-control" v-model="password" placeholder="password">
          <label for="password">비밀번호를 입력하세요.</label>
        </div>

        <input type="submit" id="button-submit" class="btn-floating mb-1 text-white" value="로그인">
        <hr>
        <div class="d-flex justify-content-end">
          <p class="fs-6 fw-bolder text-white" @click='toSignUp' style="cursor:pointer;">회원가입</p>
        </div>
      </form>

      <!-- <button class="button" @click="toIndex">로그인(Index)</button> -->
      <!-- <button @click='toSignUp'>회원가입</button> -->

    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: '',
      password: '',
      bgIdx: '',
      bgList: [
        '/jYEW5xZkZk2WTrdbMGAPFuBqbDc.jpg',
        '/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg',
        '/urDWNffjwmNi5IQaezw9GwqkUXa.jpg',
        '/mqsPyyeDCBAghXyjbw4TfEYwljw.jpg',
        '/kWYfW2Re0rUDE6IHhy4CRuKWeFr.jpg',
        '/dVr11o9or7AS8AMPfwjSpEU83iU.jpg',
        '/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg',
        '/r17jFHAemzcWPPtoO0UxjIX0xas.jpg',
        
      ],
      bgImg: ''
    }
  },
  computed: {
    cssVars() {
      return 'background-image : url(https://image.tmdb.org/t/p/original' + this.bgList[Math.ceil(Math.random() * 5)] + '); background-size: cover;'
    }
  },
  // computed: {
  //   // src() {
  //   //   const srcUrl = 'https://www.youtube.com/embed/pjMt1MIk2EA?'
  //   //   const srcProperty = 'controls=0&mute=1&disablekb=1&rel=0&autoplay=1&loop=1&start=15&playlist=pjMt1MIk2EA'
  //   //   const srcOrigin = '&origin=http://localhost:8080/'
  //   //   return srcUrl + srcProperty + srcOrigin
  //   // },
  // },
  methods: {
    logIn () {
      const username = this.username
      const password = this.password
      console.log('로그인 확인')
      const payload = {
        username, password
      }
      this.$store.dispatch('logIn', payload)
    },

    toIndex() {
      this.$router.push({name: 'IndexView'})
    },
    toSignUp() {
      this.$router.push({name: 'SignUpView'})
    }
  },
  mounted() {
    this.bgIdx = Math.ceil(Math.random()*10)
    this.bgImg = 'https://image.tmdb.org/t/p/original' + this.bgList[this.bgIdx]
  }
}
</script>

<style scoped>
#container {
  /* border: 0.5rem solid red; */
  width: 100vw;
  height: 100vh;
  /* background-image: url('https://image.tmdb.org/t/p/original/mqsPyyeDCBAghXyjbw4TfEYwljw.jpg'); */
  background-size: cover;
  /* background: rgb(0, 0, 0) */
  overflow: hidden;
}

#container > iframe {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  transform: scale(2);
  pointer-events: none;
}

#login-container {
  position: absolute;
  z-index: 9999;
  /* border: 0.1rem solid black; */
  /* border-radius: 0.625rem; */
  padding: 1.5rem 1.8rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, 0.75);
  /* backdrop-filter: blur(10px); */
}

#login-place {
  color: red;
  /* font-size: 24px; */
  /* font-weight: 900; */
}

#login-container input[type=text], input[type=password] {
  border: none;
  /* border-radius: 0.5rem; */
  background: rgba(0, 0, 0, 0.75);
  /* border-bottom: 0.5rem solid red; */
  color: white;
}

input[type=submit] {
  /* background-color: #00ABB3; */
  background-color: gray;

  /* 로그인 버튼 그라데이션 효과 */
  /* background-image: linear-gradient(to right, #16222A 0%, #3A6073  51%, #16222A  100%); */
  
  border: none;
  /* border-radius: 0.5rem; */
  padding: 15px 140px;
  transition: 0.3s;
  background-size: 200% auto;
}

input[type=submit]:hover {
  background-color: red;

  /* 로그인 버튼 그라데이션 효과(hover) */
  background-position: left right; /* change the direction of the change here */
  color: #fff;
  text-decoration: none;
}
</style>