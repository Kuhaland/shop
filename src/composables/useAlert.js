import { reactive, readonly } from 'vue'

// 전역 단일 알럿 상태
const state = reactive({
  visible: false,
  message: '',
})

let resolver = null

// 알럿 열기 — await 가능 (확인 누르면 resolve)
const open = (message = '') => {
  state.message = message
  state.visible = true

  return new Promise((resolve) => {
    resolver = resolve
  })
}

const close = () => {
  state.visible = false
  state.message = ''

  if (resolver) {
    resolver()
    resolver = null
  }
}

export function useAlert() {
  return {
    state: readonly(state),
    alert: open,
    close,
  }
}
