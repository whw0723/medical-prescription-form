<template>
  <div class="medical-info-tab">
    <!-- 医疗基本信息 -->
    <el-divider content-position="left">医疗基本信息</el-divider>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="病案号">
          <el-input v-model="form.caseNo" placeholder="MZ202401001" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="门诊序号">
          <el-input v-model="form.outpatientNo" placeholder="OP001" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="医生">
          <el-input v-model="form.doctor" placeholder="李医生" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="诊断结果">
          <el-input v-model="form.diagnosisResult" placeholder="感冒风寒" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="医保政策">
          <el-select v-model="form.medicalPolicy" placeholder="医保" style="width: 100%">
            <el-option label="医保" value="医保" />
            <el-option label="自费" value="自费" />
            <el-option label="农合" value="农合" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="付费方式">
          <el-select v-model="form.paymentMethod" placeholder="医保" style="width: 100%">
            <el-option label="医保" value="医保" />
            <el-option label="现金" value="现金" />
            <el-option label="银行卡" value="银行卡" />
            <el-option label="微信" value="微信" />
            <el-option label="支付宝" value="支付宝" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 病房信息 -->
    <el-divider content-position="left">病房信息</el-divider>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="前区">
          <el-input v-model="form.area" placeholder="1区" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="病房">
          <el-input v-model="form.ward" placeholder="101" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="病床">
          <el-input v-model="form.bed" placeholder="01" />
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 煎药信息 -->
    <el-divider content-position="left">煎药信息</el-divider>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="重复煎药">
          <el-radio-group v-model="form.repeatDecoction">
            <el-radio label="正常">正常</el-radio>
            <el-radio label="获赠">获赠</el-radio>
            <el-radio label="协定">协定</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="煎药方式">
          <el-select v-model="form.decoctionStyle" placeholder="先煎" style="width: 100%">
            <el-option label="先煎" value="先煎" />
            <el-option label="后下" value="后下" />
            <el-option label="常规" value="常规" />
            <el-option label="包煎" value="包煎" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="处方金额">
          <el-input v-model="form.prescriptionAmount" placeholder="156.80">
            <template #append>元</template>
          </el-input>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 取药信息 -->
    <el-divider content-position="left">取药信息</el-divider>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="取药时间">
          <el-date-picker
            v-model="form.pickupTime"
            type="datetime"
            placeholder="选择取药时间"
            format="YYYY-MM-DD HH:mm"
            value-format="YYYY-MM-DD HH:mm"
            style="width: 100%"
          />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="取药号">
          <el-input v-model="form.pickupNo" placeholder="PK001" />
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>

    <!-- 医生备注 -->
    <el-row>
      <el-col :span="24">
        <el-form-item label="医生备注">
          <el-input 
            v-model="form.doctorNote" 
            type="textarea" 
            :rows="3"
            placeholder="请输入医生备注信息"
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
.medical-info-tab {
  padding: 10px 0;
}
</style> 