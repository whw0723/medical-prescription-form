<template>
  <div class="basic-info-tab">
    <!-- 患者基本信息 -->
    <el-divider content-position="left">患者基本信息</el-divider>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="处方号" required>
          <el-input v-model="form.prescriptionNo" placeholder="266161086619607" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="患者姓名" required>
          <el-input v-model="form.patientName" placeholder="张三" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="患者年龄" required>
          <el-input v-model="form.patientAge" placeholder="33" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="患者性别" required>
          <el-select v-model="form.patientGender" placeholder="男" style="width: 100%">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="医保号">
          <el-input v-model="form.insuranceNo" placeholder="请输入医保号/健康卡号" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="特殊人群">
          <el-select v-model="form.specialGroup" placeholder="成人" style="width: 100%">
            <el-option label="成人" value="成人" />
            <el-option label="儿童" value="儿童" />
            <el-option label="孕妇" value="孕妇" />
            <el-option label="老人" value="老人" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 处方基本设置 -->
    <el-divider content-position="left">处方基本设置</el-divider>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="医院" required>
          <el-select v-model="form.hospital" placeholder="分院区1" style="width: 100%">
            <el-option label="分院区1" value="分院区1" />
            <el-option label="分院区2" value="分院区2" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="处方类型" required>
          <el-select v-model="form.prescriptionType" placeholder="门诊" style="width: 100%">
            <el-option label="门诊" value="门诊" />
            <el-option label="住院" value="住院" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="科室">
          <el-input v-model="form.department" placeholder="中医科" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="是否代煎" required>
          <el-select v-model="form.isDecoction" placeholder="饮片代煎" style="width: 100%">
            <el-option label="饮片代煎" value="饮片代煎" />
            <el-option label="自煎" value="自煎" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="煎药方式" required>
          <el-select v-model="form.decoctionMethod" placeholder="微压(密闭)(min)" style="width: 100%">
            <el-option label="微压(密闭)(min)" value="微压(密闭)(min)" />
            <el-option label="常压煎煮" value="常压煎煮" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="加工类型" required>
          <el-select v-model="form.processingType" placeholder="汤药" style="width: 100%">
            <el-option label="汤药" value="汤药" />
            <el-option label="丸剂" value="丸剂" />
            <el-option label="散剂" value="散剂" />
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>

    <!-- 用药信息 -->
    <el-divider content-position="left">用药信息</el-divider>
    
    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="服用方式" required>
          <el-select v-model="form.usageMethod" placeholder="内服" style="width: 100%">
            <el-option label="内服" value="内服" />
            <el-option label="外用" value="外用" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="贴数" required>
          <el-input v-model="form.doses" placeholder="7" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="次数" required>
          <el-input v-model="form.frequency" placeholder="2" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="8">
        <el-form-item label="包装量">
          <el-select v-model="form.packageSize" placeholder="200" style="width: 100%">
            <el-option label="200" value="200" />
            <el-option label="300" value="300" />
            <el-option label="400" value="400" />
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="浸泡时间">
          <el-input v-model="form.soakTime" placeholder="1" />
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="服用方法">
          <el-select v-model="form.administrationMethod" placeholder="饭后服用" style="width: 100%">
            <el-option label="饭前服用" value="饭前服用" />
            <el-option label="饭后服用" value="饭后服用" />
            <el-option label="空腹服用" value="空腹服用" />
          </el-select>
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
.basic-info-tab {
  padding: 10px 0;
}
</style> 