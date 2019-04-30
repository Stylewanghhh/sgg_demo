<template>
  <!-- <div class="star star-24">
    <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item on"></span>
    <span class="star-item half"></span>
    <span class="star-item off"></span>
  </div> -->
  <div class="star" :class="'star' + size"> 
    <span class="star-item" v-for="(sc,index) in starClasses" :class="sc" :key="index"></span>
  </div>
</template>
<script>
  const CLASS_ON = "on"
  const CLASS_HALF = "half"
  const CLASS_OFF = "off"
  export default {
    props:{
      score:Number,
      size:Number
    },
    computed: {
      starClasses(){
        const {score} = this
        // console.log(this)
        const scs = []
        // 向scs中添加n个CLASS_ON
        const scoreInt = Math.floor(score)
        for(let i = 0; i< scoreInt; i++){
          scs.push(CLASS_ON)
        }
        // 向scs中添加0/1个CLASS_HALF
        // 乘10是处理小时的关系,当大于5时(当评分>=0.5的时候显示class_half)
        if(score*10 - scoreInt*10 >= 5) {
          scs.push(CLASS_HALF)
        }
        // 向scs中添加n个ClASS_OFF
        while(scs.length < 5){
          scs.push(CLASS_OFF)
        }
        return scs
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixins.styl"
  .star //2x图 3x图
    float left
    font-size 0
    .star-item
      display inline-block
      background-repeat no-repeat
    &.star48
      .star-item
        width 20px
        height 20px
        margin-right 22px
        background-size 20px 20px
        &:last-child
          margin-right: 0
        &.on
          bg-image('./images/stars/star48_on')
        &.half
          bg-image('./images/stars/star48_half')
        &.off
          bg-image('./images/stars/star48_off')
    &.star36
      .star-item
        width 15px
        height 15px
        margin-right 6px
        background-size 15px 15px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star36_on')
        &.half
          bg-image('./images/stars/star36_half')
        &.off
          bg-image('./images/stars/star36_off')
    &.star24
      .star-item
        width 10px
        height 10px
        margin-right 3px
        background-size 10px 10px
        &:last-child
          margin-right 0
        &.on
          bg-image('./images/stars/star24_on')
        &.half
          bg-image('./images/stars/star24_half')
        &.off
          bg-image('./images/stars/star24_off')
</style>