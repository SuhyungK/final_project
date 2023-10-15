# 🎥 영화 사이트 

📌 SSAFY 8기 1학기 관통 프로젝트 

현재 상영중인 영화의 예고편들을 보고  
예매까지 유도할 수 있는 페이지를 만들자!

## Contents 
- [Introduction](https://github.com/SuhyungK/final_project/tree/master#introduction)
  - [핵심 기능](https://github.com/SuhyungK/final_project/tree/master#핵심-기능)
  - [서비스 화면](https://github.com/SuhyungK/final_project/tree/master#서비스-화면)
  - [페이지](https://github.com/SuhyungK/final_project/tree/master#둘러보기)
- [Development](https://github.com/SuhyungK/final_project/tree/master#development)
  - [기술 스택](https://github.com/SuhyungK/final_project/tree/master#기술-스택)
  - [ERD](https://github.com/SuhyungK/final_project/tree/master#ERD)
  - [컴포넌트 구조](https://github.com/SuhyungK/final_project/tree/master#컴포넌트-구조)
  - [팀 소개](https://github.com/SuhyungK/final_project/tree/master#팀-소개)
- [Get Started](https://github.com/SuhyungK/final_project/tree/master#get-started)
- [회고](https://github.com/SuhyungK/final_project/tree/master#회고)



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

1. 뱃지 시스템 


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
|<img src="https://github.com/SuhyungK/final_project/assets/97926368/ec9dbe9d-5d8f-4d2b-9fd3-b43671351010" />|<img src="https://github.com/SuhyungK/final_project/assets/97926368/fb7a85c9-f4dc-460e-9195-1fa3029c945b" /> |
|---|---|
- 결과가 여러개일 경우 목록형/갤러리형 택 1하여 여러 개의 결과 페이지
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

### 얻은 점

- 데스크탑, 노트북, 모바일 등 반응형 UI 설계 과정을 경험하여 이에 대한 역량을 쌓을 수 있었음
- ERD 구상/설계 과정을 통해 Model 간의 관계를 이해하고 이를 활용한 API 설계 역량을 쌓을 수 있었음
- Client - Server 간 웹 데이터 통신 과정에 대해 이해할 수 있었고, 이 과정에서 Javascript의 비동기 개념을 확실하게 이해하고 로직을 설계할 수 있는 역량을 쌓을 수 있었음
- 프로젝트의 전반적인(기획/설계/개발) 과정을 통해 웹 서비스의 동작 과정에 대해 이해할 수 있었음


### 개선할 점

- Git Issue, Branch 전략 등을 활용하여 협업의 유용성 높이기
- ERD 설계 투자 시간 높이기 
- MVP 위주의 개발 & 유지보수하며 부가 기능 개발
- AWS EC2 활용한 실제 배포 


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