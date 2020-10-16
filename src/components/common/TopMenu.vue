<template>
  <el-row>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
      <div class="grid-content bg-purple">EZ1024</div>
    </el-col>
    <el-col :xs="8" :sm="12" :md="16" :lg="18" :xl="18">
      <div class="grid-content bg-purple-light">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </el-col>
    <el-col :xs="8" :sm="6" :md="4" :lg="3" :xl="3">
      <div class="grid-content bg-purple-light">User Status</div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'TopMenu',
  components: { }
}
</script>

<style scoped>
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
</style>
