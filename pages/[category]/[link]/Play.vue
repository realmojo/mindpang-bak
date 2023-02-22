<template>
  <div v-if="isLoading" class="site-layout px-2">
    <PlayLoading
      :item="item"
      :testAnswer="testAnswer"
      :slotId="item.adsenses.loading"
    />
  </div>
  <main class="test-main" v-else>
    <a-layout class="test-layout play-layout">
      <div
        v-for="(content, index) in item.contents"
        class="test-item mb-4"
        :key="index"
      >
        <h1 v-if="content && content.title.text" class="test-play-title">
          {{ index + 1 }}. {{ content.title.text }}
        </h1>
        <div v-if="content && content.title.url" class="mb-2">
          <nuxt-img
            class="test-play-img"
            :src="content.title.url"
            :alt="content.title.text"
          />
        </div>
        <a-radio-group class="mt-2" v-model:value="testAnswer[index]">
          <a-space :size="0" direction="vertical">
            <a-radio
              v-for="(question, _qIndex) in item.contents[index].questions"
              :key="`${index}-${_qIndex}`"
              :value="_qIndex"
            >
              {{ question.text }}
            </a-radio>
          </a-space>
        </a-radio-group>
      </div>

      <AdsensePlay :slotId="item.adsenses.play" />

      <div class="my-3">
        <div class="text-center mt-4">
          <a-button
            type="primary"
            class="btn-result"
            size="large"
            @click="doNext"
          >
            결과보기
          </a-button>
        </div>
      </div>
    </a-layout>
  </main>
</template>

<script setup>
definePageMeta({
  layout: false,
});
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const item = ref();
const isLoading = ref(false);
const testAnswer = ref([]);

const category = computed(() => {
  return route.params.category;
});
const link = computed(() => {
  return route.params.link;
});

// const url = `/api/mind/play?link=${link.value}`;
const url = `${runtimeConfig.BASE_URL}/mind/content.php?link=${link.value}`;
const { data } = await useFetch(url);

const d = JSON.parse(data._rawValue);
item.value = d;
onMounted(() => {
  localStorage.setItem("mindpang-content-type", item.value.type);
});

const doNext = () => {
  if (testAnswer.length === 0) {
    alert("문항을 선택해주세요.");
    return false;
  }
  isLoading.value = true;
};

watch(testAnswer.value, (newTestAnswer) => {
  localStorage.setItem("mindpang-answer", JSON.stringify(newTestAnswer));
});

useHead({
  title: `${d.title} - 마인드팡`,
  link: [
    {
      rel: "canonical",
      href: `https://mindpang.com/${d.category}/${d.link}/play`,
    },
  ],
  meta: [
    {
      name: "description",
      content: d.description,
    },
    {
      name: "og:type",
      content: "website",
    },
    {
      name: "og:url",
      content: `https://mindpang.com/${d.category}/${d.link}/play`,
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
      content: d.title,
    },
    {
      name: "og:image",
      content: d.logo,
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
      content: d.title,
    },
    {
      name: "twitter:description",
      content: d.description,
    },
    {
      name: "twitter:image",
      content: d.logo,
    },
    {
      name: "apple-touch-icon",
      content: d.logo,
    },
  ],
});
</script>
