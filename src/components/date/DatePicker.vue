<template>
  <div class="row q-col-gutter-md">
    <q-select
      v-if="showDateTypeSelector"
      v-model="isCalendarInAD"
      :options="[
        { label: 'AD', value: true },
        { label: 'BS', value: false },
      ]"
      option-value="value"
      option-label="label"
      map-options
      label="Date Type"
      emit-value
      class="col-1"
    />
    <div>
      <q-input
        :model-value="getDateValue"
        @onClick="this.select()"
        :error="!!props.error"
        :error-message="props.errorMessage"
        :hint="props.hint"
        :placeholder="props.placeholder"
        :disable="props.disable"
        @update:model-value="onDateInput"
        :label="props.label"
        type="text"
        mask="####-##-##"
        class="col-4"
        debounce="1000"
      >
      </q-input>
      <q-menu v-if="!props.disable" :no-focus="true">
        <q-date v-if="isCalendarInAD" v-model="date" mask="YYYY-MM-DD" />
        <bs-date-picker v-else v-model="date"></bs-date-picker>
      </q-menu>
    </div>
  </div>
</template>
<script setup>
import DateConverter from '../../utils/VikramSamvat.js'

const props = defineProps([
  'modelValue',
  'label',
  'error',
  'errorMessage',
  'hint',
  'placeholder',
  'disable',
  'showDateTypeSelector',
])
const date = ref(props.modelValue)
const error = ref(props.error)
const errorMessage = ref(props.errorMessage)

const emit = defineEmits(['update:modelValue'])
const isCalendarInAD = ref(false)

watch(date, (val) => {
  if (isCalendarInAD.value) {
    if (DateConverter.isValidAD(val)) {
      error.value = false
      errorMessage.value = null
    }
  } else {
    if (DateConverter.isValid(val)) {
      error.value = false
      errorMessage.value = null
    }
  }
  emit('update:modelValue', val)
})

const numberMap = {
  0: '०',
  1: '१',
  2: '२',
  3: '३',
  4: '४',
  5: '५',
  6: '६',
  7: '७',
  8: '८',
  9: '९',
}

const convertDate = (number) => {
  if (!number) return ''
  const localNumber = String(number).replace(/[०१२३४५६७८९]/g, (m) =>
    Object.values(numberMap).indexOf(m).toString()
  )
  return localNumber
}

watch(
  () => props.modelValue,
  (val) => {
    date.value = val
  }
)

const getDateValue = computed(() => {
  const convertedDate = DateConverter.getRepresentation(
    date.value,
    isCalendarInAD.value ? 'ad' : 'bs'
  )
  return convertedDate
})

const onDateInput = (text) => {
  if (text == '') {
    date.value = null
  }
  if (!isCalendarInAD.value) {
    text = convertDate(text)
  }
  text = DateConverter.parseText(text)
  error.value = false
  errorMessage.value = null
  if (isCalendarInAD.value) {
    if (DateConverter.isValidAD(text)) {
      date.value = text
      error.value = false
      errorMessage.value = null
    } else {
      error.value = true
      errorMessage.value = 'Invalid AD Date'
    }
  } else {
    if (DateConverter.isValid(text)) {
      date.value = DateConverter.bs2ad(text)
      error.value = false
      errorMessage.value = null
    } else {
      error.value = true
      errorMessage.value = 'Invalid BS Date'
    }
  }
}
</script>
