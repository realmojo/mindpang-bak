<template>
  <div className="mt-4 px-2">
    <a-divider orientation="left">최신 테스트</a-divider>
    <a-list item-layout="horizontal" :data-source="recentlyItems" bordered>
      <template #renderItem="{ item }">
        <a-list-item
          ><a :href="`/${item.category}/${item.link}`">
            <span className="category-sidebar-text">
              [{{ convertCategory(item.category) }}]
            </span>
            <span className="category-sidebar-title"> {{ item.title }}</span></a
          ></a-list-item
        >
      </template>
    </a-list>
    <div className="mt-8"></div>
    <a-divider orientation="left">가장 인기있는 테스트</a-divider>
    <a-list item-layout="horizontal" :data-source="popularItems" bordered>
      <template #renderItem="{ item }">
        <a-list-item
          ><a :href="`/${item.category}/${item.link}`">
            <span className="category-sidebar-text">
              [{{ convertCategory(item.category) }}]
            </span>
            <span className="category-sidebar-title"> {{ item.title }}</span></a
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
