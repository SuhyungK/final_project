# 🎥 영화 사이트 

📌 SSAFY 8기 1학기 관통 프로젝트 

현재 상영중인 영화의 예고편들을 보고  
예매까지 유도할 수 있는 페이지를 만들자!

## Contents 
- [Introduction](https://github.com/SuhyungK/final_project/tree/master#introduction)
  - [기술 스택](https://github.com/SuhyungK/final_project/tree/master#기술-스택)
  - [서비스 화면](https://github.com/SuhyungK/final_project/tree/master#핵심-기능)
  - [페이지](https://github.com/SuhyungK/final_project/tree/master#둘러보기)
- [Development](https://github.com/SuhyungK/final_project/tree/master#development)
  - [ERD](https://github.com/SuhyungK/final_project/tree/master#ERD)
  - [컴포넌트 구조](https://github.com/SuhyungK/final_project/tree/master#컴포넌트-구조)
  - [팀 소개](https://github.com/SuhyungK/final_project/tree/master#팀-소개)
- [Get Started](https://github.com/SuhyungK/final_project/tree/master#get-started)
- [회고](https://github.com/SuhyungK/final_project/tree/master#회고)


## 서비스 소개 



## 핵심 기능
1. 영화 추천 
   
```python
def algorithm(request):
    movies = get_list_or_404(Movie)
    me = request.user
    prefer = defaultdict(int)
    already_like = []
    for movie in me.like_movie.all():
        already_like.append(movie.pk)
        res = json.loads(movie.genres) # 문자열 제이슨을 제이슨으로
        for genre in res['result']:
            prefer[genre['genre']] += 1 # 내가 본 장르를 prefer에 추가

    movie_list = []
    for movie in movies:
        if movie.pk in already_like: # 본영화는 패스
            continue

        score = movie.vote_average * 0.3 # 평점 가중치 0.3
        res = json.loads(movie.genres)
        for genre in res['result']:
            score += prefer[genre['genre']] * 0.4 # 내가 본 장르 가중치 0.4

        data = movie.release_date
        score += releaseDate(data) * 0.2 # 최신 영화 가중치 0.2

        movie_list.append([score, movie.pk])

    movie_list.sort(reverse=True)

    my_movie = []
    for s, i in  movie_list[:10]:
        rec_movie = Movie.objects.get(pk=i)
        my_movie.append(Movie.objects.get(pk=i))

    serializer = MovieSerializer(my_movie, many=True)

    return Response(serializer.data, status=status.HTTP_201_CREATED)
```

사용자가 예매한 영화정보를 바탕으로 가중치를 계산한다.
가중치: 영화평점 0.3 // 내가 본 장르들 0.4 // 개봉일자 0.2

1. 사용자가 본 영화를 가지고 장르를 카운트해준다.
   
   ```python
       already_like = []
       for movie in me.like_movie.all():
           already_like.append(movie.pk)
           res = json.loads(movie.genres) # 문자열 제이슨을 제이슨으로
           for genre in res['result']:
               prefer[genre['genre']] += 1 # 내가 본 장르를 p
   ```

2. DB 저장되어 있는 모든 영화를 순회하면서 이미 예매한 적이 있는 영화면 넘기고 아니라면 가중치를 적용하고 (점수, 영화 pk ) 의 튜플 형태로 리스트에 저장한다.
   
       movie_list = []
       for movie in movies:
           if movie.pk in already_like: # 본영화는 패스
               continue
       
           score = movie.vote_average * 0.3 # 평점 가중치 0.3
           res = json.loads(movie.genres)
           for genre in res['result']:
               score += prefer[genre['genre']] * 0.4 # 내가 본 장르 가중치 0.4
       
           data = movie.release_date
           score += releaseDate(data)

 3. 위에서 저장해서 내려온 리스트를 내림차순으로 정렬하고 10개를 슬라이싱을 한다. 그 후 리스트에 담긴 영화pk 값으로 전체 영화정보를 추출하여 리턴한다

```python
 movie_list.sort(reverse=True) 
my_movie = []
 for s, i in movie_list[:10]:
 rec_movie = Movie.objects.get(pk=i)
 my_movie.append(Movie.objects.get(pk=i)) 
serializer = MovieSerializer(my_movie, many=True) 
return Response(serializer.data)
```

2. 영화 예매하기

영화 예매의 순서는 영화선택 -> 날짜(년월일) -> 영화시간 -> 상영관 -> 좌석선택 순서로만 이루어 질 수 있도록 한다.

예매 페이지는 영화의 pk 값을 router params 로 가져가기 때문에 영화선택 부분은 해결 된다.

날짜, 시간, 상영관은 각각 해당되는 테그에 `v-if`문을 이용하여 전단계의 값이 선택되었을 때만 활성화되도록 하여 순서를 지킬 수 있도록 한다.

그렇게 함으로서 상영관 선택값이 존재할 경우(선택되었을 경우)에만 좌석 선택 컴포넌트가 나올 수 있게 한다. 

좌석 각각의 식별값은 행(i)과 열(j)로서 생성되며 결제까지 진행한 부분은 Django DB에 저장했다. 

![](C:\Users\gbj\AppData\Roaming\marktext\images\2022-11-24-19-26-47-image.png)

위의 모델에서 영화 시간 식별자로 특정 영화의 시간대, 상영관의 좌석정보를 불러봐 이미 DB에 저장된 값이라면 클릭을 막아놓아서 좌석 선택이 되지 않게 만들었다.



![](C:\Users\gbj\AppData\Roaming\marktext\images\2022-11-24-19-35-42-image.png)

그렇게 정해진 영화 예매정보(영화, 날짜, 시간, 좌석) 을 유저와 연결지은 모델(Reservation)을 만들어 후에 유저가 예약한 영화 정보를 쉽게 확인할 수 있도록 했다.

3. 뱃지 시스템 


 예매한 영화의 개수, 작성한 리뷰의 개수, 사용자를 팔로우한 수에 따라 상징적인 보상을 줌으로서 웹사이트 활동에 집중할 수 있게 하기위해 만들었다.



뱃지종류는 총 9개로 먼저 전체 뱃지목록을 만들고 유저가 생성(회원가입)될때마다 그 목록을 유저와 연결 지어 테이블을 생성했다. 필드에는 획득 여부를 가르키는 필드를 하나 만들어 유저가 그 뱃지를 획득했는지 안했는지를 DB 에 저장하였다.

![](C:\Users\gbj\AppData\Roaming\marktext\images\2022-11-24-21-09-23-image.png)


![](C:\Users\gbj\AppData\Roaming\marktext\images\2022-11-24-21-23-28-image.png)

유저가 생성된후 실행되는 함수 1~9 의 pk 값을 가지는 BadgeList 의 값이 유저와 연결되어 Badge 에 저장된다.


## 서비스 화면

### 메인 페이지
- 최신 영화 예고편 보기
- 가장 인기 있는 최신 영화 TOP 10 목록 보기
- 가장 인기 있는 리뷰들 모아보기
  
### 영화 검색
- 결과가 여러개일 경우 목록으로 이동
- 결과가 한 가지일 경우 영화 상세 페이지로 이동

### 영화 상세 페이지
|<img src="https://github.com/SuhyungK/final_project/assets/97926368/ab5f6886-d875-4a19-b267-41f2580d7972" width="1600"/>|<img src="https://github.com/SuhyungK/final_project/assets/97926368/94e36073-189e-4202-9651-59e405951719" /> |
|---|---|
- 영화 상세 정보 나타내는 페이지
- 리뷰 쓰기

### 마이 페이지 
- 현재까지 예매한 영화 정보 보기
- 현재까지 받은 뱃지 정보 보기
- 영화 취향 보기

### 시작 페이지 
|<img src="https://github.com/SuhyungK/final_project/assets/97926368/88d063cb-c7ee-42e8-bb49-b3b1f264c967" width="100%">|<img src="https://github.com/SuhyungK/final_project/assets/97926368/20c6c5a6-bb40-414a-9eec-ca30196b4579" width="100%">|
|---|---|

- 로그인 유저만 서비스를 이용 가능
- 메인 페이지에서 바로 회원가입 유도
- 랜덤으로 변경되는 배경 이미지

<!-- |![](https://github.com/SuhyungK/_Algorithm/assets/97926368/1a1cb117-7fdc-4868-a754-d322c5c38013)|내용|
|------|---|
|테스트1|테스트2|
|테스트1|테스트2|
|테스트1|테스트2| -->

## Development

### 기술 스택
- Vue.js
- Vuex
- Django
- SQLite3
- Bootstrap
- Javascript
- Python3
  
### ERD

![Untitled Diagram drawio](https://github.com/SuhyungK/final_project/assets/97926368/384635fb-b493-4167-bacc-75d9201fc60c)

### 컴포넌트 구조

### 팀 소개

<div align="center">
  <table>
    <tr>
      <th></th>
      <th><a href="https://github.com/SuhyungK"><img src="https://github.com/SuhyungK.png" width="200" /></a></th>
      <th><a href="https://github.com/gobeul"><img src="https://github.com/gobeul.png" width="200"/></a></th>
    </tr>
    <tr>
      <td>
       <b>프론트엔드</b>
      </td>
      <td>
       <li>디자인 레퍼런스 수집</li>
       <li>페이지 레이아웃 설계</li>
      </td>
      <td>
        <li>기획 및 데이터베이스 설계</li>
      </td> 
    </tr>
    <tr>
      <td>
        <b>백엔드</b>
      </td>
      <td>
        <li>영화 리뷰 작성 API</li>
      </td>
      <td>
        <li>API 설계</li>
        <li>뱃지 시스템 구현</li>
      </td>
    </tr>
  </table>
</div>



## 회고

1.  프로젝트 시작전에 ERD 를 구상해보면서 모델간 관계들이 pk 값으로 어떻게 연결되어 서로를 호출 할 수 있는지에 대해서 확실하게 알게 되었다.

2. serializer 의 직렬화 에 대해서 그리고 JSON 파일이 백과 프론트를 이동하는 부분에대해 아직까지 정확한 개념은 모호하지만 데이터를 서로 어떠헥 주고받는지 알 수 있는 부분이었다.

3. 마냥 좋을 줄 알았던 자바스크립트의 비동기처리가 골치였던 경우가 너무 많았고 이를 해결하면서 어떻게해야 내가 원하는 방향대로 로직이 실행되는지를 배울 수 있었다.

4. 정말 많은 오류를 접했는데 그러한 오류가 어디서 발생하는지 무엇때문에 발생하는지 그리고 그러한 점들을 해결할 수 있었던 해결력을 습득할 수 있었다.



### 개선할 점

- Git 

1. 모델간의 이해 관계를 구상하는 부분이 어려웠다. 이때문에 처음 ERD 구성에 시간을 많이 투자했음에도 프로젝트를 진행하면서 대부분의 모델이 수정 되었다.
   
   
2. 영화 예매정보를 가지고 좀 더 많은 것을 진행하지 못했던 점이 아쉽다. 사용할려고 만들어 놓은 필드는 많은데 정작 사용한 속성은 몇 되지 않는다.
   
   
3. 막힌 문제 해결을 위해 구글링에만 너무 의존했던 점이 아쉽다. 구글링 외에도 주변 동기들에게 물어봤다면 더 빠르고 확실하게 문제를 이해하고 해결했을 수 있을 것 같다.
   
   
4.  깃을 제대로 활용하지 못했던 점이 아쉽다. 깃을 활용해서 협업할 수 있었다면 더 효율적으로 진행되었을 것 같다. 
    
5. 실제 배포까지 이루어지지 못했던 부분이 아쉬웠다.


accounts app 모델(User)

![](C:\Users\gbj\AppData\Roaming\marktext\images\2022-11-25-00-22-49-image.png)


badges app 모델(Badge, BadgeList)

![](C:\Users\gbj\AppData\Roaming\marktext\images\2022-11-25-00-23-29-image.png)



ticketings app 모델(MovieTimeTheater, Reservation, SeatInformation)

![](C:\Users\gbj\AppData\Roaming\marktext\images\2022-11-25-00-24-49-image.png)


전체 ERD

![erd_최종.jpg](C:\Users\gbj\Desktop\erd_최종.jpg)

## Get Started

### Client
```
$ git clone https://github.com/SuhyungK/final_project.git
$ cd final_project
$ cd final-pjt-front
$ npm install 
$ npm run serve
```

### Server
- Mac OS
```
$ git clone https://github.com/SuhyungK/final_project.git
$ cd final_project
$ cd final-pjt-back
$ python3 -m venv venv
$ source venv/bin/activate
$ python3 -m pip install -r requirements.txt
```

- Windows 10
```
$ git clone https://github.com/SuhyungK/final_project.git
$ cd final_project
$ cd final-pjt-back
$ python -m venv venv
$ source venv/Scripts/activate
$ pip install -r requirements.txt
```