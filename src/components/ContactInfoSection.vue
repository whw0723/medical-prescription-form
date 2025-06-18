<template>
  <div class="contact-info-section">
    <!-- 底部信息 -->
    <el-divider />
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="联系电话">
          <el-input v-model="form.contactPhone" placeholder="请输入电话号码" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="收件人">
          <el-input v-model="form.recipient" placeholder="请输入收件人" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="快递类型">
          <el-select v-model="form.expressType" placeholder="厂内配送" style="width: 100%">
            <el-option label="厂内配送" value="厂内配送" />
            <el-option label="快递配送" value="快递配送" />
            <el-option label="自取" value="自取" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="详细地址">
          <el-input 
            v-model="form.detailedAddress" 
            type="textarea" 
            :rows="2"
            placeholder="请输入详细地址：省、市、县、镇及详细地址"
          />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <el-form-item label="备注信息">
          <el-input 
            v-model="form.remarks" 
            type="textarea" 
            :rows="3"
            placeholder="请输入内容"
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
.contact-info-section {
  margin-bottom: 20px;
}
</style> 