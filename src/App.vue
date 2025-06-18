<template>
  <div id="app">
    <PrescriptionForm />
  </div>
</template>

<script setup lang="ts">
import PrescriptionForm from './components/PrescriptionForm.vue'
</script>

<style>
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background-color: #f5f5f5;
  min-height: 100vh;
  padding: 20px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Element Plus 全局样式覆盖 */
.el-form-item__label {
  font-weight: 500 !important;
  color: #606266 !important;
}

.el-input__wrapper {
  border-radius: 4px !important;
}

.el-select .el-input__wrapper {
  border-radius: 4px !important;
}

.el-button {
  border-radius: 4px !important;
}

.el-card {
  border-radius: 8px !important;
}

.el-table {
  border-radius: 4px !important;
}

.el-table th.el-table__cell {
  background-color: #F5F7FA !important;
  color: #909399 !important;
  font-weight: 500 !important;
}

.el-divider__text {
  font-weight: 500 !important;
  color: #409EFF !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  #app {
    padding: 10px;
  }
  
  .el-col {
    margin-bottom: 10px;
  }
}
</style> 