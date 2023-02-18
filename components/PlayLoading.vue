<template>
  <div>
    <h1 class="text-3xl font-bold text-center pt-8 loading-title">
      <span v-if="isLoading">결과를 분석하고 있습니다</span>
      <span v-else>결과를 확인해 주세요</span>
    </h1>
    <div v-if="isLoading" class="text-center pt-4 mb-2">
      <a-spin size="large" />
    </div>
    <div v-else>
      <div class="text-center flex flex-col justify-center px-4 mt-4">
        <AdsenseLoading :slotId="slotId" />
      </div>

      <NuxtLink :to="`/${item.category}/${item.link}/result`">
        <a-button
          class="btn-mindpang"
          size="large"
          @click="doConfirm"
          style="display: flex; justify-content: center"
        >
          결과 확인하기
        </a-button>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const { item, testAnswer, slotId } = defineProps({
  item: Object,
  testAnswer: Array,
  slotId: String,
});
const isLoading = ref(true);

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

onMounted(() => {
  let totalCount = 0;
  localStorage.setItem("mindpang-test-item", JSON.stringify(item));
  if (item.contents.length > 0) {
    for (const i in item.contents) {
      if (item.type === "answer") {
        if (item.contents[i].answer === testAnswer[i]) {
          totalCount++;
        }
      } else if (item.type === "score") {
        if (
          item.contents[i].questions[testAnswer[i]] &&
          item.contents[i].questions[testAnswer[i]].score
        ) {
          totalCount += item.contents[i].questions[testAnswer[i]].score;
        }
      }
    }

    let results = null;
    if (item.type === "random") {
      const ran = getRandomNumber(0, item.results.length - 1);
      localStorage.setItem(
        "mindpang-test-result",
        JSON.stringify({ ...item.results[ran], totalCount })
      );
    } else {
      for (const i in item.results) {
        if (
          item.results[i].min <= totalCount &&
          totalCount <= item.results[i].max
        ) {
          results = item.results[i];
          localStorage.setItem(
            "mindpang-test-result",
            JSON.stringify({ ...results, totalCount })
          );
        }
      }
    }
  }

  setTimeout(() => {
    isLoading.value = false;
  }, 3000);
});

const doConfirm = () => {};
</script>
