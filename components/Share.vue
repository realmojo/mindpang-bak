<template>
  <div class="pt-4">
    <h2 class="px-2 text-xl font-bold">👉 테스트 공유하기</h2>
  </div>
  <div class="flex justify-center px-4 pt-4 pb-4">
    <div class="twitter-share-button inline" style="cursor: pointer">
      <a
        :href="`https://twitter.com/intent/tweet?text=${
          item.title
        }%0A----------------%0A테스트 결과 점수 ${total}점%0Ahttps://mindpang.com/${
          item.category
        }/${encodeURI(encodeURI(item.link))}%0A#테스트결과 #마인드팡`"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src="https://f5game.s3.ap-northeast-2.amazonaws.com/twitter.png"
          alt="twitter-share-icon"
          style="width: 90px"
        />
      </a>
    </div>
    <div
      class="facebook-share-button pt-1 inline"
      @click="shareFacebook"
      style="cursor: pointer"
    >
      <img
        src="https://f5game.s3.ap-northeast-2.amazonaws.com/facebook.png"
        alt="facebook-share-icon"
        style="width: 80px"
      />
    </div>
    <div class="kakao-share-button inline" style="cursor: pointer">
      <button id="kakao-link-btn">
        <img
          src="https://f5game.s3.ap-northeast-2.amazonaws.com/kakao.png"
          alt="kakao-share-icon"
          style="
            width: 70px;
            margin-top: 10px;
            margin-left: 10px;
            margin-right: 10px;
          "
        />
      </button>
    </div>
    <div
      class="link-share-button inline pt-2"
      @click="copy"
      style="cursor: pointer"
    >
      <img
        src="https://f5game.s3.ap-northeast-2.amazonaws.com/link.png"
        alt="link-share-icon"
        style="width: 70px"
      />
    </div>
  </div>
  <div class="px-4 mb-4">
    <a href="https://pf.kakao.com/_lxdYWxj">
      <a-button class="btn-kakao-plus" size="large">
        카카오톡 플친 추가
      </a-button>
    </a>
  </div>
</template>

<script setup>
import { message } from "ant-design-vue";

const { item, total } = defineProps({
  item: Object,
  total: Number,
});

const shareFacebook = () => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=https://mindpang.com/${
      item.category
    }/${encodeURIComponent(item.link)}&t=${item.title}`,
    "_blank",
    "width=600, height: 400"
  );
};

const success = () => {
  message.success("URL이 복사되었습니다.");
};
const copy = () => {
  success();
  var textarea = document.createElement("textarea");
  textarea.value = `https://mindpang.com/${item.category}/${item.link}`;

  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999); // 추가

  document.execCommand("copy");
  document.body.removeChild(textarea);
};
</script>
