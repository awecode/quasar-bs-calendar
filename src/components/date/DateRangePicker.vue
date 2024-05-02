<template>
  <div class="row q-col-gutter-md date-range-picker">
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
    <div class="row q-col-gutter-md target">
      <q-input
        mask="####-##-##"
        debounce="1000"
        :model-value="getText0"
        :error="error0"
        :error-message="errorMessage0"
        @update:model-value="onInput0"
        label="Start Date"
        :outlined="outlined"
        :dense="dense"
        :style="inputStyle"
      />
      <q-input
        mask="####-##-##"
        debounce="1000"
        :model-value="getText1"
        :error="error1"
        :error-message="errorMessage1"
        @update:model-value="onInput1"
        label="End Date"
        :outlined="outlined"
        :dense="dense"
        :style="inputStyle"
      />
    </div>
    <q-menu :target="'.target'" :no-focus="true">
      <div class="row q-pa-md main-con">
        <div v-if="!showMonthPicker" class="row" style="min-width: 150px">
          <div>
            <div class="text-caption">Date Range</div>
            <q-list dense padding class="rounded-borders q-pr-md">
              <q-item clickable :active="activeDate == 'today'" v-ripple>
                <q-item-section @click="getToday((last = false))">
                  Today
                </q-item-section>
              </q-item>
              <q-item clickable :active="activeDate == 'yesterday'" v-ripple>
                <q-item-section @click="getToday((last = true))">
                  Yesterday
                </q-item-section>
              </q-item>
              <q-item clickable :active="activeDate == 'last7'" v-ripple>
                <q-item-section @click="getDays((last = 7))"
                  >Last 7 Days</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'last30'" v-ripple>
                <q-item-section @click="getDays((last = 30))"
                  >Last 30 Days</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'thisMonth'" v-ripple>
                <q-item-section @click="getMonth((last = false))"
                  >This Month</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'lastMonth'" v-ripple>
                <q-item-section @click="getMonth((last = true))"
                  >Last Month</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'thisYear'" v-ripple>
                <q-item-section @click="getYear((last = false))"
                  >This Year</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'lastYear'" v-ripple>
                <q-item-section @click="getYear((last = true))"
                  >Last Year</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'thisFY'" v-ripple>
                <q-item-section @click="getFY((last = false))"
                  >This FY</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'lastFY'" v-ripple>
                <q-item-section @click="getFY((last = true))"
                  >Last FY</q-item-section
                >
              </q-item>
            </q-list>
          </div>
        </div>
        <div v-else>
          <div>
            <q-list dense padding class="rounded-borders q-pr-md pt-0">
              <q-item clickable :active="activeDate == 'Baishakh'" v-ripple>
                <q-item-section @click="selectMonth('Baishakh')"
                  >Baishakh</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Jestha'" v-ripple>
                <q-item-section @click="selectMonth('Jestha')"
                  >Jestha</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Asadh'" v-ripple>
                <q-item-section @click="selectMonth('Asadh')"
                  >Asadh</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Shrawan'" v-ripple>
                <q-item-section @click="selectMonth('Shrawan')"
                  >Shrawan</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Bhadra'" v-ripple>
                <q-item-section @click="selectMonth('Bhadra')"
                  >Bhadra</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Ashwin'" v-ripple>
                <q-item-section @click="selectMonth('Ashwin')"
                  >Ashwin</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Kartik'" v-ripple>
                <q-item-section @click="selectMonth('Kartik')"
                  >Kartik</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Mangsir'" v-ripple>
                <q-item-section @click="selectMonth('Mangsir')"
                  >Mangsir</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Poush'" v-ripple>
                <q-item-section @click="selectMonth('Poush')"
                  >Poush</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Magh'" v-ripple>
                <q-item-section @click="selectMonth('Magh')"
                  >Magh</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Falgun'" v-ripple>
                <q-item-section @click="selectMonth('Falgun')"
                  >Falgun</q-item-section
                >
              </q-item>
              <q-item clickable :active="activeDate == 'Chaitra'" v-ripple>
                <q-item-section @click="selectMonth('Chaitra')"
                  >Chaitra
                </q-item-section>
              </q-item>
            </q-list>
          </div>
        </div>
        <div v-if="isCalendarInAD" class="row md-no-wrap q-gutter-md date-Con">
          <q-date v-model="value0" mask="YYYY-MM-DD" />
          <q-date v-model="value1" mask="YYYY-MM-DD" />
        </div>
        <div v-else class="row md-no-wrap q-gutter-md date-Con">
          <bs-date-picker v-model="value0"></bs-date-picker>
          <bs-date-picker v-model="value1"></bs-date-picker>
        </div>
      </div>
    </q-menu>
  </div>
</template>

<script setup>
import DateConverter from '../../utils/VikramSamvat.js'

const props = defineProps({
  startDate: {
    type: String,
    default: null,
  },
  endDate: {
    type: String,
    default: null,
  },
  hideFilters: {
    type: Boolean,
    default: false,
  },
  outlined: {
    type: Boolean,
    default: false,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  inputStyle: {
    type: String,
    default: null,
  },
  showMonthPicker: {
    type: Boolean,
    default: false,
  },
  showDateTypeSelector: {
    type: Boolean,
    default: false,
  },
})

const value0 = ref(props.startDate)
const value1 = ref(props.endDate)
const error0 = ref(false)
const error1 = ref(false)
const errorMessage0 = ref('')
const errorMessage1 = ref('')
const activeDate = ref(null)

const isCalendarInAD = ref(false)

const emit = defineEmits([
  'update:startDate',
  'update:endDate',
  'closeDatePicker',
])

const getText0 = computed(() => {
  return DateConverter.getRepresentation(
    value0.value,
    isCalendarInAD.value ? 'ad' : 'bs'
  )
})
const getText1 = computed(() => {
  return DateConverter.getRepresentation(
    value1.value,
    isCalendarInAD.value ? 'ad' : 'bs'
  )
})

watch(
  () => value0.value,
  (val) => {
    error0.value = false
    emit('update:startDate', val)
  }
)
watch(
  () => value1.value,
  (val) => {
    error1.value = false
    emit('update:endDate', val)
  }
)

watch(
  () => props.startDate,
  (val) => {
    value0.value = val
  }
)
watch(
  () => props.endDate,
  (val) => {
    value1.value = val
  }
)

const monthMapper = {
  Baishakh: '01',
  Jestha: '02',
  Asadh: '03',
  Shrawan: '04',
  Bhadra: '05',
  Ashwin: '06',
  Kartik: '07',
  Mangsir: '08',
  Poush: '09',
  Magh: '10',
  Falgun: '11',
  Chaitra: '12',
}

const onInput0 = (text) => {
  text = DateConverter.parseText(text)
  error0.value = false
  errorMessage0.value = null
  if (!text) {
    return
  }
  if (isCalendarInAD.value) {
    if (DateConverter.isValidAD(text)) {
      emit('update:startDate', text)
    } else {
      error0.value = true
      errorMessage0.value = 'Invalid AD Date'
    }
  } else {
    if (DateConverter.isValid(text)) {
      emit('update:startDate', DateConverter.bs2ad(text))
    } else {
      error0.value = true
      errorMessage0.value = 'Invalid BS Date'
    }
  }
}
const onInput1 = (text) => {
  text = DateConverter.parseText(text)
  error1.value = false
  errorMessage1.value = null
  if (!text) {
    return
  }
  if (isCalendarInAD.value) {
    if (DateConverter.isValidAD(text)) {
      emit('update:endDate', text)
    } else {
      error1.value = true
      errorMessage1.value = 'Invalid AD Date'
    }
  } else {
    if (DateConverter.isValid(text)) {
      emit('update:endDate', DateConverter.bs2ad(text))
    } else {
      error1.value = true
      errorMessage1.value = 'Invalid BS Date'
    }
  }
}

const buildDate = (year, month, day) => {
  let date = new Date(year, month - 1, day)
  return DateConverter.date2str(date)
}
const setDateRange = (value, value3) => {
  emit('update:startDate', value)
  emit('update:endDate', value3)
  emit('closeDatePicker')
  // active.value = false
}
const getYear = (last = false) => {
  const today = new Date()
  activeDate.value = last ? 'lastYear' : 'thisYear'
  if (isCalendarInAD.value) {
    let year = today.getFullYear()
    year = year - (last ? 1 : 0)
    setDateRange(buildDate(year, 1, 1), buildDate(year + 1, 1, 0))
  } else {
    const date = DateConverter.date2str(today)
    let year = DateConverter.getBSYear(date)
    year = year - (last ? 1 : 0)
    const year_end_day = DateConverter.getMonthDays(year, 12)
    const bs0 = `${year}-01-01`
    const bs1 = `${year}-12-${year_end_day}`
    setDateRange(DateConverter.bs2ad(bs0, true), DateConverter.bs2ad(bs1, true))
  }
}
const getFY = (last = false) => {
  const today = new Date()
  const bs_month = DateConverter.getBSMonth(today)
  let bs_year = DateConverter.getBSYear(today)
  if (bs_month < 4) {
    bs_year = bs_year - 1
  }
  activeDate.value = last ? 'lastFY' : 'thisFY'
  bs_year = bs_year - (last ? 1 : 0)
  const fy_start = `${bs_year}-04-01`
  const fy_end = `${bs_year + 1}-03-${DateConverter.getMonthDays(
    bs_year + 1,
    3
  )}`
  setDateRange(DateConverter.bs2ad(fy_start), DateConverter.bs2ad(fy_end))
}
const getMonth = (last = false) => {
  const today = new Date()
  const date = DateConverter.date2str(today)
  activeDate.value = last ? 'lastMonth' : 'thisMonth'
  if (isCalendarInAD.value) {
    let year = today.getFullYear()
    let month = today.getMonth() + 1
    month = month - (last ? 1 : 0)
    setDateRange(buildDate(year, month, 1), buildDate(year, month + 1, 0))
  } else {
    let year = DateConverter.getBSYear(date)
    let month = DateConverter.getBSMonth(date)
    month = month - (last ? 1 : 0)
    if (last && month == 0) {
      month = 12
      year = year - 1
    }
    const month_end_day = DateConverter.getMonthDays(year, month)
    const bs0 = `${year}-${month}-01`
    const bs1 = `${year}-${month}-${month_end_day}`
    setDateRange(DateConverter.bs2ad(bs0), DateConverter.bs2ad(bs1))
  }
}
const getToday = (last = false) => {
  activeDate.value = last ? 'yesterday' : 'today'
  const today = new Date()
  if (last) today.setDate(today.getDate() - 1)
  const date = DateConverter.date2str(today)
  setDateRange(date, date)
}
const getDays = (last = 7) => {
  const today = new Date()
  activeDate.value = last ? 'last' + last : null
  let startDay = new Date(today.getTime() - last * 86400000)
  const todayStr = DateConverter.date2str(today)
  const startDayStr = DateConverter.date2str(startDay)
  setDateRange(startDayStr, todayStr)
}

const selectMonth = (month) => {
  const today = new Date()
  const date = DateConverter.date2str(today)
  let year = null
  if (value0.value) year = DateConverter.getBSYear(value0.value)
  else year = DateConverter.getBSYear(date)
  let monthNumber = monthMapper[month]
  let lastDay = DateConverter.getMonthDays(year, monthNumber)
  const startDate = `${year}-${monthNumber}-01`
  const endDate = `${year}-${monthNumber}-${lastDay}`
  setDateRange(DateConverter.bs2ad(startDate), DateConverter.bs2ad(endDate))
}
</script>

<style>
.date-Con {
  width: 640px;
}

@media (max-width: 1280px) {
  .date-Con {
    width: 300px;
  }
}

@media (max-width: 520px) {
  .main-con {
    width: 325px;
  }
}

@media (min-width: 1280px) {
  .main-con {
    flex-wrap: nowrap;
  }
}
</style>
