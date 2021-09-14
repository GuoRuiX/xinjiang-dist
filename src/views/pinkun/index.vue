<template>
  <div>

  </div>
</template>

<script>
import Cookies from 'js-cookie'

  export default {
      data() {
          return{
            token:''
          }
      },
      created() {

        this.token = this.$route.query.Authorization
        console.log(this.token)
        Cookies.set('vue_admin_template_token', this.token)
        this.$router.push("/dashboard");
        // console.log(this.$router.path)
      },
      matched(){},
      methods: {},
  }
</script>

<style scoped>

</style>
