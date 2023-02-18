<template>
  <footer>
    <div class="footer-info first">
      <a
        @click="doGTranslate('ko|en')"
        href="#"
        title="English"
        class="gflag nturl"
        style="background-position: -0px -0px"
      >
        <img
          src="//gtranslate.net/flags/blank.png"
          height="24"
          width="24"
          alt="English"
        />
      </a>
      <a
        href="#"
        @click="doGTranslate('ko|ja')"
        title="Japanese"
        class="gflag nturl"
        style="margin-left: 8px; background-position: -700px -100px"
      >
        <img
          src="//gtranslate.net/flags/blank.png"
          height="24"
          width="24"
          alt="Japanese"
        />
      </a>
    </div>
    <div class="footer-info">
      @Copyright 2023. 마인드팡. All rights reserved
    </div>
  </footer>
</template>
