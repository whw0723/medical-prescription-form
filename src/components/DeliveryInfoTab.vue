<template>
  <div class="delivery-info-tab">
    <!-- 联系信息 -->
    <el-divider content-position="left">联系信息</el-divider>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="联系电话" required>
          <el-input v-model="form.contactPhone" placeholder="13800138000" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收件人" required>
          <el-input v-model="form.recipient" placeholder="张三" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="快递类型" required>
          <el-select v-model="form.expressType" placeholder="厂内配送" style="width: 100%">
            <el-option label="厂内配送" value="厂内配送" />
            <el-option label="快递配送" value="快递配送" />
            <el-option label="自取" value="自取" />
            <el-option label="专人配送" value="专人配送" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 配送地址 -->
    <el-divider content-position="left">配送地址</el-divider>
    
    <el-row>
      <el-col :span="24">
        <el-form-item label="详细地址" required>
          <el-input 
            v-model="form.detailedAddress" 
            type="textarea" 
            :rows="3"
            placeholder="请输入详细地址：省、市、县、镇及详细地址"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 特殊要求和备注 -->
    <el-divider content-position="left">特殊要求和备注</el-divider>
    
    <el-row>
      <el-col :span="24">
        <el-form-item label="备注信息">
          <el-input 
            v-model="form.remarks" 
            type="textarea" 
            :rows="4"
            placeholder="请输入特殊要求或备注信息"
          />
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import type { PrescriptionForm } from '../types/prescription'

defineProps<{
  form: PrescriptionForm
}>()
</script>

<style scoped>
.delivery-info-tab {
  padding: 10px 0;
}
</style> 