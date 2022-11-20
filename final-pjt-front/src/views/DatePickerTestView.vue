<template>
  <div>
    <h1>데이트 피커 테스트 DatePickerTestView.vue</h1>
    <date-picker v-model="datepicker" valueType="YYYYMMDD"></date-picker>
    {{datepicker}}

    <hr>
    {{ nowDate }}
    <hr>
    {{nowTime}}
  </div>
</template>


<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';


export default {  
  name: 'DatePickerTestView',
  components: {
    DatePicker
  },
  data() {
      return {
        datepicker: null,

        timer: null,    
        nowWeek: '',    
        nowDate: '',    
        nowTime: '',
      };
  },

  methods: {
    setNowTimes () {
      let myDate = new Date() 
      // let wk = myDate.getDay()  
      let yy = String(myDate.getFullYear())  
      let mm = myDate.getMonth() + 1 
      let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      this.nowDate = yy+mm+dd
      this.nowTime = hou+min
    }
  },
  mounted () {
    this.timer = setInterval(() => {    
    this.setNowTimes()  
  },1000)} 

}
</script>

<style>

</style>