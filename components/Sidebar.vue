<template>
  <div className="mt-4 mb-2">
    <a-divider orientation="left"><strong>최신 테스트</strong></a-divider>
    <a-list item-layout="horizontal" :data-source="recentlyItems" bordered>
      <template #renderItem="{ item }">
        <a-list-item>
          <nuxt-img
            class="search-list-item-img"
            :alt="item.title"
            :src="item.logo"
            width="30"
            height="30"
          /><a :href="`/${item.category}/${item.link}`">
            <span className="category-sidebar-title">
              {{ item.title }}
            </span>
            <span className="category-sidebar-text">
              {{ convertCategory(item.category) }}
            </span></a
          ></a-list-item
        >
      </template>
    </a-list>
    <div className="mt-8"></div>
    <a-divider orientation="left"
      ><strong>가장 인기있는 테스트</strong></a-divider
    >
    <a-list item-layout="horizontal" :data-source="popularItems" bordered>
      <template #renderItem="{ item }">
        <a-list-item>
          <nuxt-img
            class="search-list-item-img"
            :alt="item.title"
            :src="item.logo"
            width="30"
            height="30"
          /><a :href="`/${item.category}/${item.link}`">
            <span className="category-sidebar-title">
              {{ item.title }}
            </span>
            <span className="category-sidebar-text">
              {{ convertCategory(item.category) }}
            </span></a
          ></a-list-item
        >
      </template>
    </a-list>
  </div>
</template>

<script setup>
const props = defineProps({
  recentlyItems: Array,
  popularItems: Array,
});

const convertCategory = (value) => {
  let convertString = value;
  if (value.includes("life")) {
    convertString = convertString.replace("life", "라이프");
  }
  if (value.includes("love")) {
    convertString = convertString.replace("love", "사랑");
  }
  if (value.includes("health")) {
    convertString = convertString.replace("health", "건강");
  }
  if (value.includes("entertain")) {
    convertString = convertString.replace("entertain", "연예");
  }
  if (value.includes("money")) {
    convertString = convertString.replace("money", "돈");
  }
  return convertString;
};
</script>
