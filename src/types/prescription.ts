// 药品接口定义
export interface Medicine {
  sequence: number
  name: string
  chineseName: string
  specification: string
  singleDose: string
  totalAmount: string
  totalQuantity: string
  unit: string
  usage: string
  unitPrice: string
}

// 表单数据接口定义
export interface PrescriptionForm {
  prescriptionNo: string
  patientName: string
  patientAge: string
  hospital: string
  patientGender: string
  isDecoction: string
  decoctionMethod: string
  prescriptionType: string
  usageMethod: string
  doses: string
  frequency: string
  packageSize: string
  specialGroup: string
  soakTime: string
  processingType: string
  administrationMethod: string
  department: string
  area: string
  ward: string
  bed: string
  insuranceNo: string
  caseNo: string
  outpatientNo: string
  repeatDecoction: string
  decoctionStyle: string
  pickupTime: string
  pickupNo: string
  doctor: string
  prescriptionAmount: string
  medicalPolicy: string
  doctorNote: string
  paymentMethod: string
  diagnosisResult: string
  medicines: Medicine[]
  contactPhone: string
  recipient: string
  expressType: string
  detailedAddress: string
  remarks: string
} 