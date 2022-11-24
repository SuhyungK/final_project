# PJT



### 기획의도

우리 홈페이지를 통해 현재 상영중인 영화들의 영화 예매를 유도할 수 있는 페이지를 만들자!



### MVP

1. 영화 추천 알고리즘

2. 영화 예매 기능

3. 뱃지(도전과제) 시스템

4. CRUD



### MVP 기능설명

#### 1. 영화 추천 알고리즘

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
   
   ```python
   
       
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
   ```
   
   

    3.  위에서 저장해서 내려온 리스트를 내림차순으로 정렬하고 10개를 슬라이싱을 한다. 그 후 리스트에 담긴 영화pk 값으로 전체 영화정보를 추출하여 리턴한다.

```python
    movie_list.sort(reverse=True)

    my_movie = []
    for s, i in  movie_list[:10]:
        rec_movie = Movie.objects.get(pk=i)
        my_movie.append(Movie.objects.get(pk=i))

    serializer = MovieSerializer(my_movie, many=True)

    return Response(serializer.da
```





#### 2. 영화 예매기능

영화 예매의 순서는 영화선택 -> 날짜(년월일) -> 영화시간 -> 상영관 -> 좌석선택 순서로만 이루어 질 수 있도록 한다.



예매 페이지는 영화의 pk 값을 router params 로 가져가기 때문에 영화선택 부분은 해결 된다.

날짜, 시간, 상영관은 각각 해당되는 테그에 `v-if`문을 이용하여 전단계의 값이 선택되었을 때만 활성화되도록 하여 순서를 지킬 수 있도록 한다.

그렇게 함으로서 상영관 선택값이 존재할 경우(선택되었을 경우)에만 좌석 선택 컴포넌트가 나올 수 있게 한다. 

좌석 각각의 식별값은 행(i)과 열(j)로서 생성되며 결제까지 진행한 부분은 Django DB에 저장했다. 

<img src="README_assets/2022-11-24-17-11-24-image.png" title="" alt="" data-align="inline"><영화 예약 모델>

위의 모델에서 영화pk, 영화시간 pk로 





### 아쉬웠던 부분

1. 모델간의 이해 관계를 구상하는 부분이 어려웠다. 이때문에 처음 ERD 구성에 시간을 많이 투자했음에도 프로젝트를 진행하면서 대부분의 모델이 수정 되었다.

### 
