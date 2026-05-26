<template>
  <div class="login-page">
    <!-- Content -->
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
      <!-- Background -->
      <div class="video-wrap">
        <iframe src="https://player.vimeo.com/video/1194309735?background=1&autoplay=1&loop=1&muted=1"
                frameborder="0"
                allow="autoplay; fullscreen; picture-in-picture"
        />
      </div>
    </div>
    <!-- Content -->
    <div class="login-card">
      <!-- Title -->
      <div class="text-main">Hello,<br>Welcome Back</div>
      <div class="text-sub">Enter your id and password to access your account.</div>
      <!-- Content -->
      <div class="form-group">
        <!-- Content -->
        <div class="item-content">
          <label>아이디</label>
          <input v-model="form.id"
                 type="text"
                 placeholder="아이디를 입력해주세요"
          />
        </div>
        <!-- Content -->
        <div class="item-content">
          <label>비밀번호</label>
          <input v-model="form.password"
                 type="password"
                 placeholder="비밀번호를 입력해주세요"
                 @keyup.enter="onLogin"
          />
        </div>
      </div>
      <!-- Button -->
      <button class="login-btn" @click="onLogin">로그인</button>
      <p v-if="errorMessage" class="error-text">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import api from '@/api/axios'

const form = reactive({
  id: '',
  password: '',
})

const errorMessage = ref('')

const onLogin = async () => {

  try {

    const res = await api.post('/auth/login', {
      id: form.id,
      password: form.password,
    })

    localStorage.setItem(
        'token',
        res.data.token
    )

    console.log(res.data)

  } catch (err) {

    console.error(err)
  }
}
</script>

<style lang="scss" scoped>

</style>
