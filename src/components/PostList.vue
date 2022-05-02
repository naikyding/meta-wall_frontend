<script setup>
const props = defineProps({
  list: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div>{{ props.list }}</div>
</template>
