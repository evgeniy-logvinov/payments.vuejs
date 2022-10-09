<script lang="ts" setup>
// import { usePaymentsStore } from '../../../stores/payments'
import type { TariffType } from '../../../interfaces/TariffType'
import { ref } from 'vue'
import router from '../../../router'

// TODO: remove before destroy
const error = ref<string | null>(null)
// const type = ref<TariffType>(null)

const onBuy = async (type: TariffType) => {
  try {
    // const { chooseType } = await usePaymentsStore()
    // chooseType(type)
    // await register({
    //   email: email.value,
    //   password: password.value,
    //   name: name.value
    // })
    router.push({ name: 'PaymentsInfo', query: { tariff: type } })
  } catch (err) {
    error.value = (err as Error).message
  }
}
</script>
<template>
  <el-row>
    <el-col :span="12">
      <el-card class="m-4">
        <template #header>
          <div class="flex justify-between">
            <span>Tariff 1</span>
            <el-button class="button" @click="onBuy('first')">Buy</el-button>
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
      <el-card class="m-4">
        <template #header>
          <div class="flex justify-between">
            <span>Tariff 2</span>
            <el-button class="button" @click="onBuy('second')">Buy</el-button>
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
</style>
