import Vue from 'vue'
import VueRouter from 'vue-router'
import IndexView from '@/views/IndexView'
import LoginView from '@/views/LoginView'
import ProfileView from '@/views/ProfileView'
import MyMovieView from '@/views/MyMovieView'
import SearchMovieView from '@/views/SearchMovieView'
import TicketingView from '@/views/TicketingView'
import MovieDetailView from '@/views/MovieDetailView'
import SignUpView from '@/views/SignUpView'

import TmpView from '@/views/TmpView'
import TmpReviewC from '@/views/TmpReviewC'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'IndexView',
    component: IndexView
  },
  {
    path: '/Login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/profile',
    name: 'ProfileView',
    component: ProfileView
  },
  {
    path: '/mymovie',
    name: 'MyMovieView',
    component: MyMovieView
  },
  {
    path: '/search',
    name: 'SearchMovieView',
    component: SearchMovieView
  },
  {
    path: '/moviedetail',
    name: 'MovieDetailView',
    component: MovieDetailView
  },
  {
    path: '/ticketing',
    name: 'TicketingView',
    component: TicketingView
  },
  {
    path: '/sign-up',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/tmp',
    name: 'TmpView',
    component: TmpView
  },
  {
    path: '/tmp/c',
    name: 'TmpReviewC',
    component: TmpReviewC

  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
