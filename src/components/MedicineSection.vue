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
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-input 
            v-else
            v-model="row.name" 
            size="small"
            placeholder="编号"
            @input="updateMedicine($index)"
          />
        </template>
      </el-table-column>
      
      <el-table-column prop="chineseName" label="饮片名称" min-width="120">
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-input 
            v-else
            v-model="row.chineseName" 
            size="small"
            placeholder="名称"
            @input="updateMedicine($index)"
          />
        </template>
      </el-table-column>
      
      <el-table-column prop="mnemonicCode" label="助记码" min-width="100">
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-input 
            v-else
            v-model="row.mnemonicCode" 
            size="small"
            placeholder="助记码"
            @input="updateMedicine($index)"
          />
        </template>
      </el-table-column>
      
      <el-table-column prop="specification" label="规格" min-width="80">
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-input 
            v-else
            v-model="row.specification" 
            size="small"
            placeholder="规格"
            @input="updateMedicine($index)"
          />
        </template>
      </el-table-column>
      
      <el-table-column prop="singleDose" label="单剂量" min-width="80">
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-input 
            v-else
            v-model="row.singleDose" 
            size="small"
            placeholder="单剂量"
            @input="updateMedicine($index)"
          />
        </template>
      </el-table-column>
      
      <el-table-column prop="totalAmount" label="贴数/剂数" min-width="100">
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-input 
            v-else
            v-model="row.totalAmount" 
            size="small"
            placeholder="贴数"
            @input="updateMedicine($index)"
          />
        </template>
      </el-table-column>
      
      <el-table-column prop="totalQuantity" label="总剂量" min-width="80">
        <template #default="{ row, $index }">
          <span v-if="!row.isTotal">
            <el-input 
              v-model="row.totalQuantity" 
              size="small"
              placeholder="总剂量"
              @input="updateMedicine($index)"
            />
          </span>
          <span v-else style="font-weight: bold; color: #E6A23C;">{{ totalQuantitySum }}</span>
        </template>
      </el-table-column>
      
      <el-table-column prop="unit" label="单位" min-width="60">
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-select 
            v-else
            v-model="row.unit" 
            size="small"
            placeholder="单位"
            @change="updateMedicine($index)"
          >
            <el-option label="g" value="g" />
            <el-option label="ml" value="ml" />
            <el-option label="粒" value="粒" />
            <el-option label="片" value="片" />
            <el-option label="包" value="包" />
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column prop="usage" label="脚注" min-width="80">
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-select 
            v-else
            v-model="row.usage" 
            size="small"
            placeholder="脚注"
            @change="updateMedicine($index)"
          >
            <el-option label="常规" value="常规" />
            <el-option label="先煎" value="先煎" />
            <el-option label="后下" value="后下" />
            <el-option label="包煎" value="包煎" />
            <el-option label="冲服" value="冲服" />
            <el-option label="烊化" value="烊化" />
          </el-select>
        </template>
      </el-table-column>
      
      <el-table-column prop="unitPrice" label="货位" min-width="80">
        <template #default="{ row, $index }">
          <span v-if="row.isTotal"></span>
          <el-input 
            v-else
            v-model="row.unitPrice" 
            size="small"
            placeholder="货位"
            @input="updateMedicine($index)"
          />
        </template>
      </el-table-column>
      
      <el-table-column label="操作" width="80" align="center">
        <template #default="{ row, $index }">
          <el-button 
            v-if="!row.isTotal"
            type="danger" 
            size="small" 
            @click="handleRemoveMedicine($index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加药品按钮 -->
    <div class="medicine-input-section">
      <el-button 
        type="primary" 
        @click="addNewMedicine"
        icon="Plus"
      >
        添加药品 (Alt+I)
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import type { PrescriptionForm, Medicine } from '../types/prescription'

const props = defineProps<{
  form: PrescriptionForm
}>()

const emit = defineEmits<{
  addMedicine: []
  removeMedicine: [index: number]
}>()

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
    mnemonicCode: '',
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

// 添加新药品
const addNewMedicine = () => {
  const newMedicine: Medicine = {
    sequence: props.form.medicines.length + 1,
    name: '',
    chineseName: '',
    mnemonicCode: '',
    specification: '',
    singleDose: '',
    totalAmount: '',
    totalQuantity: '',
    unit: 'g',
    usage: '常规',
    unitPrice: ''
  }
  props.form.medicines.push(newMedicine)
}

// 更新药品信息
const updateMedicine = (index: number) => {
  // 这里可以添加自动计算逻辑，比如根据单剂量和贴数计算总剂量
  const medicine = props.form.medicines[index]
  if (medicine.singleDose && medicine.totalAmount) {
    const singleDose = parseFloat(medicine.singleDose) || 0
    const totalAmount = parseFloat(medicine.totalAmount) || 0
    medicine.totalQuantity = (singleDose * totalAmount).toString()
  }
}

const handleRemoveMedicine = (index: number) => {
  emit('removeMedicine', index)
}

// 键盘事件处理
const handleKeyDown = (event: KeyboardEvent) => {
  // Alt + I 键添加新药品
  if (event.altKey && event.key === 'i') {
    event.preventDefault()
    addNewMedicine()
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
  margin-top: 10px;
}

:deep(.el-input__inner) {
  height: 28px;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-table .el-table__cell) {
  padding: 4px 0;
}
</style> 