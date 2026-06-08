<template>
  <div class="login-card">
      <!-- Title -->
      <div class="text-main">Forgot<br>Password?</div>
      <div class="text-sub">가입하신 아이디를 입력하시면 비밀번호 재설정 링크를 보내드립니다.</div>
      <!-- Content -->
      <div class="form-group">
        <div class="item-content">
          <text-field v-model="form.id"
                      type="text"
                      label="아이디"
                      placeholder="아이디를 입력해주세요"
                      label-type="floating"
                      @keyup.enter="onSubmit"
          />
        </div>
      </div>
      <!-- Back -->
      <router-link to="/login" class="back-link">← 로그인으로 돌아가기</router-link>
      <!-- Button -->
      <button class="login-btn" @click="onSubmit">재설정 링크 보내기</button>
    </div>
</template>

<script setup>
import { reactive } from 'vue'
import api from '@/api/axios'
import TextField from '@/components/unit/TextField.vue'
import { useAlert } from '@/composables/useAlert'

const { alert } = useAlert()

const form = reactive({
  id: '',
})

const onSubmit = async () => {

  if (!form.id) {
    alert('아이디를 입력해주세요')
    return
  }

  try {

    await api.post('/auth/forgot-password', {
      id: form.id,
    })

    alert('비밀번호 재설정 링크를 전송했습니다.\n메일을 확인해주세요.')

  } catch (err) {

    console.error(err)
    alert('요청을 처리하지 못했습니다.\n잠시 후 다시 시도해주세요.')
  }
}
</script>

<style lang="scss" scoped>
.login-card{
  // 하단 그룹(돌아가기 + 버튼)을 카드 하단으로 밀고, 버튼 위 24px에 위치
  .back-link{
    margin-top: auto; margin-bottom: 24px;
    font-size: 14px; font-weight: 500; text-align: center; color: #bfbfbf;
    transition: color .2s ease;
    &:hover{ color: #ffffff;}
  }
  // 공통 .login-btn 의 margin-top:auto 를 무효화 (back-link 가 하단 정렬을 담당)
  .login-btn{ margin-top: 0;}
}
</style>
