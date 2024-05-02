<template>
  <div class="q-pa-xl">
    <div>
      <DateRangePicker
        v-model:startDate="date.start"
        v-model:endDate="date.end"
        :show-date-type-selector="true"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')
const date = ref({
  start: `${year}-${month}-01`,
  end: `${year}-${month}-${day}`,
})
</script>
