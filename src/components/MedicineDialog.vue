<template>
  <el-dialog
    v-model="dialogVisible"
    title="新增药品"
    width="500px"
    :before-close="handleClose"
    @opened="handleDialogOpened"
    @closed="handleDialogClosed"
  >
    <el-form :model="medicineForm" label-width="100px" class="medicine-form">
      <!-- 药品名称 -->
      <el-form-item label="药品名称">
        <el-input 
          v-model="medicineForm.chineseName" 
          placeholder="药品名称"
          ref="firstInputRef"
        />
      </el-form-item>

      <!-- 药品规格 -->
      <el-form-item label="药品规格">
        <el-input v-model="medicineForm.specification" placeholder="药品规格" />
      </el-form-item>

      <!-- 服用次数 -->
      <el-form-item label="服用次数">
        <el-input v-model="medicineForm.frequency" placeholder="2" />
      </el-form-item>

      <!-- 单剂量 -->
      <el-form-item label="单剂量">
        <el-input v-model="medicineForm.singleDose" placeholder="单剂量" />
      </el-form-item>

      <!-- 贴/付/剂数 -->
      <el-form-item label="贴/付/剂数">
        <el-input v-model="medicineForm.doses" placeholder="7" />
      </el-form-item>

      <!-- 总量 -->
      <el-form-item label="总量">
        <el-input v-model="medicineForm.totalQuantity" placeholder="总量" />
      </el-form-item>

      <!-- 药品脚注 -->
      <el-form-item label="药品脚注">
        <el-input v-model="medicineForm.note" placeholder="药品脚注" />
      </el-form-item>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">确定并继续</el-button>
        <el-button @click="handleClose">关闭</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import type { Medicine } from '../types/prescription'

interface MedicineFormData {
  chineseName: string
  specification: string
  frequency: string
  singleDose: string
  doses: string
  totalQuantity: string
  note: string
}

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'confirm': [medicines: Medicine[]]
}>()

const dialogVisible = ref(false)
const firstInputRef = ref()

const medicineForm = ref<MedicineFormData>({
  chineseName: '',
  specification: '',
  frequency: '2',
  singleDose: '',
  doses: '7',
  totalQuantity: '',
  note: ''
})

// 监听props变化
watch(() => props.visible, (newVal) => {
  dialogVisible.value = newVal
})

// 监听对话框显示状态变化
watch(dialogVisible, (newVal) => {
  emit('update:visible', newVal)
})

// 键盘事件处理
const handleKeyDown = (event: KeyboardEvent) => {
  // 回车键确认
  if (event.key === 'Enter') {
    event.preventDefault()
    handleConfirm()
  }
  // ESC键取消
  if (event.key === 'Escape') {
    event.preventDefault()
    handleClose()
  }
}

// 对话框打开时的处理
const handleDialogOpened = () => {
  // 添加键盘事件监听
  document.addEventListener('keydown', handleKeyDown)
  // 聚焦到第一个输入框
  nextTick(() => {
    if (firstInputRef.value) {
      firstInputRef.value.focus()
    }
  })
}

// 对话框关闭时的处理
const handleDialogClosed = () => {
  // 移除键盘事件监听
  document.removeEventListener('keydown', handleKeyDown)
}

const handleClose = () => {
  dialogVisible.value = false
}

const handleConfirm = () => {
  // 构建药品数据
  const medicines: Medicine[] = []
  
  // 如果有药品名称，则添加药品
  if (medicineForm.value.chineseName.trim()) {
    medicines.push({
      sequence: 1,
      name: '001', // 默认值
      chineseName: medicineForm.value.chineseName,
      specification: medicineForm.value.specification,
      singleDose: medicineForm.value.singleDose,
      totalAmount: medicineForm.value.doses,
      totalQuantity: medicineForm.value.totalQuantity,
      unit: 'g', // 默认值
      usage: medicineForm.value.note,
      unitPrice: 'A01-01' // 默认货位
    })
    
    emit('confirm', medicines)
    
    // 重置表单但不关闭对话框
    medicineForm.value = {
      chineseName: '',
      specification: '',
      frequency: '2',
      singleDose: '',
      doses: '7',
      totalQuantity: '',
      note: ''
    }
    
    // 重新聚焦到第一个输入框
    nextTick(() => {
      if (firstInputRef.value) {
        firstInputRef.value.focus()
      }
    })
  }
  
  // 注意：这里不关闭对话框，让用户可以继续添加药品
}
</script>

<style scoped>
.medicine-form {
  padding: 20px 0;
}

.dialog-footer {
  text-align: right;
}

:deep(.el-dialog__header) {
  background-color: #4a5568;
  color: white;
  padding: 15px 20px;
  margin: 0;
}

:deep(.el-dialog__title) {
  color: white;
  font-size: 16px;
  font-weight: 500;
}

:deep(.el-dialog__headerbtn) {
  top: 15px;
  right: 20px;
}

:deep(.el-dialog__headerbtn .el-dialog__close) {
  color: white;
  font-size: 18px;
}

:deep(.el-dialog__body) {
  padding: 20px;
}
</style> 