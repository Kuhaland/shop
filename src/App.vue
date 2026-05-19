<template>
  <div class="wrap">

    <h1>네이버 검색 결과 조회</h1>

    <input
        v-model="keyword"
        placeholder="키워드 입력"
    />

    <button @click="checkRank">
      검색
    </button>

    <div
        v-if="loading"
        class="loading"
    >
      조회중...
    </div>

    <div
        v-if="result.length"
        class="result"
    >
      <h2>검색 결과</h2>

      <div
          v-for="(item, idx) in result"
          :key="idx"
          class="item"
      >
        <div class="rank">
          {{ idx + 1 }}
        </div>

        <div class="content">

          <div class="title">
            {{ item.title || '제목 없음' }}
          </div>

          <a
              :href="item.href"
              target="_blank"
          >
            {{ item.href }}
          </a>

        </div>
      </div>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const keyword = ref('')

const loading = ref(false)

const result = ref([])

const checkRank = async () => {

  if (!keyword.value) {
    alert('키워드 입력')
    return
  }

  loading.value = true

  try {

    const res = await axios.post(
        'https://rank-api.onrender.com/api/rank/check',
        {
          keyword: keyword.value
        }
    )

    result.value = res.data.items || []

  } catch (e) {

    console.error(e)

    alert('API 오류')

  } finally {

    loading.value = false

  }
}
</script>

<style scoped>

.wrap {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}

input {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  height: 44px;
  border: 0;
  background: #03c75a;
  color: #fff;
  cursor: pointer;
}

.result {
  margin-top: 24px;
}

.item {
  display: flex;
  gap: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  margin-bottom: 12px;
}

.rank {
  font-size: 20px;
  font-weight: bold;
  color: #03c75a;
}

.title {
  font-weight: bold;
  margin-bottom: 6px;
}

a {
  color: #555;
  word-break: break-all;
}

</style>
