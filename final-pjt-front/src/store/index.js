import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '@/router'

Vue.use(Vuex)

const DJANGO_API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
      // 토큰이 null 값이면 false, 아니면 true 사용자가 로그인했지 확인을 위해 사용
    }
  },
  mutations: {
    SAVE_TOKEN(state, token) {
      state.token = token
    },
    CLEAR_TOKEN(state) {
      state.token = null
    }
  },
  actions: {
    signUp(context, payload) {
      const username = payload.username
      const password1 = payload.password1
      const password2 = payload.password2
      console.log(context)
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/accounts/signup/`,
        data: {
          username, password1,password2
        }
      })
        .then((res) => {
          console.log(res)
          context.commit('SAVE_TOKEN', res.data.key)
        })
        .catch((err) => {
          console.log(err)
          // 회원가입 정보 유효성 통과 못하면 다시 회원가입 페이지로
          router.push({ name: 'SignUpView'})
        })
    },

    logIn(context, payload) {
      const username = payload.username
      const password = payload.password
      axios({
        method: 'post',
        url: `${DJANGO_API_URL}/accounts/login/`,
        data: {
          username, password
        }
      })
        .then((res) => {
          context.commit('SAVE_TOKEN', res.data.key)
          router.push({ name: 'IndexView'})
        })
        .catch((err) => {
          console.log(err)
        })
    },

    logOut(context) {
      console.log('로그아웃 버튼 누름')
      context.commit('CLEAR_TOKEN')
      // 로컬 저장소 삭제
      window.localStorage.clear()
    }


  },
  modules: {
  }
})
