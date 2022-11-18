<template>
  <div>
    <h3>배지 데이터 생성용 TmpBadgeDataCreate.vue</h3>


    <form @submit.prevent="BadgeDataCreate">
      <label for="name">뱃지 이름 : </label>
      <input type="text" id="name" v-model='name'><br>

      <label for="before_get"> before_get/생성전 문구 : </label>
      <input type="text" id="before_get" v-model="before_get"><br>

      <label for="after_get"> after_get/생성 후 문구 : </label>
      <input type="text" id="after_get" v-model="after_get"><br>

      <label for="total_cnt"> total_cnt/뱃지 총 개수 : </label>
      <input type="number" id="total_cnt" v-model="total_cnt"><br>
      
      <input type="submit" value="데이터 생성">
    </form>

  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'TmpBadgeDataCreate',
  date() {
    return {
      name: '',
      before_get: '',
      after_get: '',
      total_cnt: 0,
    }
  },
  methods: {
    BadgeDataCreate() {
      const name = this.name
      const before_get = this.before_get
      const after_get = this.after_get
      const total_cnt = this.total_cnt

      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/badges/tmpDataCreate/`,
        data: {
          name,
          before_get,
          after_get,
          total_cnt,
        }
      })
      
    }
  }
}
</script>

<style>

</style>