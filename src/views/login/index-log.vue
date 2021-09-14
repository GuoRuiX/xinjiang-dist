<template>
  <div>

  </div>
</template>

<script>
import Cookies from 'js-cookie'
import axios from 'axios'
  export default {
      data() {
          return{
            token:''
          }
      },
      created() {

        let url = window.location.href
        let Authorization = url.split("Authorization=")[1]
        this.token = Authorization.split("#/")[0]
        if(this.token != undefined){
          Cookies.set('vue_admin_template_token', this.token)
          this.$router.push("/dashboard");
        }else{
          this.$message.error('没有获取到token');
        }


        // this.token = this.$route.query.Authorization
        // Cookies.set('vue_admin_template_token', this.token)
        // this.$router.push("/dashboard");



      },
      matched(){},
      methods: {},
  }
</script>

<style scoped>

</style>
