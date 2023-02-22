<template>
  <main>
    <a-layout class="site-layout px-2">
      <a-row>
        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 24 }"
          :xl="{ span: 24 }"
          :xxl="{ span: 24 }"
        >
          <a-row
            class="pt-2 pb-4"
            :gutter="8"
            style="margin-left: 0, margin-right: 0"
          >
            <Items :items="items" />
          </a-row>
          <div class="text-center mb-4">
            <a-button class="btn-mindpang" size="large" @click="doMoreItem">
              더보기
            </a-button>
          </div>
        </a-col>
        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 24 }"
          :xl="{ span: 24 }"
          :xxl="{ span: 24 }"
        >
          <Sidebar
            :recentlyItems="recentlyItems"
            :popularItems="popularItems"
          />
        </a-col>
      </a-row>
    </a-layout>
  </main>
</template>

<script setup>
const route = useRoute();
const runtimeConfig = useRuntimeConfig();
const items = ref([]);
const recentlyItems = ref([]);
const popularItems = ref([]);
const page = ref(1);

const categoryArr = {
  life: "라이프",
  love: "사랑",
  health: "건강",
  money: "돈",
  entertain: "연예",
};

const category = computed(() => {
  return route.params.category ? route.params.category : "all";
});
useHead({
  title: `${categoryArr[category.value]} - 재미있는 무료 테스트 모음`,
  link: [
    {
      rel: "canonical",
      href: `https://mindpang.com/${category.value}`,
    },
  ],
});

const url = `${runtimeConfig.BASE_URL}/mind/main.php?category=${category.value}`;
const { data } = await useFetch(url, {
  key: "main",
  method: "get",
});

const d = JSON.parse(data._rawValue);
items.value = d.items;
recentlyItems.value = d.recentlyItems;
popularItems.value = d.popularItems;

const doMoreItem = async () => {
  const url = `${runtimeConfig.BASE_URL}/mind/list.php?category=${category.value}&page=${page.value}`;
  const { data } = await useFetch(url, {
    key: "moreList",
    method: "get",
  });
  const d = JSON.parse(data._rawValue);
  const moreItems = d;
  // const url = `/api/mind/list?category=${category.value}&page=${page.value}`;
  // const { data } = await useFetch(url, {
  //   key: "moreList",
  //   method: "get",
  // });
  // const moreItems = data._rawValue.data;
  if (moreItems.length) {
    page.value += 1;
    items.value = items.value.concat(moreItems);
  }
};
</script>
