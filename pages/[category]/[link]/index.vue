<template>
  <main class="test-main relative">
    <a-layout class="test-layout">
      <a-row>
        <a-col
          :xs="{ span: 24 }"
          :sm="{ span: 24 }"
          :md="{ span: 24 }"
          :lg="{ span: 24 }"
          :xl="{ span: 24 }"
          :xxl="{ span: 24 }"
        >
          <div class="test-logo">
            <h1>{{ item.title }}</h1>
            <img
              :src="item.logo"
              style="width: 100%; margin-bottom: 10px"
              :alt="item.link"
            />
            <p>{{ item.description }}</p>
            <div class="mt-2 input-button-wrap">
              <div class="mb-2 name-input">
                <a-input
                  size="large"
                  placeholder="이름 혹은 별칭을 입력해주세요."
                  v-model:value="userName"
                />
              </div>
              <AdsenseStart :slotId="item.adsenses.main" />
              <div class="text-center pt-2">
                <a :href="`/${item.category}/${item.link}/play`" target="_self">
                  <a-button type="primary" class="btn-start" size="large">
                    시작하기
                  </a-button>
                </a>
              </div>
            </div>
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
      <div class="mt-6">
        <h2 class="text-xl font-bold">👉 다른 테스트 하러가기</h2>
        <TestList :recentlyItems="recentlyItems" />
      </div>
    </a-layout>
  </main>
</template>

<script setup>
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const item = ref({});
const recentlyItems = ref([]);
const popularItems = ref([]);
const userName = ref("");

const category = computed(() => {
  return route.params.category;
});
const link = computed(() => {
  return route.params.link;
});

const url = `${runtimeConfig.BASE_URL}/mind/item.php?link=${link.value}`;
const { data } = await useFetch(url, {
  key: "item",
  method: "get",
});

const d = JSON.parse(data._rawValue);
item.value = d.item;
recentlyItems.value = d.recentlyItems;
popularItems.value = d.popularItems;

// const url = `/api/mind/item?link=${link.value}`;
// const { data } = await useFetch(url, {
//   key: "item",
//   method: "get",
// });

// item.value = data._rawValue.item;
// recentlyItems.value = data._rawValue.recentlyItems;
// popularItems.value = data._rawValue.popularItems;

watch(userName, (newUserName) => {
  localStorage.setItem("mindpang-name", newUserName);
});
useHead({
  title: `${d.item.title} - 마인드팡`,
  link: [
    {
      rel: "canonical",
      href: `https://mindpang.com/${d.item.category}/${d.item.link}`,
    },
  ],
  meta: [
    {
      name: "description",
      content: d.item.description,
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:url",
      content: `https://mindpang.com/${d.item.category}/${d.item.link}`,
    },
    {
      name: "og:article:author",
      content: "Mindpang",
    },
    {
      name: "og:site_name",
      content: "마인드팡",
    },
    {
      name: "og:title",
      content: d.item.title,
    },
    {
      name: "og:image",
      content: d.item.logo,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: "@mindpang.com",
    },
    {
      name: "twitter:title",
      content: d.item.title,
    },
    {
      name: "twitter:description",
      content: d.item.description,
    },
    {
      name: "twitter:image",
      content: d.item.logo,
    },
    {
      name: "apple-touch-icon",
      content: d.item.logo,
    },
  ],
});
</script>
