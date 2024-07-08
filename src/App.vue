<template>
  <div id="app">
    <el-container>
      <top-menu>
        <el-header>Header</el-header>
      </top-menu>
      <el-main>
        <router-view/>
      </el-main>
      <el-footer>
        Footer
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import TopMenu from '@/components/common/TopMenu'

export default {
  name: 'Home',
  components: {
    TopMenu
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
