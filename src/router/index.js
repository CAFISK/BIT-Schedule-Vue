import{createRouter,createWebHashHistory}from 'vue-router'
import Login from "../views/Login.vue"
import Main from "../views/Main.vue"

const routes= [
    {
      // 登录页
      path: '/',
      component:Login
    },
    {
      // 首页
      path: '/Main',
      component: Main
    },
]

export default createRouter({
    history: createWebHashHistory(),
    routes,
})
