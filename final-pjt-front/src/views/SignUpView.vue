<template>
  <div id="container" :style="cssVars" class="d-flex justify-content-center align-items-center">
    <!-- <h1>SignUp Page SignUpView.vue</h1> -->

    <div id="login-container" class="d-inline-block text-white d-flex flex-column">
      <div class="d-flex justify-content-start">
        <p class="h3 mb-4 mt-2" id="signup-place" style="font-weight: 900;">SIGNUP</p>
      </div>
      
      <form @submit.prevent="signUp">
        <p v-if="usernameLength < 5" style="color: red;">아이디는 5글자 이상으로 해주세요</p>
        <div class="form-floating mb-3">
          <!-- <label for="username">username : </label> -->
          <input type="text" id="username" class="form-control" v-model='username' placeholder="username">
          <label for="username">아이디</label>
        </div>

        <!-- <label for="password1"> password : </label> -->
        <div class="form-floating mb-4">
          <!-- <label for="password"> password : </label> -->
          <input type="password" id="password" class="form-control" v-model="password1" placeholder="password">
          <label for="password">비밀번호</label>
        </div>

        <div class="form-floating mb-4">
          <!-- <label for="password2"> password confirmation : </label> -->
          <input type="password" id="password2" class="form-control" v-model="password2" placeholder="password">
          <label for="password2">비밀번호 확인</label>
        </div>
        
        <hr>
        <div class="d-flex justify-content-end">
          <p class="fs-6 fw-bolder text-white" @click='toLogin' style="cursor:pointer;">로그인 하기</p>
        </div>
        <input type="submit" id="button-submit" class="btn-floating mb-1 text-white" value="회원가입">
        <!-- <div class="d-flex justify-content-end">
          <p class="fs-6 fw-bolder text-white" @click='toSignUp' style="cursor:pointer;">회원가입</p>
        </div> -->
      </form>
    </div>

  </div>
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: "",
      password1: null,
      password2: null,
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
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2

      // console.log(username, password1, password2)
      const payload = {
        username, password1, password2
      }

      // 비밀번호 영문 숫자 특문 8개 이상
      // let check = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

      // // 정규 표현식을 통과하지 못하면
      // if(!check.test(password1)) {
      //   alert('비밀 번호는 영문, 숫자, 특문 8자 이상입니다.')
      // } else if (username.length < 5) {
      //   alert('아이디는 5자 이상 으로 만들어주세요.')
      // } else {
      //   this.$store.dispatch('signUp', payload)
      //   this.$router.push({name: 'LoginView'})
      // }

      this.$store.dispatch('signUp', payload)
      console.log('???')
      this.$router.push({name: 'IndexView'})
      // this.$router.push({name: 'LoginView'})
    },
    toLogin() {
      this.$router.push({name: 'LoginView'})
    }
  },
  computed: {
    usernameLength() {
      return this.username.length
    },
    cssVars() {
      return 'background-image : url(https://image.tmdb.org/t/p/original' + this.bgList[Math.ceil(Math.random() * 5)] + '); background-size: cover;'
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