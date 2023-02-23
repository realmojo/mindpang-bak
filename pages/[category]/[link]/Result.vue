<template>
  <div>
    <a-layout class="test-layout">
      <div v-if="resultItem">
        <h1 class="pt-4 pb-4 text-2xl font-bold text-center result-title">
          {{ userName }}님 결과분석
        </h1>
        <nuxt-img
          v-if="resultItem.url"
          class="test-play-img"
          :src="resultItem.url"
          alt="logo"
          loading="lazy"
        />
        <div v-if="item.type === 'answer'" class="pt-4 text-2xl result-title">
          테스트 점수
          <span class="text-blue-600 font-bold mr-2"> {{ total }} 점 </span>
          (
          <span v-if="item.type === 'answer'">
            {{ totalCount }} / {{ contentTotalCount }}
          </span>
          )
        </div>
        <a-divider type="vertical" />

        <div class="test-result-text">
          <p v-for="(line, index) in textSplit" :key="index">
            {{ line }}
          </p>
        </div>
        <Share :item="item" :total="total" />
        <h2 class="text-xl font-bold">👉 다른 테스트 하러가기</h2>
        <AdsenseComplete
          v-if="item.adsenses?.result"
          :slotId="item.adsenses?.result"
        />
      </div>
      <TestList :recentlyItems="recentlyItems" />
    </a-layout>
  </div>
</template>

<script setup>
const item = ref({});
const runtimeConfig = useRuntimeConfig();
const resultItem = ref({});
const total = ref(0);
const totalCount = ref(0);
const contentTotalCount = ref(0);
const userName = ref("");
const recentlyItems = ref([]);
const textSplit = ref([]);

// const url = "/api/mind/recently";
const url = `${runtimeConfig.BASE_URL}/mind/recently.php`;
const { data } = await useFetch(url);
const d = JSON.parse(data._rawValue);
recentlyItems.value = d;

onMounted(() => {
  item.value = JSON.parse(localStorage.getItem("mindpang-test-item"));
  resultItem.value = JSON.parse(localStorage.getItem("mindpang-test-result"));
  if (item.value === undefined) {
    alert("올바르지 않은 경로입니다.");
    location.href = "/";
  } else {
    textSplit.value = resultItem.value.text.split("<br />");
    userName.value = localStorage.getItem("mindpang-name") || "";
    if (item.value.type !== "random") {
      const result = resultItem.value;
      const _totalCount = result.totalCount ? result.totalCount : 0;
      if (result === "") {
        location.href = "/";
      }
      const _contentTotalCount = item.value.contents.length;
      totalCount.value = Number(_totalCount);
      contentTotalCount.value = _contentTotalCount;
      const score = Math.ceil((_totalCount * 100) / _contentTotalCount);
      total.value = score;
    }
  }
});
</script>
