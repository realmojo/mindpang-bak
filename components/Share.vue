<template>
  <div class="pt-4">
    <h2 class="text-xl font-bold">👉 테스트 공유하기</h2>
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
        <nuxt-img
          src="https://f5game.s3.ap-northeast-2.amazonaws.com/twitter.png"
          alt="twitter-share-icon"
          style="width: 90px"
          loading="lazy"
        />
      </a>
    </div>
    <div
      class="facebook-share-button pt-1 inline"
      @click="shareFacebook(item.category, item.link, item.title)"
      style="cursor: pointer"
    >
      <nuxt-img
        src="https://f5game.s3.ap-northeast-2.amazonaws.com/facebook.png"
        alt="facebook-share-icon"
        style="width: 80px"
        loading="lazy"
      />
    </div>
    <div class="kakao-share-button inline" style="cursor: pointer">
      <button id="kakao-link-btn" @click="createKakaoButton(item)">
        <nuxt-img
          src="https://f5game.s3.ap-northeast-2.amazonaws.com/kakao.png"
          alt="kakao-share-icon"
          style="
            width: 70px;
            margin-top: 10px;
            margin-left: 10px;
            margin-right: 10px;
          "
          loading="lazy"
        />
      </button>
    </div>
    <div
      class="link-share-button inline pt-2"
      @click="copy(item.category, item.link)"
      style="cursor: pointer"
    >
      <nuxt-img
        src="https://f5game.s3.ap-northeast-2.amazonaws.com/link.png"
        alt="link-share-icon"
        style="width: 70px"
        loading="lazy"
      />
    </div>
  </div>
  <div class="mb-4">
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

const shareFacebook = (category, link, title) => {
  window.open(
    `https://www.facebook.com/sharer/sharer.php?u=https://mindpang.com/${category}/${encodeURIComponent(
      link
    )}&t=${title}`,
    "_blank",
    "width=600, height: 400"
  );
};

const success = () => {
  message.success("URL이 복사되었습니다.");
};
const copy = (category, link) => {
  success();
  var textarea = document.createElement("textarea");
  textarea.value = `https://mindpang.com/${category}/${link}`;

  document.body.appendChild(textarea);
  textarea.select();
  textarea.setSelectionRange(0, 9999); // 추가

  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const createKakaoButton = (item) => {
  // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
  if (window.Kakao) {
    const kakao = window.Kakao;
    // 중복 initialization 방지
    if (!kakao.isInitialized()) {
      // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
      kakao.init("4620ebc4c39b8b6bb94e0e471b33de8c");
    }
    // kakao.Link.createDefaultButton({
    kakao.Share.sendDefault({
      // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
      // container: "#kakao-link-btn",
      objectType: "feed",
      content: {
        title: item.title,
        description: item.description,
        imageUrl: item.logo,
        link: {
          mobileWebUrl: `https://mindpang.com/${item.category}/${item.link}`,
          webUrl: `https://mindpang.com/${item.category}/${item.link}`,
        },
      },
      buttons: [
        {
          title: "플레이 하기",
          link: {
            mobileWebUrl: `https://mindpang.com/${item.category}/${item.link}`,
            webUrl: `https://mindpang.com/${item.category}/${item.link}`,
          },
        },
      ],
    });
  }
};
</script>
