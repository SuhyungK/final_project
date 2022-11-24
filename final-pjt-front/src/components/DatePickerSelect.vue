<template>
  <div class='my-4'>
    <!-- <h1>날짜선택 DatePickerSelect.vue</h1> -->
    <div class='datepickerbox'>
      <br><span v-show='vshow'>{{selectedTheaterData}}</span><br><br><br><br><br><br>
      <h2 v-if='!datepicker'>날짜를 선택해주세요</h2>
      <h2 v-if='datepicker && !possibleDate'>예매가능한 시간이 아닙니다 다시 선택해주세요</h2>
      <br>
      <date-picker v-model="datepicker" valueType="YYYYMMDD"></date-picker>
    </div>
    <!-- <h3>{{datepicker}} // {{nowDate}} // {{nowTime}}</h3>
    <h3>선택 시간: {{selectedTimeData}} // 선택 상영관: {{selectedTheaterData}}</h3> -->
    <!-- <h3 v-if='selectedTheaterData'>모두 선택했다 사실 상영관 선택하면 모두 선택한거</h3>
    <h3 v-if='!selectedTheaterData'>모두 선택안했다</h3> -->

    <TicketingTimeSelect
    v-if="possibleDate"
    @selectedTime='selectedTime'/>
    <!-- {{DTT.theater}} // {{selectedTheaterData}} -->

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
        vshow: false,
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
      console.log(theaterdata, '관 선택된데 올라옴(여기는 datepicker')
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
    selectedTheaterDataa() {
      return this.selectedTheaterData
    }
  },

  mounted () {
    this.timer = setInterval(() => {    
    this.setNowTimes()  
  },1000)},

  updated() {
    // console.log(this.selectedTheaterData)
    const payload = {
      time: this.selectedTimeData,
      theater: this.selectedTheaterData,
      date: this.datepicker,
    }
    console.log('업데이트로 발동됨', payload)
    this.$emit('sendData', payload)
  }


}
</script>

<style>
  .datepickerbox {
    margin-top: 100px;
    height: 300px;
    width: auto;
  }
</style>