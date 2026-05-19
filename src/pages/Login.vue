<template>
  <div class="login-page">
    <div class="login-card">
      <!-- Content -->
      <div class="logo">ADMIN</div>
      <!-- Content -->
      <div class="title">관리자 로그인</div>
      <!-- Content -->
      <div class="form-group">
        <label>아이디</label>
        <input v-model="form.id"
               type="text"
               placeholder="아이디를 입력해주세요"
        />
      </div>
      <!-- Content -->
      <div class="form-group">
        <label>비밀번호</label>
        <input v-model="form.password"
               type="password"
               placeholder="비밀번호를 입력해주세요"
               @keyup.enter="onLogin"
        />
      </div>
      <!-- Content -->
      <button class="login-btn" @click="onLogin">로그인</button>
      <!-- Content -->
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
