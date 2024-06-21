# 산책을 공유할 수 있는 커뮤니티 사이트 - 길동무 (Gildongmu) 아웃소싱 프로젝트 / B02조

## 프로젝트 팀원

- 국민영: 메인페이지 / 공통 컴포넌트 / 디렉토리 / 이미지 업로드 모듈화
- 백현명: 목록페이지 / 슈파베이스 셋팅 / 지도 API 모듈화
- 손서영: 글 작성 / 디자인 총괄
- 안종현: 로그인 / 회원가입
- 안시승: 상세페이지 / 글 수정 / 삭제
- 강성구: 프로필 페이지 / 내가 쓴글 / 좋아요한 글 / 라우터

_고은채 튜터님: SA 피드백, 프로젝트 기술 질의 응답_

## 기술 스택

### DB

![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)

### Design

![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

### Framework

![React Query](https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

### Hosting

![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

### Editors

![Visual Studio](https://img.shields.io/badge/Visual%20Studio-5C2D91.svg?style=for-the-badge&logo=visual-studio&logoColor=white)

### Languages

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)

## 프로젝트 설명

현대인의 건강에 대한 관심이 증가하면서 등산과 산책이 인기 있는 활동으로 자리 잡고 있습니다.
하지만, 혼자서 새로운 산책로를 찾는 것은 어렵기 때문에 우리는 등산과 산책을 즐기는 사람들을 위한 위치 공유 커뮤니티 사이트를 기획하게 되었습니다.

## 트러블 슈팅

## [시연영상](https://youtu.be/rWO-g1M2km8)

## 📅 프로젝트 기간

**2024.06.~17 ~ 2024.06.21**

## 🔗 프로젝트 링크

[프로젝트 바로보기 링크](https://outsourcing-project-five.vercel.app/)

## 📂 폴더 구조

```jsx
├── src
│   ├── App.jsx
│   ├── api
│   │   ├── listApi.js
│   │   ├── supabaseAuth.js
│   │   └── supabasePost.js
│   ├── assets
│   │   ├── defaultImage.png
│   │   ├── images
│   │   │   └── my_profile.png
│   │   └── react.svg
│   ├── common
│   │   └── components
│   │       ├── Backdrop.jsx
│   │       ├── Button.jsx
│   │       ├── Modal.jsx
│   │       └── Spinner.jsx
│   ├── components
│   │   ├── Likes.jsx
│   │   ├── PostInfo.jsx
│   │   ├── kakao
│   │   │   ├── KakaoMap.jsx
│   │   │   ├── KakaoMapWithAddressSearch.jsx
│   │   │   └── KakaoMapWithPost.jsx
│   │   ├── list
│   │   │   ├── Categories.jsx
│   │   │   ├── List.jsx
│   │   │   ├── NotFindSearch.jsx
│   │   │   └── Search.jsx
│   │   └── posts
│   │       ├── PostItem.jsx
│   │       └── SearchForm.jsx
│   ├── config
│   │   └── supabase.js
│   ├── context
│   │   └── modal.context.jsx
│   ├── hello-wolrd
│   ├── hooks
│   │   └── useFetchHomePagePost.jsx
│   ├── index.css
│   ├── layouts
│   │   ├── DefaultLayout.jsx
│   │   ├── Footer.jsx
│   │   └── Header.jsx
│   ├── main.jsx
│   ├── page
│   │   ├── detailPage
│   │   │   ├── Detail.jsx
│   │   │   └── index.js
│   │   ├── homePage
│   │   │   ├── HomePage.jsx
│   │   │   └── index.js
│   │   ├── kakaoMapExamplePage
│   │   │   ├── KakaoMapPage.jsx
│   │   │   ├── KakaoMapWithAddressSearchOfCreatePage.jsx
│   │   │   ├── KakaoMapWithAddressSearchOfUpdatePage.jsx
│   │   │   └── KakaoMapWithPostPage.jsx
│   │   ├── listPage
│   │   │   ├── ListPage.jsx
│   │   │   └── index.js
│   │   ├── login
│   │   │   ├── SignInPage.jsx
│   │   │   └── SignUpPage.jsx
│   │   ├── myPage
│   │   │   ├── MyEditPage.jsx
│   │   │   ├── MyLikePage.jsx
│   │   │   ├── MyListPage.jsx
│   │   │   ├── MyNofindSearch.jsx
│   │   │   ├── MypageNavigate.jsx
│   │   │   └── index.js
│   │   └── writePage
│   │       ├── WritePage.jsx
│   │       └── index.js
│   ├── shared
│   │   ├── PrivateRoute.jsx
│   │   └── Router.jsx
│   ├── utils
│   │   └── uploadFile.js
│   └── zustand
│       ├── authStore.js
│       ├── kakaoMapStore.js
│       └── listStore.js
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```
