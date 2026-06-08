<template>
  <div class="login-card">
      <!-- Title -->
      <div class="text-main">Hello,<br>Welcome Back</div>
      <div class="text-sub">Enter your id and password to access your account.</div>
      <!-- Content -->
      <div class="form-group">
        <!-- Content -->
        <div class="item-content">
          <text-field v-model="form.id"
                      type="text"
                      label="아이디"
                      placeholder="아이디를 입력해주세요"
                      label-type="floating"
          />
        </div>
        <!-- Content -->
        <div class="item-content">
          <text-field v-model="form.password"
                      type="password"
                      label="비밀번호"
                      placeholder="비밀번호를 입력해주세요"
                      label-type="floating"
                      @keyup.enter="onLogin"
          />
        </div>
      </div>
      <div class="login-options">
        <check-box v-model="data.isAgree"
                   label="아이디 기억"
        />
        <router-link to="/forgot-password" class="forgot-link">비밀번호를 잊어버리셨어요?</router-link>
      </div>
      <!-- Button -->
      <button class="login-btn" @click="onLogin">로그인</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import api from '@/api/axios'
import TextField from "@/components/unit/TextField.vue";
import CheckBox from "@/components/unit/CheckBox.vue";
import { useAlert } from '@/composables/useAlert'

const { alert } = useAlert()

const data = reactive({
  isAgree: false,
})

const form = reactive({
  id: '',
  password: '',
})

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
    alert('아이디 또는 비밀번호를 확인해주세요.')
  }
}
</script>

<style lang="scss" scoped>

</style>
