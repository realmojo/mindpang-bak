<template>
  <a-row :gutter="8" class="mt-4">
    <a-col
      v-for="(item, index) in recentlyItems"
      :key="index"
      :xs="{ span: 24 }"
      :sm="{ span: 24 }"
      :md="{ span: 12 }"
      :lg="{ span: 12 }"
      :xl="{ span: 12 }"
      :xxl="{ span: 12 }"
      class="pb-6"
    >
      <a :href="`/${item.category}/${item.link}`" target="_self">
        <a-card size="small" hoverable>
          <div class="ant-card-cover">
            <img :src="item.logo" :alt="item.link" />
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
  </a-row>
</template>

<script setup>
const props = defineProps({
  recentlyItems: Array,
});
</script>
