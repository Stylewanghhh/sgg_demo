import Vue from 'vue'
import VueRouter from 'vue-router'
import MSite from '../pages/MSite/MSite.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Search from '../pages/Search/Search.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'

import shopGoods from "../pages/Shop/ShopGoods/ShopGoods.vue"
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo.vue"
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings.vue"

Vue.use(VueRouter)

export default new VueRouter({
    routes:[
        {path:'/',redirect:'/msite',meta:{showFooter: true}},
        {path:'/msite',name:'MSite',component:MSite,meta:{showFooter: true}},
        {path:'/order',name:'Order',component:Order,meta:{showFooter: true}},
        {path:'/profile',name:'Profile',component:Profile,meta:{showFooter: true}},
        {path:'/search',name:'Search',component:Search,meta:{showFooter: true}},
        {path:'/login',name:'Login',component:Login},
        {
          path:'/shop',
          name:'Shop',
          component:Shop,
          children:[
            {path:'/shop/goods',name:'shopgoods',component:shopGoods},
            {path:'/shop/info',name:'ShopInfo',component:ShopInfo},
            {path:'/shop/ratings',name:'ShopRatings',component:ShopRatings},
            {path:'',redirect:"/shop/goods"}
          ]
        }
    ]
})