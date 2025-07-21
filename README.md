# 홍콩/심천 거래소 공시 조회 시스템

홍콩 거래소와 심천 거래소의 공시 정보를 실시간으로 조회하고 검색할 수 있는 웹 애플리케이션입니다.

## 🚀 프로젝트 실행 방법

### 사전 요구사항

- Node.js 18.0.0 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

개발 서버는 기본적으로 `http://localhost:5173`에서 실행됩니다.

## 📁 폴더 구조

```
src/
├── api/                    # API 통신 로직
│   └── announcements.ts    # 공시 데이터 API
├── components/             # 재사용 가능한 컴포넌트
│   └── common/
│       ├── AnnouncementItem.tsx    # 공시 아이템 (PC/Mobile 대응)
│       ├── AnnouncementList.tsx    # 공시 목록 (무한 스크롤)
│       ├── DateRange.tsx           # 날짜 범위 선택
│       ├── FormInput.tsx           # 입력 폼
│       ├── FormSelect.tsx          # 선택 드롭다운
│       └── index.ts               # 컴포넌트 export
├── data/                   # 정적 데이터
│   ├── hongkong_announcements.json
│   ├── hongkong_categories.json
│   ├── shenzhen_announcements.json
│   └── shenzhen_categories.json
├── features/               # 기능별 훅
│   └── hooks/
│       ├── useAnnouncements.ts     # 공시 데이터 관리
│       └── useMediaQuery.ts        # 반응형 미디어 쿼리
├── stores/                 # 전역 상태 관리
│   ├── announcementStore.ts        # 공시 상태
│   └── filterStore.ts              # 필터 상태
├── types/                  # TypeScript 타입 정의
│   └── announcement.ts
├── utils/                  # 유틸리티 함수
│   ├── categoryUtils.ts            # 카테고리/토픽 매핑
│   └── dateUtils.ts               # 날짜 처리
└── App.tsx                # 메인 앱 컴포넌트
```

## 🛠 사용 기술 스택 및 선택 이유

### 핵심 기술

- **React 18**: 최신 React 기능 활용, 컴포넌트 기반 아키텍처
- **TypeScript**: 타입 안전성으로 런타임 오류 방지 및 개발 생산성 향상
- **Vite**: 빠른 개발 서버와 최적화된 번들링

### 상태 관리

- **TanStack Query**: 서버 상태 관리, 캐싱, 무한 스크롤
- **Zustand**: 클라이언트 상태 관리, 가볍고 단순한 구조

### 스타일링

- **Tailwind CSS**: 유틸리티 우선 CSS 프레임워크로 빠른 UI 개발
- **반응형 디자인**: 772px 기준 모바일/데스크톱 최적화

### 데이터 처리

- **dayjs**: 경량 날짜 라이브러리, 시간대 변환 (UTC → KST/CST)
- **React DatePicker**: 커스텀 스타일링된 날짜 선택 컴포넌트

## 🎯 구현 사항

### 필수 요구사항 ✅

- **공시 목록 10개 단위 출력** - TanStack Query 페이지네이션
- **무한 스크롤** - 스크롤 이벤트 기반 최적화 (90% 지점 트리거)
- **키워드 검색** - 제목/본문 대소문자 구분 없는 실시간 검색 500ms 디바운스 처리
- **시간대 변환** - UTC → KST(+9), CST(+8) 자동 변환
- **카테고리 매핑** - ID → 한글 명칭 자동 변환 (홍콩/심천 지원)
- **필터링** - 거래소, 카테고리, 날짜 범위 복합 필터

### 추가 구현 사항 🚀

- **반응형 디자인** - 772px 기준 PC/모바일 레이아웃 자동 전환 (DefaultContent, MobileContent 컴포넌트 분리)
- **성능 최적화** - useMemo 메모이제이션, React Query 캐싱

## ⚡ 성능 및 상태관리 전략

### 데이터 캐싱 전략

```typescript
staleTime: 5 * 60 * 1000,    // 5분간 fresh 데이터
gcTime: 10 * 60 * 1000,      // 10분간 캐시 유지
```

### 검색 최적화

```typescript
useEffect(() => {
  const timer = setTimeout(() => {
    setKeyword(localKeyword);
  }, 500);
  return () => clearTimeout(timer);
}, [localKeyword]);
```

### 상태관리

#### 서버 상태

- 공시 데이터 페칭/캐싱/무한스크롤
- 카테고리 데이터 관리 (홍콩/심천)
- 인기 검색어, 공시 통계

#### 클라이언트 상태

```typescript
// announcementStore: 캐시된 서버 데이터
- categories, popularKeywords, stats, selectedAnnouncement

// filterStore: 사용자 필터 상태
- exchange, category, keyword, dateRange
- recentKeywords, searchHistory (localStorage 영구 저장)
```

### 무한 스크롤 최적화

```typescript
// 정확한 스크롤 감지로 성능 향상
const handleScroll = useCallback(() => {
  const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
  if (scrollPercentage >= 0.9) fetchNextPage();
}, [fetchNextPage]);
```

## 🔧 코드 품질

### 아키텍처 특징

- **단일 책임 원칙**: 각 모듈이 명확한 역할
- **재사용성**: 공통 유틸리티 함수 분리
