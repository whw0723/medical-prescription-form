<template>
  <div class="prescription-form">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>添加处方</span>
          <div class="shortcut-tips">
            <span class="tip-text">
              Tab(填写信息) Shift+Tab(返回上一项) Alt+I(打开药品录入) ESC(关闭药品录入) Alt+D(删除最后药品) Ctrl+Enter(提交处方) Alt+R(重置表单)
            </span>
          </div>
        </div>
      </template>

      <el-form :model="form" label-width="100px" class="prescription-form-content">
        <!-- 基本信息区域 -->
        <BasicInfoSection :form="form" />
        
        <!-- 药品信息区域 -->
        <MedicineSection :form="form" @add-medicine="addMedicine" @remove-medicine="removeMedicine" />
        
        <!-- 联系信息区域 -->
        <ContactInfoSection :form="form" />
        
        <!-- 表单操作区域 -->
        <FormActions @submit="submitForm" @reset="resetForm" />
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import BasicInfoSection from './BasicInfoSection.vue'
import MedicineSection from './MedicineSection.vue'
import ContactInfoSection from './ContactInfoSection.vue'
import FormActions from './FormActions.vue'
import type { PrescriptionForm, Medicine } from '../types/prescription'

// 表单数据
const form = ref<PrescriptionForm>({
  prescriptionNo: '266161086619607',
  patientName: '张三',
  patientAge: '33',
  hospital: '分院区1',
  patientGender: '男',
  isDecoction: '饮片代煎',
  decoctionMethod: '微压(密闭)(min)',
  prescriptionType: '门诊',
  usageMethod: '内服',
  doses: '7',
  frequency: '2',
  packageSize: '200',
  specialGroup: '成人',
  soakTime: '1',
  processingType: '汤药',
  administrationMethod: '饭后服用',
  department: '中医科',
  area: '1区',
  ward: '101',
  bed: '01',
  insuranceNo: '123456789012345',
  caseNo: 'MZ202401001',
  outpatientNo: 'OP001',
  repeatDecoction: '正常',
  decoctionStyle: '先煎',
  pickupTime: '2024-01-15 14:00',
  pickupNo: 'PK001',
  doctor: '李医生',
  prescriptionAmount: '156.80',
  medicalPolicy: '医保',
  doctorNote: '按时服用',
  paymentMethod: '医保',
  diagnosisResult: '感冒风寒',
  medicines: [
    {
      sequence: 1,
      name: '001',
      chineseName: '麻黄',
      specification: '10g',
      singleDose: '6',
      totalAmount: '42g',
      totalQuantity: '42',
      unit: 'g',
      usage: '先煎',
      unitPrice: 'A01-01'
    },
    {
      sequence: 2,
      name: '002',
      chineseName: '桂枝',
      specification: '10g',
      singleDose: '9',
      totalAmount: '63g',
      totalQuantity: '63',
      unit: 'g',
      usage: '常规',
      unitPrice: 'B02-03'
    }
  ],
  contactPhone: '13800138000',
  recipient: '张三',
  expressType: '厂内配送',
  detailedAddress: '北京市朝阳区某某街道某某小区1号楼2单元301室',
  remarks: '患者对某些药物过敏，请注意用药安全。'
})

// 添加药品
const addMedicine = () => {
  const newMedicine: Medicine = {
    sequence: form.value.medicines.length + 1,
    name: '',
    chineseName: '',
    specification: '',
    singleDose: '',
    totalAmount: '',
    totalQuantity: '',
    unit: '',
    usage: '',
    unitPrice: ''
  }
  form.value.medicines.push(newMedicine)
}

// 删除药品
const removeMedicine = (index: number) => {
  form.value.medicines.splice(index, 1)
  // 重新编号
  form.value.medicines.forEach((medicine, idx) => {
    medicine.sequence = idx + 1
  })
}

// 提交表单
const submitForm = () => {
  console.log('提交表单数据:', form.value)
  ElMessage.success('处方提交成功！')
}

// 重置表单
const resetForm = () => {
  form.value.medicines = []
  ElMessage.info('表单已重置')
}

// 键盘事件处理
const handleKeyDown = (event: KeyboardEvent) => {
  // Ctrl + Enter 键提交表单
  if (event.ctrlKey && event.key === 'Enter') {
    event.preventDefault()
    submitForm()
  }
  // Alt + R 键重置表单
  if (event.altKey && event.key === 'r') {
    event.preventDefault()
    resetForm()
  }
}

// 组件挂载时添加键盘事件监听
onMounted(() => {
  document.addEventListener('keydown', handleKeyDown)
})

// 组件卸载时移除键盘事件监听
onUnmounted(() => {
  document.removeEventListener('keydown', handleKeyDown)
})
</script>

<style scoped>
.prescription-form {
  max-width: 1400px;
  margin: 0 auto;
}

.form-card {
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: bold;
  color: #303133;
}

.shortcut-tips {
  margin-left: 20px;
}

.tip-text {
  color: #E6A23C;
  font-size: 12px;
  font-weight: normal;
  background-color: #FDF6EC;
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #F5DAB1;
  white-space: nowrap;
}

.prescription-form-content {
  padding: 20px 0;
}
</style> 