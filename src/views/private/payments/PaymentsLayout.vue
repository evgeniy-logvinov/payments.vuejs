<script lang="ts" setup>
import { usePaymentsStore } from '../../../stores/payments'
import type { TariffType } from '../../../interfaces/TariffType'
import { ref } from 'vue'
import router from '../../../router'

// TODO: remove before destroy
const error = ref<string | null>(null)
// const type = ref<TariffType>(null)

async function onBuy(type: TariffType) {
  try {
    const { chooseType } = await usePaymentsStore()
    chooseType(type)
    // await register({
    //   email: email.value,
    //   password: password.value,
    //   name: name.value
    // })
    router.push({ name: 'PaymentsInfo' })
  } catch (err) {
    error.value = (err as Error).message
  }
}
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-header">Payments</div>
          <div class="card-body">
            <div v-if="error" class="alert alert-danger">{{ error }}</div>
            <div class="wrapper">
              <form action="#" @submit.prevent="onBuy('first')">
                <div class="form-group row">
                  <label
                    for="name"
                    class="col-md-4 col-form-label text-md-right"
                    >Tariff 1</label
                  >

                  <div class="col-md-6">Tariff 1 Description</div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">Buy</button>
                  </div>
                </div>
              </form>
              <form action="#" @submit.prevent="onBuy('second')">
                <div class="form-group row">
                  <label
                    for="name"
                    class="col-md-4 col-form-label text-md-right"
                    >Tariff 2</label
                  >

                  <div class="col-md-6">Tariff 2 Description</div>
                </div>

                <div class="form-group row mb-0">
                  <div class="col-md-8 offset-md-4">
                    <button type="submit" class="btn btn-primary">Buy</button>
                  </div>
                </div>
              </form>
            </div>
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
