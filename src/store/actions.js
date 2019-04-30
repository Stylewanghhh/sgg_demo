// 简介更新state的多个对象方法
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOP,
  RECEIVE_USER_INFO,
  RESET_USER_INFO,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_FOOD_COUNT,
  DECREMENT_FOOD_COUNT
} from './mutation-type'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops,
  reqUserInfo,
  reqLogout,
  reqShopInfo,
  reqShopRatings,
  reqShopGoods


} from "../api/index"

export default {
  // 这里要看是否有参数在{commit}后  因为这个参数是定死在state中所以调用
  async getAddress({commit,state}){
    // 发送异步请求
    const geohash = state.latitude + ',' + state.longitude
    let result = await reqAddress(geohash)
    console.log(result)
    if(result.code === 0) {
      const address = result.data
      // 提交一个mutation
      commit(RECEIVE_ADDRESS,{address})
    }
  },
  // 异步获取食品分类列表
  async getCategorys({commit}) {
    // 发送异步ajax请求
    const result = await reqFoodCategorys()
    // 提交一个mutation
    if (result.code === 0) {
      const categorys = result.data
      commit(RECEIVE_CATEGORYS, {categorys})
    }
  },
  // 异步获取地址shop
    async getShop({commit,state}){
      const {latitude,longitude} = state
      // const latitude = state.latitude
      // const longitude = state.longitude
      const result = await reqShops(latitude,longitude)
      console.log(result)
      if(result.code === 0){
        let shop = result.data
        commit(RECEIVE_SHOP,{shop})
      }
    },
    //保存用户信息(同步)
    recordUser({commit},userInfo){
      commit(RECEIVE_USER_INFO,{userInfo})
    },
    //异步获取用户数据
    async getUserInfo({commit}){
      let result = await reqUserInfo()
      if(result.code === 0){
        let userInfo = result.data 
        commit(RECEIVE_USER_INFO,{userInfo})
      }
    },
    //异步退出登录
    async reqLogout({commit}){
      let result = await reqLogout()
      if(result.code === 0){
        commit(RESET_USER_INFO)
      }
    },
    // 异步获取商家信息
    async getShopInfo({commit}){
      let result = await reqShopInfo()
      if (result.code === 0){
        let info = result.data
        commit(RECEIVE_INFO, {info})
      }
    },
    // 异步获取商家评论
    async getShopRating({commit}){
      let result = await reqShopRatings()
      if(result.code === 0){
        let ratings = result.data
        commit(RECEIVE_RATINGS,{ratings})
      }
    },
    // 异步获取食品列表
    async getShopGoods({commit},callback){
      let result = await reqShopGoods()
      if(result.code === 0){
        let goods = result.data
        // debugger
        commit(RECEIVE_GOODS,{goods})
      }
      callback && callback()
    },
    //同步更新food中的count
    updateFoodCount({commit},{isAdd,food}){
      if(isAdd){
        commit(INCREMENT_FOOD_COUNT,{food})
      }else{
        commit(DECREMENT_FOOD_COUNT,{food})
      }
    }
}