<template>
  <!-- 로그인/비밀번호찾기 공용 배경 레이아웃 (라우트 이동 시에도 유지되어 영상이 끊기지 않음) -->
  <div class="login-page">
    <!-- Background -->
    <div class="login-bg">
      <!-- Logo -->
      <div class="logo"></div>
      <!-- Text -->
      <div class="review-text">
        <strong class="review-text-quote">
          “매장 운영 흐름이 훨씬 정돈됐어요.<br>
          주문부터 재고 관리까지 한 번에 가능합니다.”
        </strong>
        <div class="review-text-author">
          <span class="name">에밀리 카터</span>
          <span class="position">F&B 운영 매니저</span>
        </div>
      </div>
      <div class="overlay"></div>
      <!-- Video -->
      <div class="video-wrap">
        <iframe src="https://player.vimeo.com/video/1194309735?background=1&autoplay=1&loop=1&muted=1"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>
    </div>

    <!-- 카드(페이지별 콘텐츠) -->
    <slot />
  </div>
</template>

<script setup>
defineOptions({ name: 'AuthLayout' })
</script>
