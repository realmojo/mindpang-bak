<template>
  <div v-if="env === 'development'" class="adsense-dev text-white">
    애드센스 {{ slotId }}
  </div>
  <div v-else>애드센스 작성하기</div>
</template>

<script setup>
const props = defineProps({
  slotId: String,
});

const env = ref(process.env.NODE_ENV);
</script>
