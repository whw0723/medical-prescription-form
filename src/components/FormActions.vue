<template>
  <div class="form-actions-section">
    <!-- 底部按钮 -->
    <div class="form-footer">
      <div class="form-actions">
        <el-button 
          type="primary" 
          @click="handleSubmit"
          :tabindex="0"
          @keydown.enter="handleSubmit"
          @keydown.space.prevent="handleSubmit"
        >
          立即提交 (Ctrl+Enter)
        </el-button>
        <el-button 
          @click="handleReset"
          :tabindex="0"
          @keydown.enter="handleReset"
          @keydown.space.prevent="handleReset"
        >
          重置 (Alt+R)
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  submit: []
  reset: []
}>()

const handleSubmit = () => {
  emit('submit')
}

const handleReset = () => {
  emit('reset')
}
</script>

<style scoped>
.form-actions-section {
  margin-top: 20px;
}

.form-footer {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid #EBEEF5;
}

.form-actions {
  text-align: center;
}

.form-actions .el-button {
  margin: 0 10px;
  padding: 12px 30px;
  font-size: 16px;
}
</style> 