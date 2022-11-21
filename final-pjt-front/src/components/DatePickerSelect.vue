<template>
  <div class='box1'>
    <h1>날짜선택 DatePickerSelect.vue</h1>
    <h3>{{datepicker}} // {{nowDate}} // {{nowTime}}</h3>
    <h3>선택 시간: {{selectedTimeData}} // 선택 상영관: {{selectedTheaterData}}</h3>
    <h3 v-if='selectedTheaterData'>모두 선택했다 사실 상영관 선택하면 모두 선택한거</h3>
    <h3 v-if='!selectedTheaterData'>모두 선택안했다</h3>
    <date-picker v-model="datepicker" valueType="YYYYMMDD"></date-picker>

    <TicketingTimeSelect
    v-if="possibleDate"
    @selectedTime='selectedTime'/>

    <TicketingTheaterSelect
    v-if='possibleTime'
    @selectedTheater='selectedTheater'/>
    

    

  </div>
</template>


<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';

import TicketingTimeSelect from '@/components/TicketingTimeSelect'
import TicketingTheaterSelect from '@/components/TicketingTheaterSelect'



export default {  
  name: 'DatePickerSelect',
  components: {
    DatePicker,
    TicketingTimeSelect,
    TicketingTheaterSelect,
  },
  data() {
      return {
        datepicker: null,
        nowDate: '',    
        nowTime: '',
        selectedTimeData: 0,
        selectedTheaterData: 0,

        timeAndtheaterData: null,

        DTT: {
          time: this.selectedTimeData,
          theater: this.selectedTheaterData,
          date: this.datepicker,
        },
      };
  },

  methods: {
    // 현재 시간 뽑기
    setNowTimes () {
      let myDate = new Date() 
      let yy = String(myDate.getFullYear())  
      let mm = myDate.getMonth() + 1 
      let dd = String(myDate.getDate() < 10 ? '0' + myDate.getDate() : myDate.getDate())
      let hou = String(myDate.getHours() < 10 ? '0' + myDate.getHours() : myDate.getHours())
      let min = String(myDate.getMinutes() < 10 ? '0' + myDate.getMinutes() : myDate.getMinutes())
      this.nowDate = yy+mm+dd
      this.nowTime = hou+min
    },

    selectedTime(timedata) {
      this.selectedTimeData = timedata
    },
    selectedTheater(theaterdata) {
      this.selectedTheaterData = theaterdata
    },
    clearTimeTheater() {
      this.selectedTimeData = 0
      this.selectedTheaterData = 0
      // this.$store.dispatch('clearReversedSeat')
      this.$emit('reqClearResSeat')
    },
    clearTheater() {
      this.selectedTheaterData = 0
      // this.$store.dispatch('clearReversedSeat')
      this.$emit('reqClearResSeat')
    }
  },

  computed: {
    // 선택한 날짜가 오늘 이후 인가
    possibleDate() {
      this.clearTimeTheater() // 재선택시 시간, 상영관 초기화
      return this.datepicker >= this.nowDate
    },
    // 선택한 시간이 30분 이후 이내 들어가는지
    possibleTime() {
      this.clearTheater() // 시간 재선택시 상영관 초기화
      return this.datepicker+this.selectedTimeData >= Number(this.nowDate + this.nowTime) + 30
    },
  },

  mounted () {
    this.timer = setInterval(() => {    
    this.setNowTimes()  
  },1000)},

  updated() {
    const payload = {
      time: this.selectedTimeData,
      theater: this.selectedTheaterData,
      date: this.datepicker,
    }
    this.$emit('sendData', payload)
  }


}
</script>

<style>
.box1 {
  border: 2px solid rgb(1, 1, 1);
}
</style>