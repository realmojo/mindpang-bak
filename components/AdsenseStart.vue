<template>
  <div v-if="env === 'development'" class="adsense-dev text-white">
    애드센스 {{ slotId }}
  </div>
  <div v-else>
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-9130836798889522"
      :data-ad-slot="slotId"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  </div>
</template>

<script setup>
const props = defineProps({
  slotId: String,
});

const env = ref(process.env.NODE_ENV);
onMounted(() => {
  if (process.env.NODE_ENV !== "development") {
    (adsbygoogle = window.adsbygoogle || []).push({});
  }
});
</script>
