<script setup>
import { useLinePayStore } from '../stores/payment'
const linePay = useLinePayStore()
const items = {
  amount: 10,
  currency: 'TWD',
  packages: [
    {
      id: 'p1',
      amount: 10,
      products: [
        {
          id: 'pro_1',
          amount: 10,
          name: '捐 10 塊',
          quantity: 1,
          price: 10,
        },
      ],
    },
  ],
}
</script>

<template>
  <div
    class="sponsor fixed bottom-0 w-full bg-secondary py-2 text-center text-white"
  >
    <div
      @click="linePay.goLinePay(items)"
      class="z-50 flex cursor-pointer items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="mr-1 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
      SPONSOR
    </div>
  </div>
</template>
