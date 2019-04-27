<template>
  <section class="msite">
    <!--首页头部-->
    <header-top :title="address.name">
      <!-- solt左边插槽 -->
      <span class="header_search" slot="left">
        <i class="iconfont icon-sousuo"></i>
      </span>
      <!-- solt右边插槽 -->
       <span class="header_login" slot="right">
        <span class="header_login_text">登录|注册</span>
      </span>
    </header-top>
    <!--首页导航-->
    <nav class="msite_nav">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(categorys,index) in categorysArr" :key="index">
            <a href="javascript:" class="link_to_food" v-for="(category,index1) in categorys" :key="index1">
              <div class="food_container">
                <img :src="baseImageUrl + category.image_url">
              </div>
              <span>{{category.title}}</span>
            </a>
          </div>
        </div>
        <!-- Add Pagination -->
        <div class="swiper-pagination"></div>
      </div>
    </nav>
    <!--首页附近商家-->
    <div class="msite_shop_list">
      <div class="shop_header">
        <i class="iconfont icon-xuanxiang"></i>
        <span class="shop_header_title">附近商家</span>
      </div>
      <!-- container -->
      <shop-list></shop-list>
    </div>
  </section>
</template>
<script>
  import headerTop from "../../components/HeaderTop/HeaderTop.vue"
  import Swiper from "swiper"
  import 'swiper/dist/css/swiper.min.css'
  import shopList from "../../components/ShopList/ShopList.vue"
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        baseImageUrl: 'https://fuss10.elemecdn.com'
      }
    },
    components: {
      headerTop,
      shopList
    },
    mounted(){
      this.$store.dispatch('getCategorys')
    },
    watch:{
      categorys(value){// categorys数组中有数据了, 在异步更新界面之前执行
          this.$nextTick(()=>{// 界面更新就立即创建Swiper对象  swiper原来放在mounted方法里面调用
            let mySwiper = new Swiper ('.swiper-container', {
              direction: 'horizontal', // 垂直切换选项
              loop: false, // 循环模式选项           
              // 如果需要分页器       
              pagination: {
                el: '.swiper-pagination',
              }
            })
          })
      }
    },
    computed: {
      ...mapState(['address','categorys']),
      // 根据categorys生成一个二维数组
      // 小数组中的元素最大是8
      categorysArr() {
        const {categorys} = this  
        // 1.准备空的二维数组
        const arr = []
        // 准备一个小数组(最大长度是8)
        let minArr = []
        // 2.遍历categorys
        categorys.forEach(items=>{
          if(minArr.length  === 8){
            minArr = []
          }
          // 如果minArr是空的，将小数组保存到大数组中
          if(minArr.length === 0){
            arr.push(minArr)
          }
          // 将当前分类保存到小数组中
          minArr.push(items)
        })
        return arr
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .msite  //首页
    width 100%
    .msite_nav
      bottom-border-1px(#e4e4e4)
      margin-top 45px
      height 200px
      background #fff
      .swiper-container
        width 100%
        height 100%
        .swiper-wrapper
          width 100%
          height 100%
          .swiper-slide
            display flex
            justify-content center
            align-items flex-start
            flex-wrap wrap
            .link_to_food
              width 25%
              .food_container
                display block
                width 100%
                text-align center
                padding-bottom 10px
                font-size 0
                img
                  display inline-block
                  width 50px
                  height 50px
              span
                display block
                width 100%
                text-align center
                font-size 13px
                color #666
        .swiper-pagination
          >span.swiper-pagination-bullet-active
            background #02a774
    .msite_shop_list
      top-border-1px(#e4e4e4)
      margin-top 10px
      background #fff
      .shop_header
        padding 10px 10px 0
        .shop_icon
          margin-left 5px
          color #999
        .shop_header_title
          color #999
          font-size 14px
          line-height 20px

</style>