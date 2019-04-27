// 简介更新state的多个对象方法
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOP
} from './mutation-type'

import {
  reqAddress,
  reqFoodCategorys,
  reqShops
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
    async getShop({commit},state){
      const {latitude,longitude} = state
      const result = await reqShops(latitude,longitude)
      console.log(result)
      if(result.code === 0){
        let shop = resule.data
        commit(RECEIVE_SHOP,{shop})
      }
    }
}