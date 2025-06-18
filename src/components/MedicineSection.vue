<template>
  <div class="medicine-section">
    <!-- 药品表格 -->
    <el-divider content-position="left">药品信息</el-divider>
    
    <el-table :data="tableDataWithTotal" border style="width: 100%; margin-bottom: 20px;" :show-summary="false">
      <el-table-column prop="sequence" label="序号" width="60" align="center">
        <template #default="{ row }">
          <span v-if="row.isTotal" style="font-weight: bold;">合计</span>
          <span v-else>{{ row.sequence }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="饮片编号" min-width="120">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="chineseName" label="饮片名称" min-width="100">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.chineseName }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="specification" label="规格" min-width="80">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.specification }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="singleDose" label="单剂量" min-width="80">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.singleDose }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalAmount" label="贴数/剂数" min-width="100">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.totalAmount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="totalQuantity" label="总剂量" min-width="80">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.totalQuantity }}</span>
          <span v-else style="font-weight: bold; color: #E6A23C;">{{ totalQuantitySum }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unit" label="单位" min-width="60">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.unit }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="usage" label="脚注" min-width="80">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.usage }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="unitPrice" label="货位" min-width="80">
        <template #default="{ row }">
          <span v-if="!row.isTotal">{{ row.unitPrice }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="80" align="center">
        <template #default="{ row, $index }">
          <el-button 
            v-if="!row.isTotal"
            type="danger" 
            size="small" 
            @click="handleRemoveMedicine($index)"
            :tabindex="0"
            @keydown.enter="handleRemoveMedicine($index)"
            @keydown.space.prevent="handleRemoveMedicine($index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 药品录入区域 -->
    <div class="medicine-input-section">
      <el-button 
        type="primary" 
        @click="showMedicineDialog"
        :tabindex="0"
        @keydown.enter="showMedicineDialog"
        @keydown.space.prevent="showMedicineDialog"
      >
        录入药品 (Alt+I)
      </el-button>
    </div>



    <!-- 药品录入对话框 -->
    <MedicineDialog 
      v-model:visible="dialogVisible" 
      @confirm="handleMedicineConfirm"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { PrescriptionForm, Medicine } from '../types/prescription'
import MedicineDialog from './MedicineDialog.vue'

const props = defineProps<{
  form: PrescriptionForm
}>()

const emit = defineEmits<{
  addMedicine: []
  removeMedicine: [index: number]
}>()

// 对话框显示状态
const dialogVisible = ref(false)

// 计算总剂量合计
const totalQuantitySum = computed(() => {
  return props.form.medicines.reduce((sum, medicine) => {
    const quantity = parseFloat(medicine.totalQuantity) || 0
    return sum + quantity
  }, 0)
})

// 表格数据包含合计行
const tableDataWithTotal = computed(() => {
  const medicines = [...props.form.medicines]
  // 添加合计行
  medicines.push({
    sequence: 0,
    name: '',
    chineseName: '',
    specification: '',
    singleDose: '',
    totalAmount: '',
    totalQuantity: '',
    unit: '',
    usage: '',
    unitPrice: '',
    isTotal: true
  } as Medicine & { isTotal: boolean })
  return medicines
})



const showMedicineDialog = () => {
  dialogVisible.value = true
}

const handleRemoveMedicine = (index: number) => {
  emit('removeMedicine', index)
}

// 处理药品录入确认
const handleMedicineConfirm = (medicines: Medicine[]) => {
  // 为每个药品设置正确的序号
  medicines.forEach((medicine, index) => {
    medicine.sequence = props.form.medicines.length + index + 1
  })
  
  // 添加药品到表格
  props.form.medicines.push(...medicines)
}

// 键盘事件处理
const handleKeyDown = (event: KeyboardEvent) => {
  // Alt + I 键打开药品录入对话框
  if (event.altKey && event.key === 'i') {
    event.preventDefault()
    showMedicineDialog()
  }
  // Alt + D 键删除最后一个药品
  if (event.altKey && event.key === 'd') {
    event.preventDefault()
    if (props.form.medicines.length > 0) {
      const lastIndex = props.form.medicines.length - 1
      handleRemoveMedicine(lastIndex)
    }
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
.medicine-section {
  margin-bottom: 20px;
}

.medicine-input-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px 0;
}

.shortcut-tips {
  /* 移除flex: 1，让文字不占据全部剩余空间 */
}

.tip-text {
  color: #E6A23C;
  font-size: 14px;
  background-color: #FDF6EC;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #F5DAB1;
}

.total-section {
  text-align: right;
  font-size: 16px;
  font-weight: bold;
  color: #E6A23C;
  padding: 10px 0;
  border-top: 1px solid #EBEEF5;
}

:deep(.el-table) {
  border-radius: 4px;
}

:deep(.el-table th) {
  background-color: #F5F7FA;
  color: #909399;
  font-weight: 500;
}

:deep(.el-divider__text) {
  font-weight: 500;
  color: #409EFF;
}
</style> 