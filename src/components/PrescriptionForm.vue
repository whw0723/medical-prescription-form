<template>
  <div class="prescription-form">
    <el-card class="form-card">
      <template #header>
        <div class="card-header">
          <span>添加处方</span>
          <div class="shortcut-tips">
            <span class="tip-text">
              Tab(下一项) Shift+Tab(上一项) Ctrl+1~4(切换标签页) Alt+I(添加药品) Alt+D(删除最后药品) Ctrl+Enter(提交) Alt+R(重置)
            </span>
          </div>
        </div>
      </template>

      <el-form :model="form" label-width="100px" class="prescription-form-content">
        <el-tabs v-model="activeTab" type="border-card" @tab-change="handleTabChange">
          
          <!-- 基本信息标签页 -->
          <el-tab-pane label="基本信息" name="basic">
            <BasicInfoTab :form="form" />
          </el-tab-pane>
          
          <!-- 医疗信息标签页 -->
          <el-tab-pane label="医疗信息" name="medical">
            <MedicalInfoTab :form="form" />
          </el-tab-pane>
          
          <!-- 药品信息标签页 -->
          <el-tab-pane label="药品信息" name="medicine">
            <MedicineSection :form="form" @add-medicine="addMedicine" @remove-medicine="removeMedicine" />
          </el-tab-pane>
          
          <!-- 配送信息标签页 -->
          <el-tab-pane label="配送信息" name="delivery">
            <DeliveryInfoTab :form="form" />
          </el-tab-pane>
          
        </el-tabs>
        
        <!-- 表单操作区域 -->
        <FormActions @submit="submitForm" @reset="resetForm" />
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import BasicInfoTab from './BasicInfoTab.vue'
import MedicineSection from './MedicineSection.vue'
import MedicalInfoTab from './MedicalInfoTab.vue'
import DeliveryInfoTab from './DeliveryInfoTab.vue'
import FormActions from './FormActions.vue'
import type { PrescriptionForm, Medicine } from '../types/prescription'

// 当前激活的标签页
const activeTab = ref('basic')

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
      mnemonicCode: 'MH',
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
      mnemonicCode: 'GZ',
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

// 标签页切换处理
const handleTabChange = (tabName: string) => {
  activeTab.value = tabName
}

// 添加药品
const addMedicine = () => {
  const newMedicine: Medicine = {
    sequence: form.value.medicines.length + 1,
    name: '',
    chineseName: '',
    mnemonicCode: '',
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
  // Ctrl + 1~4 切换标签页
  if (event.ctrlKey && ['1', '2', '3', '4'].includes(event.key)) {
    event.preventDefault()
    const tabMap = {
      '1': 'basic',     // 基本信息
      '2': 'medical',   // 医疗信息
      '3': 'medicine',  // 药品信息
      '4': 'delivery'   // 配送信息
    }
    activeTab.value = tabMap[event.key as keyof typeof tabMap]
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

:deep(.el-tabs__content) {
  padding: 20px 0;
}

:deep(.el-tab-pane) {
  min-height: 400px;
}
</style> 