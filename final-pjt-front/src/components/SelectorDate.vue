<template>
  <div>
    <h5> 예매 지역, 날짜 선택 창 SelectorDate.vue</h5>
    {{ movieId }}
    <div class='box'>
    상영관 선택창
    <span class='box2'>1번 상영관</span>
    <span class='box2'>2번 상영관</span>
    <span class='box2'>3번 상영관</span>
    </div>
    <div class='box'>
    날짜선택창
    
    </div>
    <div class='box'>
    시간 선택창
    <span class='box2'> 아침 </span>
    <span class='box2'> 점심 </span>
    <span class='box2'> 저녁 </span>
    </div>

  <div>
  테스트 창
  <div id="paginator">ddd</div>
  </div>


  </div>
</template>

<script>


export default {
  name: 'SelectorDate',
  props: {
    movieId: Number,
  }
}
</script>

<style>
.box {
  width : auto;
  height: auto;
  background-color: #11c957;
  border: 3px solid red;
}

.box2 {
  margin-left: 1rem;
  width : auto;
  height: auto;
  background-color: #625bd8;
  border: 3px solid rgb(13, 9, 9);
}



</style>