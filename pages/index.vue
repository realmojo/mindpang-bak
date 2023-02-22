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

const searchText = computed(() => {
  return route.query.search;
});

let queryParams = "";
if (searchText.value) {
  queryParams = `?search=${searchText.value}`;
}

const url = `${runtimeConfig.BASE_URL}/mind/main.php${queryParams}`;
const { data } = await useFetch(url, {
  key: "main",
  method: "get",
});

const d = JSON.parse(data._rawValue);
items.value = d.items;
recentlyItems.value = d.recentlyItems;
popularItems.value = d.popularItems;

// const url = `/api/mind/main${queryParams}`;
// const { data } = await useFetch(url, {
//   key: "main",
//   method: "get",
// });

// items.value = data._rawValue.items;
// recentlyItems.value = data._rawValue.recentlyItems;
// popularItems.value = data._rawValue.popularItems;

const doMoreItem = async () => {
  // const url = `/api/mind/list?page=${page.value}`;
  const url = `${runtimeConfig.BASE_URL}/mind/list.php?page=${page.value}`;
  const { data } = await useFetch(url, {
    key: "moreList",
    method: "get",
  });
  const d = JSON.parse(data._rawValue);
  const moreItems = d;
  if (moreItems.length) {
    page.value += 1;
    items.value = items.value.concat(moreItems);
  }
};
</script>
