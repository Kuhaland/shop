<template>
  <div class="login-page">
    <div class="login-card">
      <div class="logo">ADMIN</div>

      <div class="title">
        관리자 로그인
      </div>

      <div class="form-group">
        <label>아이디</label>
        <input
            v-model="form.id"
            type="text"
            placeholder="아이디를 입력해주세요"
        />
      </div>

      <div class="form-group">
        <label>비밀번호</label>
        <input
            v-model="form.password"
            type="password"
            placeholder="비밀번호를 입력해주세요"
            @keyup.enter="onLogin"
        />
      </div>

      <button
          class="login-btn"
          @click="onLogin"
      >
        로그인
      </button>

      <p
          v-if="errorMessage"
          class="error-text"
      >
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const form = reactive({
  id: '',
  password: '',
})

const errorMessage = ref('')

const onLogin = () => {

  errorMessage.value = ''

  if (!form.id) {
    errorMessage.value = '아이디를 입력해주세요.'
    return
  }

  if (!form.password) {
    errorMessage.value = '비밀번호를 입력해주세요.'
    return
  }

  console.log('LOGIN', form)

  /*
    axios 로그인 예시

    await axios.post('/api/login', {
      id: form.id,
      password: form.password
    })
  */
}
</script>

<style scoped>
.login-page{
  display:flex;
  justify-content:center;
  align-items:center;

  width:100%;
  min-height:100vh;

  background:#f4f7fb;
}

.login-card{
  width:100%;
  max-width:420px;

  padding:48px 40px;

  border-radius:24px;
  background:#ffffff;

  box-shadow:
      0 10px 30px rgba(0,0,0,0.08);
}

.logo{
  margin-bottom:12px;

  font-size:32px;
  font-weight:800;
  text-align:center;

  color:#2563eb;
}

.title{
  margin-bottom:36px;

  font-size:24px;
  font-weight:700;
  text-align:center;

  color:#111827;
}

.form-group{
  margin-bottom:20px;
}

.form-group label{
  display:block;

  margin-bottom:8px;

  font-size:14px;
  font-weight:600;

  color:#374151;
}

.form-group input{
  width:100%;
  height:52px;

  padding:0 16px;

  border:1px solid #d1d5db;
  border-radius:14px;

  outline:none;

  font-size:15px;

  transition:0.2s;
}

.form-group input:focus{
  border-color:#2563eb;

  box-shadow:
      0 0 0 4px rgba(37,99,235,0.12);
}

.login-btn{
  width:100%;
  height:54px;

  margin-top:8px;

  border:none;
  border-radius:14px;

  background:#2563eb;
  color:#ffffff;

  font-size:16px;
  font-weight:700;

  cursor:pointer;

  transition:0.2s;
}

.login-btn:hover{
  background:#1d4ed8;
}

.error-text{
  margin-top:16px;

  font-size:14px;
  text-align:center;

  color:#ef4444;
}
</style>
