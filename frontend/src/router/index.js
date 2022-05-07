import { createRouter, createWebHistory } from 'vue-router'
//import HomeView from '../views/HomeView.vue'
import HomeWallView from '../views/HomeWallView.vue'
import RegisterLoginView from '../views/RegisterLoginView.vue'
import MyProfileView from '../views/MyProfilView.vue'
import ProfilUserView from '../views/ProfilUserView.vue'
import PasswordForgetView from '../views/PasswordForgetView.vue'
import UpdatePassword from '../views/UpdatePasswordView.vue'



const routes = [
  /*{
    path: '/',
    name: 'home',
    component: HomeView
  },*/
  {
    path: '/HomeWall',
    name: 'homewall',
    component: HomeWallView
  },
  {
    path: '/PasswordForget',
    name: 'passwordforget',
    component: PasswordForgetView
  },
  {
    path: '/UpdatePassword/:id',
    name: 'UpdatePassword',
    component: UpdatePassword
  },
  {
    path: '/',
    name: 'RegisterLoginView',
    component: RegisterLoginView
  },
  {
    path: '/MyProfil',
    name: 'myprofil',
    component: MyProfileView
  },
  {
    path: '/userProfil/:id',
    name: 'userprofil',
    component: ProfilUserView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
