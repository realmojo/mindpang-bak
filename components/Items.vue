<template>
  <a-col
    v-for="item in items"
    :key="item.title"
    :xs="{ span: 24 }"
    :sm="{ span: 24 }"
    :md="{ span: 12 }"
    :lg="{ span: 12 }"
    :xl="{ span: 12 }"
    :xxl="{ span: 12 }"
    class="pb-2"
  >
    <a :href="`/${item.category}/${item.link}`" target="_self">
      <a-card hoverable size="small">
        <div class="ant-card-cover">
          <nuxt-img :alt="item.link" :src="item.logo" loading="lazy" />
        </div>

        <div class="ant-card-meta">
          <div class="ant-card-meta-detail">
            <div class="ant-card-meta-title">
              <h2 class="text-sm py-3 mt-2">{{ item.title }}</h2>
            </div>
          </div>
        </div>
      </a-card>
    </a>
  </a-col>
</template>

<script setup>
const props = defineProps({
  items: Array,
});
</script>
