<template>
  <header>
    <div class="header-wrap">
      <a href="/" target="_self">마인드팡</a>
      <nuxt-img
        src="https://f5game.s3.ap-northeast-2.amazonaws.com/testpang-logo.png"
        class="logo-image"
        alt="테스트팡-로고"
      />
      <a-button @click="doRandomStart">
        <template #icon><CaretRightOutlined /></template
      ></a-button>
      <a-button @click="doSearch">
        <template #icon><SearchOutlined /></template>
      </a-button>
    </div>
    <div v-if="isSearch" class="search-layout">
      <a-input
        class="w-full"
        placeholder="찾고 싶은 테스트를 검색해주세요."
        size="large"
        v-model:value="searchText"
      />
    </div>
    <ul v-if="isSearchList && searchItems.length" class="search-list-item-wrap">
      <li v-for="(item, index) in searchItems" :key="index">
        <a
          :href="`/${item.category}/${item.link}`"
          target="_self"
          class="search-list-item"
        >
          <div class="flex">
            <div>
              <nuxt-img
                class="search-list-item-img"
                :alt="item.title"
                :src="item.logo"
                width="30"
                height="30"
              />
            </div>
            <div class="search-list-item-title">{{ item.title }}</div>
          </div>
        </a>
      </li>
    </ul>
    <div class="mindpang-menu-wrap">
      <ul class="mindpang-menu">
        <li v-for="menu in menuItems" :key="menu.key">
          <a
            :href="`/${menu.key !== 'all' ? menu.key : ''}`"
            :class="`menu-item ${
              category === menu.key ? 'menu-item-active' : ''
            }`"
            target="_self"
          >
            {{ menu.title }}
          </a>
        </li>
      </ul>
    </div>
  </header>

  <slot></slot>
  <Footer />
</template>

<script setup>
import { SearchOutlined, CaretRightOutlined } from "@ant-design/icons-vue";

const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const category = computed(() => {
  return route.params.category ? route.params.category : "all";
});
const isSearch = ref(false);
const searchText = ref("");
const isSearchList = ref(false);
const searchItems = ref([]);
const menuItems = ref([
  {
    title: "전체",
    key: "all",
    link: "/",
  },
  {
    title: "라이프",
    key: "life",
    link: "/life",
  },
  {
    title: "사랑",
    key: "love",
    link: "/love",
  },
  {
    title: "건강",
    key: "health",
    link: "/health",
  },
  {
    title: "돈",
    key: "money",
    link: "/money",
  },
  {
    title: "연예",
    key: "entertain",
    link: "/entertain",
  },
]);

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const debounce = (func, limit) => {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(this, args);
    }, limit);
  };
};

watch(
  searchText,
  debounce(async (newSearchText) => {
    if (newSearchText) {
      const url = `${runtimeConfig.BASE_URL}/mind/search.php?search=${newSearchText}`;
      const { data } = await useFetch(url, {
        key: "main",
        method: "get",
      });
      const d = JSON.parse(data._rawValue);
      searchItems.value = d.items;
    } else {
      searchItems.value = [];
    }
  }, 300)
);

const doSearch = () => {
  isSearch.value = !isSearch.value;
  isSearchList.value = !isSearchList.value;
};

const doRandomStart = async () => {
  const url = `${runtimeConfig.BASE_URL}/mind/all.php`;
  const { data } = await useFetch(url, {
    key: "all",
    method: "get",
  });
  const d = JSON.parse(data._rawValue).items;
  const randomNumber = getRandomNumber(0, d.length - 1);
  location.href = `/${d[randomNumber].category}/${d[randomNumber].link}`;
};
</script>
