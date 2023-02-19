const title = "마인드팡 - 재미있는 무료 테스트 모음";
const description =
  "마인드팡의 모든 테스트들은 무료로 즐길 수 있습니다. 드라마, 연예, 방송 등 다양한 테스트를 즐겨보세요.";
const logo =
  "https://f5game.s3.ap-northeast-2.amazonaws.com/f5game-test-logo.png";
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      BASE_URL: "https://f5game.co.kr/api",
    },
  },
  modules: [
    "@nuxtjs/tailwindcss",
    // [
    //   "@nuxtjs/google-adsense",
    //   {
    //     id: "ca-pub-9130836798889522",
    //   },
    // ],
  ],
  css: ["~/assets/css/style.css"],
  tailwindcss: {
    cssPath: "~/assets/css/tailwind.css",
    configPath: "tailwind.config",
    exposeConfig: false,
    injectPosition: 0,
    viewer: true,
  },
  plugins: ["@/plugins/antd"],
  app: {
    head: {
      htmlAttrs: { lang: "ko" },
      title: title,
      charset: "utf-8",
      viewport: "width=device-width, initial-scale=1",
      script: [
        // {
        //   src: "https://t1.kakaocdn.net/kakao_js_sdk/v1/kakao.min.js",
        // },
        // {
        //   src: "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9130836798889522",
        //   crossorigin: "anonymous",
        //   async: true,
        // },
        // {
        //   src: "//wcs.naver.net/wcslog.js",
        //   type: "text/javascript",
        // },
      ],
      link: [
        {
          rel: "canonical",
          href: "https://mindpang.com",
        },
      ],
      meta: [
        {
          name: "robots",
          content: "index, follow",
        },
        {
          name: "theme-color",
          content: "#E5BA73",
        },
        {
          name: "description",
          content: description,
        },
        {
          name: "og:type",
          content: "website",
        },
        {
          name: "og:url",
          content: "https://mindpang.com",
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
          content: title,
        },
        {
          name: "og:image",
          content: logo,
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
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
        {
          name: "twitter:image",
          content: logo,
        },
        {
          name: "apple-touch-icon",
          content: logo,
        },
      ],
    },
  },
});
