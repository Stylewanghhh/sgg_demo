<template>
  <section class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷外卖</h2>
        <div class="login_header_title">
          <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">短信登录</a>
          <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay= false">密码登录</a>
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{on:loginWay}">   <!-- 手机号码登录-->
            <section class="login_message">
              <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
              <button
                v-if="!computeTime"
                class="get_verification"
                :class="{right_phone:rightPhone}"
                @click.prevent="getCode"
                >获取验证码
                <!-- {{computeTime ? `已发送(${computeTime}s)` : '获取验证码'}} -->
                </button>
                <button
                v-else
                class="get_verification"
                disabled="disabled"
                >
                已发送({{computeTime}}s)
                </button>
            </section>
            <section class="login_verification">
              <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{on:!loginWay}">  <!-- 用户名密码登录-->
            <section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
              </section>
              <section class="login_verification">
                <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
                <input type="password" maxlength="8" placeholder="密码" v-else v-model="pwd">
                <div class="switch_button" @click="showPwd=!showPwd" :class="showPwd ?'on':'off' ">
                  <div class="switch_circle" :class="{right:showPwd}" ></div> 
                  <span class="switch_text">{{showPwd? 'abc' : '...'}}</span>
                </div>
              </section>
              <section class="login_message">
                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                <img 
                ref="captcha" 
                class="get_verification" 
                src="http://localhost:3000/captcha" 
                alt="captcha" 
                @click="getcaptcha()"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <a href="javascript:" class="go_back" @click="$router.back()">
        <i class="iconfont icon-jiantou2"></i>
      </a>
    </div>
    <alert-tip :alertText="alertText" v-show="showAlert" @closeTip="closeTip"></alert-tip>
  </section>
</template>

<script>
  import alertTip from "../../components/AlertTip/AlertTip.vue"
  import {reqSendCode,reqSmsLogin,reqPwdLogin} from "../../api/index.js"
  export default {
    data() {
      return {
        loginWay: true,  //true为短信登录
        phone:'',  //电话号码
        code:'', //短信验证码
        computeTime:0,  //定时器
        name:'',  //用户名
        pwd:'',//密码
        captcha:'', //验证码
        showPwd:false,  //密码默认隐藏
        alertText:'', //提示文本
        showAlert:false  //默认不显示文本
      }
    },
    computed:{
      rightPhone(){
        return /^1\d{10}$/.test(this.phone)
        // return /^1\d{10}$/.test(this.phone)
      }
    },
    methods:{
      //异步获取验证码
      async getCode(){//如果当前没有倒计时的时候，否则再次点击时倒计时还会再次执行
              // 如果当前没有计时
        if(!this.computeTime && this.rightPhone) {
          // 启动倒计时
          this.computeTime = 30
          this.intervalId = setInterval(() => {
            this.computeTime--
            if(this.computeTime<=0) {
              // 停止计时
              clearInterval(this.intervalId)
            }
          }, 1000)

          // 发送ajax请求(向指定手机号发送验证码短信)
          const result = await reqSendCode(this.phone)
          console.log(result)
          // if(result.code===1) {
          //   // 显示提示
          //   this.showAlert(result.msg)
          //   // 停止计时
          //   if(this.computeTime) {
          //     this.computeTime = 0
          //     clearInterval(this.intervalId)
          //     this.intervalId = undefined
          //   }
          // }
        }
      },
      getcaptcha(){
        // 点击图片获取验证码  每次指定的src都不一样
        this.$refs.captcha.src = 'http://localhost:3000/captcha?time=' + new Date()
        // 或者用（因为下面要用到用户名或者密码错的手自动刷新验证码，所以不能用event.target）
        // getcaptcha(event)  event.target要传参数
        // event.target.src = 'http://localhost:3000/captcha?time=' + Date.now()
      },
      //传递给alertip组件的方法关闭警告框
      closeTip(){
        this.showAlert = false
        this.alertText = ''
      },
      getAlertText(alertText){ //因为代码重复，抽取公共
        this.showAlert = true
        this.alertText =alertText
      },
      //异步登录提交表单
      async login() { //短信登录
      let result
        if(this.loginWay){
           const {rightPhone,phone,code} = this
           if(!this.rightPhone){
             this.getAlertText('手机号码不正确')
             return
             //手机号码不正确
           } else if(!/^\d{6}$/.test(code)){
            //  验证码必须是六位
            this.getAlertText('验证码必须是六位')
            return
           }
          //  登录成功
          result = await reqSmsLogin(this.phone,this.code)
          console.log(result)
        } else {  //用户登录
          const {name,pwd,captcha} = this
          if(!this.name){
            this.getAlertText('请输入用户名')
            return
            //请输入用户名
          } else if(!this.pwd) {
            //请输入密码
            this.getAlertText('请输入密码')
            return
          } else if(!this.captcha) {
            // 验证码必须指定
            this.getAlertText('验证码必须指定')
            return
        }
            result = await reqPwdLogin(this.name,this.pwd,this.captcha)
            console.log(result)
      }
        //成功后停止定时器
        if(this.computeTime) {
          this.computeTime = 0
          clearInterval(this.intervalId)
          this.intervalId = undefined
        }
        //用户名和密码注册具有相同的公共组件，进行抽离
        if(result.code === 0){
        const userInfo = result.data
        // 1.将user保存到vuex的state
        this.$store.dispatch('recordUser',userInfo)
        // 2.去个人中心界面
        this.$router.replace('/profile')
      } else {
        const msg = result.msg
        this.getAlertText(msg)
        //当账号密码或者验证码错误时候自动刷新验证码
        this.getcaptcha()
      }
    },
  },
      components:{
      alertTip
    },
}
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  .loginContainer
    width 100%
    height 100%
    background #fff
    .loginInner
      padding-top 60px
      width 80%
      margin 0 auto
      .login_header
        .login_logo
          font-size 40px
          font-weight bold
          color #02a774
          text-align center
        .login_header_title
          padding-top 40px
          text-align center
          >a
            color #333
            font-size 14px
            padding-bottom 4px
            &:first-child
              margin-right 40px
            &.on
              color #02a774
              font-weight 700
              border-bottom 2px solid #02a774
      .login_content
        >form
          >div
            display none
            &.on
              display block
            input
              width 100%
              height 100%
              padding-left 10px
              box-sizing border-box
              border 1px solid #ddd
              border-radius 4px
              outline 0
              font 400 14px Arial
              &:focus
                border 1px solid #02a774
            .login_message
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .get_verification
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                border 0
                color #ccc
                font-size 14px
                background transparent
                &.right_phone
                  color black
            .login_verification
              position relative
              margin-top 16px
              height 48px
              font-size 14px
              background #fff
              .switch_button
                font-size 12px
                border 1px solid #ddd
                border-radius 8px
                transition background-color .3s,border-color .3s
                padding 0 6px
                width 30px
                height 16px
                line-height 16px
                color #fff
                position absolute
                top 50%
                right 10px
                transform translateY(-50%)
                &.off
                  background #fff
                  .switch_text
                    float right
                    color #ddd
                &.on
                  background #02a774
                >.switch_circle
                  position absolute
                  top -1px
                  left -1px
                  width 16px
                  height 16px
                  border 1px solid #ddd
                  border-radius 50%
                  background #fff
                  box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
                  transition transform .3s
                  &.right
                    transform translateX(30px)
            .login_hint
              margin-top 12px
              color #999
              font-size 14px
              line-height 20px
              >a
                color #02a774
          .login_submit
            display block
            width 100%
            height 42px
            margin-top 30px
            border-radius 4px
            background #4cd96f
            color #fff
            text-align center
            font-size 16px
            line-height 42px
            border 0
        .about_us
          display block
          font-size 12px
          margin-top 20px
          text-align center
          color #999
      .go_back
        position absolute
        top 5px
        left 5px
        width 30px
        height 30px
        >.iconfont
          font-size 20px
          color #999
</style>