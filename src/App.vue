<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // window.addEventListener('hashchange', (e) => {
    //   var currentPath = window.location.hash.slice(1); // 获取输入的路由
    //   console.log(this.$router.path + '111111111111111')
    //   if (this.$router.path !== currentPath) {
    //     // this.$router.push(currentPath); // 动态跳转
    //   }
    // }, false);
  }
}
</script>
