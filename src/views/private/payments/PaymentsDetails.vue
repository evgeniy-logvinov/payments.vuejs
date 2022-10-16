<script lang="ts" setup>
import type { TariffType } from '../../../interfaces/TariffType'
import { onMounted, ref } from 'vue'
import router from '../../../router'
import PaymentsService from '@/services/PaymentsService'
import type { PaymentsInfo } from '@/interfaces/PaymentsInfo'

// TODO: remove before destroy
const error = ref<string | null>(null)
const currentTariff = ref<TariffType>(null)

const onBuy = async (type: TariffType) => {
  try {
    router.push({ name: 'PaymentsInfo', query: { tariff: type } })
  } catch (err) {
    error.value = (err as Error).message
  }
}
onMounted(async () => {
  try {
    const response = await PaymentsService.getPayments<PaymentsInfo>()
    currentTariff.value = response.data.tariff || null
  } catch (err) {
    console.log(err)
  }
})
</script>
<template>
  <el-row>
    <el-col :span="12">
      <el-card class="my-4 mr-2" :class="{ active: currentTariff === 'first' }">
        <template #header>
          <div class="flex justify-between">
            <span>Tariff 1</span>
            <el-button
              class="button"
              :disabled="currentTariff === 'first'"
              @click="onBuy('first')"
              >Buy</el-button
            >
          </div>
        </template>

        <div>
          <div>
            <span
              >Tariff Description Tariff Description Tariff Description Tariff
              Description Tariff Description</span
            >
          </div>
        </div>
      </el-card>
    </el-col>
    <el-col :span="12">
      <el-card
        class="my-4 ml-2"
        :class="{ active: currentTariff === 'second' }"
      >
        <template #header>
          <div class="flex justify-between">
            <span>Tariff 2</span>
            <el-button
              class="button"
              :disabled="currentTariff === 'second'"
              @click="onBuy('second')"
              >Buy</el-button
            >
          </div>
        </template>

        <div>
          <div>
            <span
              >Tariff Description Tariff Description Tariff Description Tariff
              Description Tariff Description</span
            >
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<style scoped>
.wrapper {
  display: flex;
}

.active {
  background-color: red;
}
</style>
