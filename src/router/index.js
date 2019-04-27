import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {path:'/',redirect:'/msite',meta:{showFooter: true}},
        {path:'/msite',name:'MSite',component:MSite,meta:{showFooter: true}},
        {path:'/order',name:'Order',component:Order,meta:{showFooter: true}},
        {path:'/profile',name:'Profile',component:Profile,meta:{showFooter: true}},
        {path:'/search',name:'Search',component:Search,meta:{showFooter: true}},
        {path:'/login',name:'Login',component:Login},
    ]
})