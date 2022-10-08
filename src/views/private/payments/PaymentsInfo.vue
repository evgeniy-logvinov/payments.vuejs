<script lang="ts" setup>
import { usePaymentsStore } from '../../../stores/payments'
import { computed, reactive, ref } from 'vue'
import type { CardInfo } from '../../../interfaces/CardInfo'
import router from '@/router'

const error = ref<string | null>(null)
const cardInfo = reactive<CardInfo>({
  cardNumber: null,
  cvv: null,
  until: {
    mm: null,
    yy: null
  }
})

const payments = computed(() => {
  const { payments } = usePaymentsStore()
  return payments
})

async function onBuy() {
  try {
    const { confirmPayment } = usePaymentsStore()
    await confirmPayment(cardInfo)
    // await register({
    //   email: email.value,
    //   password: password.value,
    //   name: name.value
    // })
    // router.push({ name: 'Dashboard' })
  } catch (err) {
    error.value = (err as Error).message
  }
}
</script>
<template>
  <div>Tariff choosen: {{ payments.newTariff }}</div>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Card info</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <form action="#" @submit.prevent="onBuy">
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >Card number</label
                >

                <div class="col-md-6">
                  <input
                    id="card-number"
                    type="number"
                    class="form-control"
                    name="card-number"
                    required
                    autofocus
                    v-model="cardInfo.cardNumber"
                  />
                </div>
              </div>

              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >MM</label
                >

                <div class="col-md-6">
                  <input
                    id="card-number"
                    type="number"
                    class="form-control"
                    name="card-number"
                    required
                    autofocus
                    v-model="cardInfo.until.mm"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >YY</label
                >

                <div class="col-md-6">
                  <input
                    id="card-number"
                    type="number"
                    class="form-control"
                    name="card-number"
                    required
                    autofocus
                    v-model="cardInfo.until.yy"
                  />
                </div>
              </div>
              <div class="form-group row">
                <label for="email" class="col-md-4 col-form-label text-md-right"
                  >CVV</label
                >

                <div class="col-md-6">
                  <input
                    id="card-number"
                    type="number"
                    class="form-control"
                    name="card-number"
                    required
                    autofocus
                    v-model="cardInfo.cvv"
                  />
                </div>
              </div>

              <div class="form-group row mb-0">
                <div class="col-md-8 offset-md-4">
                  <button type="submit" class="btn btn-primary">Buy</button>
                </div>
              </div>
              <div class="form-group row mb-0">
                <nav>
                  <button @click="router.go(-1)">back</button>
                </nav>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
}
</style>
