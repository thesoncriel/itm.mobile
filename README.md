# 캐럿글로벌 - ITM Mobile
2015년 제작.  
캐럿글로벌에서 B2B 업무에 이용되는 ITM 솔루션을 모바일 버전으로 리뉴얼 작업 한 것.  
전체적인 업무는 크게 강사(Tutor)와 학생(Member)로 나뉘며 이 둘은 클래스 목록, 상세 및 그에 따른 세부 정보와 출결 정보를 보여줄 수 있도록 하였으며, 클래스 커뮤니티(Class Community)라 불리는 일종의 게시판을 클래스마다 별도로 운영하기에 이에 대한 링크 및 부가 기능이 담겨 있다.  

## 업무 상세
강사는 업무 특성상 Schedule, Job Position Avaliable, Payment, Ranking 등이 추가적으로 보여지며,  
학생 출결 시 Evaluation (통칭 EV)으로 학생의 수업을 평가할 수 있는 기능 역시 별도로 제공되어 진다.  
둘은 기획 특성상 서로 비슷한 화면을 공유하나 언어를 달리 할 필요가 있다는 요청에 Locale 설정을 추가 하였다.  

또 한 디자이너의 요청으로 각 회사별(Company) 테마가 주어져 포인트 컬러(Point Color)로 사이트의 분위기를 바꿀 수 있도록 하는 기능이 적용 되어 있다.  

## 사용기술 및 환경
* PHP 5.3
* Oracle 10G
* jQuery 2.x
* AngularJS, UI-Router

### 기술 상세
SPA 로 작성 되어 있고, 달력 출력은 simple calendar, 게시물에 대한 연속적인 무한 스크롤은 ngInfiniteScroll 을 이용 하였다.  
Back-end 담당자가 View(HTML)에서 서버 요청 정보를 소스상에서 볼 수 있도록 요청하였기에 협업 관계상, Form 요소를 비동기 통신이 되도록 하는 Directive인 ngAsyncform 를 자체 제작하여 사용 하였다.  
그래프 API는 자체 사용되고 있던 AmChart를 Directive로 Wrapping 하여 적용 하게끔 되어 있다.


## 비고
사정상 보안에 민감한 내용과 하부 컨텐츠 및 SQL문, 백엔드 모듈 등은 제거 함.

## Caution
- 내용을 참고만 하되 복붙하심 안됩니다..  

## Screen Shots
![](https://github.com/thesoncriel/itm.mobile/blob/master/screenshots/001.png)
![](https://github.com/thesoncriel/itm.mobile/blob/master/screenshots/002.png)
![](https://github.com/thesoncriel/itm.mobile/blob/master/screenshots/003.png)
