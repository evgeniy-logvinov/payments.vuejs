<script lang="ts" setup>
import { usePaymentsStore } from '../../../stores/payments'
import { computed, onMounted, reactive, ref } from 'vue'
import type { CardInfo } from '../../../interfaces/CardInfo'
import router from '../../../router'
import type { TariffType } from '../../../interfaces/TariffType'

const currentYear = ref<number>(new Date().getFullYear())
const error = ref<string | null>(null)
const cardInfo = reactive<CardInfo>({
  cardNumber: null,
  cardHolders: null,
  cvv: null,
  until: {
    mm: null,
    yy: null
  }
})

const props = withDefaults(defineProps<{ tariff?: TariffType | null }>(), {
  tariff: null
})

// const payments = computed(() => {
//   const { payments } = usePaymentsStore()
//   return payments
// })

async function onBuy() {
  try {
    const { confirmPayment } = usePaymentsStore()
    await confirmPayment(cardInfo)
    // router.go(-1)
    router.push({ name: 'Payments' })
  } catch (err) {
    error.value = (err as Error).message
  }
}
</script>
<template>
  <el-row
    ><el-col>
      <el-card class="my-4">
        <template #header>
          <div class="card-header">
            <span>Payments info</span>
            <div>Tariff selected: {{ props.tariff }}</div>
            <div>Coast: {{ props.tariff === 'first' ? '40$' : '70$' }}</div>
          </div>
        </template>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <el-form :model="cardInfo" label-width="120px">
          <el-form-item label="Card Number">
            <el-input
              v-model="cardInfo.cardNumber"
              maxlength="16"
              placeholder="#### #### #### ####"
              show-word-limit
              type="text"
            />
          </el-form-item>
          <el-form-item label="Card Holders">
            <el-input
              v-model="cardInfo.cardHolders"
              maxlength="16"
              placeholder="Card Holders"
              type="text"
            />
          </el-form-item>
          <el-form-item label="Expiration Date">
            <el-select v-model="cardInfo.until.mm" placeholder="MM">
              <el-option value="" disabled selected>Month</el-option>
              <el-option v-for="n in 12" :value="n < 10 ? '0' + n : n" :key="n">
                {{ 10 > n ? '0' + n : n }}
              </el-option>
            </el-select>
            <el-select
              v-model="cardInfo.until.yy"
              class="ml-2"
              placeholder="YY"
            >
              <option value="" disabled selected>Year</option>
              <el-option
                v-for="(n, $index) in 12"
                :value="$index + currentYear"
                :key="n"
              >
                {{ $index + currentYear }}
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="CVV">
            <el-input
              v-model="cardInfo.cvv"
              maxlength="3"
              placeholder="CVV"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onBuy()">Buy</el-button>
            <el-button @click="router.go(-1)">Back</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col></el-row
  >
</template>

<style scoped>
.wrapper {
  display: flex;
}
</style>
