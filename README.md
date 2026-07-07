# 🐾 투펫 (ToPet)

> 반려동물 라이프스타일 매니저

반려동물을 키우는 사람들을 위한 올인원 플랫폼입니다. 반려동물 프로필 관리, 일정(캘린더) 관리, 근처 시설 지도, 커뮤니티, 쇼츠(짧은 영상), AI 챗봇 상담까지 반려생활에 필요한 기능을 하나의 서비스에서 제공합니다.

---

## 📌 주요 기능

### 1. 로그인 / 회원 관리
- 카카오 소셜 로그인 기반 간편 로그인
- 최초 로그인 시 프로필(닉네임, 프로필 사진) 등록 플로우
- 등록 완료 후 반려동물 등록으로 자연스럽게 이어지는 온보딩 플로우

### 2. 반려동물 프로필 관리
- 여러 마리의 반려동물 등록 및 프로필 관리
- 선택된 반려동물(selectedPet) 기준으로 캘린더/커뮤니티 등 콘텐츠 필터링

### 3. 캘린더 (일정 관리)
- 반려동물별 일정 등록/수정/삭제
- 바텀시트 기반 일정 상세/작성 UI
- 작성 중 이탈 방지를 위한 확인 모달 처리
- 데스크탑/모바일/태블릿 반응형 레이아웃 분기

### 4. 지도
- 반려동물 관련 시설 위치 안내

### 5. 커뮤니티
- 동물 종류(강아지 / 고양이 / 특수동물)별 게시판 분리
- 카테고리(자유/일상, 궁금해요, 정보공유)별 게시글 필터링
- 게시글 작성/수정/삭제, 해시태그, 다중 이미지 업로드
- 좋아요, 댓글, 신고/차단 등 상세 기능
- 제목+본문/작성자 등 다양한 검색 옵션

### 6. 쇼츠
- 짧은 영상 콘텐츠 업로드 (영상 + 썸네일 + 설명)
- 유튜브 쇼츠/인스타 릴스 형태의 세로형 상세 뷰어
- 마우스 휠 / 터치 스와이프 제스처로 다음 영상 랜덤 추천
- 좋아요 및 댓글 기능

### 7. 투펫 AI
- 반려동물 관련 궁금증을 대화형으로 해결하는 AI 챗봇
- 실시간 채팅 UI, 로딩 상태 표시

---

## 🛠 기술 스택

**Frontend**
- React
- React Router DOM
- Redux Toolkit (전역 상태 관리)
- react-responsive (반응형 분기 처리)
- axios (API 통신)
- dayjs (날짜 처리)
- react-icons

**아키텍처 특징**
- `component / page / api / redux(reducers) / css` 단위의 관심사 분리
- CSS Module 기반 스타일링으로 컴포넌트별 스타일 스코프 분리
- `Mobile` / `DeskTop` 반응형 컴포넌트로 모바일·태블릿·데스크탑 뷰 분기
- Redux slice 단위 상태 관리: `member`, `selectedPet`, `petList`, `modal`

---

## 📂 폴더 구조

```
src/
 ├─ api/            # axios 기반 API 모듈 (memberApi, communityApi, shortsApi 등)
 ├─ component/      # 재사용 가능한 UI 컴포넌트 (TopBar, BottomSheet, CheckModal 등)
 ├─ page/           # 라우트 단위 페이지 컴포넌트
 ├─ redux/
 │   └─ reducers/   # memberReducer, selectedPetReducer, petListReducer, modalReducer
 ├─ responsive/     # Mobile / DeskTop 반응형 분기 컴포넌트
 ├─ css/            # 페이지/컴포넌트별 CSS Module
 └─ App.js          # 라우팅 및 반응형 네비게이션바 처리
```

---

## 🚀 시작하기

```bash
# 저장소 클론
git clone https://github.com/사용자명/저장소명.git

# 패키지 설치
npm install

# 개발 서버 실행
npm start
```

---

## 🖼 화면 미리보기

<!-- 스크린샷을 추가해 주세요. 예시:
| 로그인 | 홈 | 커뮤니티 |
|:---:|:---:|:---:|
| ![login](./docs/login.png) | ![home](./docs/home.png) | ![community](./docs/community.png) |
-->

---

## 📝 향후 개선 예정

- [ ] 알림 기능 추가
- [ ] 검색 고도화
- [ ] 이미지 최적화 및 CDN 적용
- [ ] 테스트 코드 작성

---

