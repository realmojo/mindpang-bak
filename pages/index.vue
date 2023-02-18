<template>
  <main>
    <a-layout class="site-layout">
      <a-row>
        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 18 }"
          :lg="{ span: 18 }"
          :xl="{ span: 18 }"
          :xxl="{ span: 18 }"
        >
          <a-row
            class="pt-4 pb-4 px-2"
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
          :md="{ span: 6 }"
          :lg="{ span: 6 }"
          :xl="{ span: 6 }"
          :xxl="{ span: 6 }"
        >
          <Sidebar
            :recentlyItems="recentlyItems"
            :popularItems="popularItems"
          />
        </a-col>
      </a-row>
    </a-layout>
  </main>
  <Footer />
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
  const url = `/api/mind/list?page=${page.value}`;
  const { data } = await useFetch(url, {
    key: "moreList",
    method: "get",
  });
  const moreItems = data._rawValue.data;
  if (moreItems.length) {
    page.value += 1;
    items.value = items.value.concat(moreItems);
  }
};
</script>
