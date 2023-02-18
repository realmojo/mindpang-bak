<template>
  <header>
    <div class="header-wrap">
      <a href="/" target="_self">마인드팡</a>
      <img
        src="https://f5game.s3.ap-northeast-2.amazonaws.com/testpang-logo.png"
        class="logo-image"
        alt="테스트팡-로고"
      />
      <a-button @click="doRandomStart">랜덤 테스트</a-button>
      <a-button @click="doSearch">검색</a-button>
    </div>
    <div v-if="isSearch" class="search-layout">
      <a-input-search
        class="w-full"
        placeholder="찾고 싶은 테스트를 검색해주세요."
        @search="doKeywordSearch"
        size="large"
        v-model:value="searchText"
      />
    </div>
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

  <slot :items="items"></slot>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();
const route = useRoute();

const category = computed(() => {
  return route.params.category ? route.params.category : "all";
});
const isSearch = ref(false);
const searchText = ref("");
const items = ref([]);
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

const doKeywordSearch = () => {
  location.href = `/?search=${searchText.value}`;
};

const doSearch = () => {
  isSearch.value = !isSearch.value;
};

const doRandomStart = () => {
  // const randomNumber = getRandomNumber(0, items.length - 1);
  // location.href = `/${items[randomNumber].key}/${items[randomNumber].link}`;
};
</script>
