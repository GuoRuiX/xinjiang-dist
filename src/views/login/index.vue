<template>
  <div class="login-container">
    <el-container>
      <el-header>
        <div class="container-1200">
            <div class="container-row">
                <div class="login-logo">
                    <span class="logo">新疆农村信用信息服务平台</span>
                </div>
            </div>
        </div>
      </el-header>
      <el-main>
        <div class="login-main">
          <div class="container-row container-1200">
            <div class="login-frame">
              <el-card class="box-card">
                <div class="login-body">
                  <div class="logo-img">
                    <img src="@/assets/img/logo.png" alt="">
                    <p>新疆农村信用信息服务平台</p>
                  </div>
                  <el-form :model="login" ref="loginForm" class="demo-form-inline" :label-position="labelPosition" label-width="60px" :rules="loginRules">
                    <el-form-item label="帐号:" prop="loginName">
                      <el-input v-model="login.loginName" placeholder="帐号"></el-input>
                    </el-form-item>
                    <el-form-item label="密码:" prop="password">
                      <el-input v-model="login.password" placeholder="密码" show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click.native.prevent="handleLogin" :loading="loading" style="width:100%;">登陆</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </el-card>
            </div>
          </div>
        </div>
      </el-main>
      <el-footer>
        <div class="el-footer-container">
          <p>Copyright &copy; 2020 版权所有：新疆农村信用信息服务平台 疆ICP备XXXXXXXXX号-X 公安机关备案号 XXXXXXXXXXXX-00001</p>
        </div>
      </el-footer>
    </el-container>
    <!-- <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="Username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="Password"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>

      <div class="tips">
        <span style="margin-right:20px;">username: admin</span>
        <span> password: any</span>
      </div>

    </el-form> -->
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入帐号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      // loginForm: {
      //   username: 'admin',
      //   password: '111111'
      // },
      loginRules: {
        loginName: [{  trigger: 'blur', validator: validateUsername }],
        password: [{  trigger: 'blur', validator: validatePassword }]
      },
      loading: false,
      // passwordType: 'password',
      // redirect: undefined,
      login:{
        loginName:'',
        password:''
      },
      labelPosition:'left'
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.login).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.login-container {
        height: 100%;
        position: relative;
        background-color: #fff;

        .container-1200{
          width: 1200px;
          margin: 0 auto;
        }

        .el-container {
            .el-footer {
                text-align: center;
            }
        }

        .el-container {
            .el-main {
                position: absolute;
                top: 60px;
                right: 0;
                bottom: 60px;
                left: 0;
            }
        }

        .el-container {
            .el-footer {
                position: absolute;
                bottom: 0;
                width: 100%;
            }
        }

        .el-main {
            background: url("~@/assets/img/setting.jpg") no-repeat;
            background-size: cover;
        }
        .login-frame{
          // width: 500px;
          // height: 400px;
          position: absolute;
          left: 50%;
          top: 50%;
          margin-top: -200px;
          margin-left: 200px;
          .login-body{
            width: 500px;
            height: 400px;
            .logo-img{
              margin: 0 auto;
              height: 195px;
              text-align: center;
              font-size: 20px;
              color: #0079fe;
              font-weight: bold;
            }
          }

        }
        // .login-form {
        //     .verificationCode {
        //         width: 100px;
        //         height: 30px;
        //         vertical-align: middle;
        //         cursor: pointer;
        //     }
        // }

        // .el-footer-container p {
        //     margin: 0;
        //     line-height: 60px;
        //     font-size: 14px;
        //     color: #999899;
        // }

        // .login-main {
        //     position: relative;
        //     height: 100%;
        //     // .login-position {
        //     //     position: absolute;
        //     //     width: 100%;
        //     //     top: 50%;
        //     //     margin-top: -202px;
        //     // }

        //     // .service {
        //     //     height: 357px;
        //     //     padding: 70px 0;
        //     //     .slogan {

        //     //         .slogan-en {
        //     //             color: #fff;
        //     //             font-size: 26px;
        //     //             margin-bottom: 10px;
        //     //         }

        //     //         .slogan-zn {
        //     //             color: #fff;
        //     //             font-size: 38px;
        //     //             font-weight: bold;
        //     //             letter-spacing: 4px;
        //     //         }

        //     //         margin-bottom: 30px;
        //     //     }

        //     //     .proverb {
        //     //         .proverb-text {
        //     //             color: #fff;
        //     //             font-size: 16px;
        //     //             letter-spacing: 8px;
        //     //         }
        //     //     }
        //     // }
        // }

        .login-logo {
            .logo {
                padding-left: 45px;
                display: inline-block;
                line-height: 60px;
                font-size: 18px;
                letter-spacing: 3px;
                font-weight: bold;
                color: #333;
            }
        }
    }

</style>
