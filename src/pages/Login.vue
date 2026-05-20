<template>
  <div class="login-page">
    <!-- Content -->
    <div class="login-bg"></div>
    <!-- Content -->
    <div class="login-card">
      <!-- Title -->
      <div class="logo">ADMIN</div>
      <div class="title">관리자 로그인</div>
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
      <div class="copyright">Power by leehx78</div>
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
