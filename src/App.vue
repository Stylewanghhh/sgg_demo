<template>
    <div id="app">
        <router-view></router-view>
        <footer-guide v-show="$route.meta.showFooter"/>
    </div>
</template>

<script>
import footerGuide from './components/FooterGuide/FootGuide'
    export default {
        data() {
            return {
            }
        },
        components:{
            footerGuide
        },
        mounted(){
          this.$store.dispatch('getAddress')
          this.$store.dispatch('getUserInfo')
        },
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  #app
    width:100%
    height 100%
    background-color #f5f5f5
</style>