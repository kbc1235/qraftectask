### 기술 스택

- **React 18** - 함수형 컴포넌트, Hooks 활용
- **TypeScript** - 엄격한 타입 안전성 적용
- **Tailwind CSS** - 유틸리티 우선 스타일링

### 상태 관리

- **TanStack Query** - 서버 상태 관리, 캐싱, 무한 스크롤
- **Zustand** - 경량 클라이언트 상태 관리

### 개발 도구

- **Vite** - 빠른 번들링 및 HMR
- **ESLint** - 코드 품질 관리

## 🚀 실행 방법

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

**접속:** `http://localhost:5173`

## 📋 구현 사항

### ✅ 필수 기능

- [x] **페이지네이션** - 20개 단위 무한 스크롤 구현
- [x] **키워드 검색** - 제목/본문 대소문자 무관 검색, 500ms 디바운스
- [x] **시간대 변환** - UTC → KST/CST 자동 변환
- [x] **카테고리 매핑** - ID → 한글명 동적 변환
- [x] **복합 필터링** - 거래소 + 카테고리 + 날짜 + 키워드 동시 적용

### 🚀 추가 기능

- [x] **반응형 UI** - PC/모바일 레이아웃 자동 전환

## 📁 프로젝트 구조

```
src/
├── 📂 components/common/      # 재사용 컴포넌트
├── 📂 data/                  # 공시 정적 데이터 (JSON 파일)
├── 📂 features/hooks/        # 커스텀 훅
├── 📂 stores/                # 상태 관리
├── 📂 api/                   # API 레이어
├── 📂 types/                 # TypeScript 타입 정의
└── 📂 utils/                 # 유틸리티 함수
```

## ⚙️ 성능 최적화

### 🚄 데이터 캐싱

```typescript
// TanStack Query 캐싱 전략
staleTime: 5 * 60 * 1000,    // 5분간 fresh 상태 유지
gcTime: 10 * 60 * 1000,      // 10분 후 가비지 컬렉션
```

### 🔍 디바운스 적용

```typescript
// 검색 입력 최적화
useEffect(() => {
  const timer = setTimeout(() => {
    setKeyword(localKeyword);
  }, 500);
  return () => clearTimeout(timer);
}, [localKeyword]);
```

### 📱 스크롤 최적화

```typescript
// 무한 스크롤 효율적 구현
const handleScroll = useCallback(() => {
  const scrollPercentage = (scrollTop + clientHeight) / scrollHeight;
  if (scrollPercentage >= 0.9) fetchNextPage();
}, [fetchNextPage]);
```

### 📱 반응형 기준점

- **모바일**: 772px 미만
- **PC**: 772px 이상

## 🏗️ 아키텍처 특징

### 컴포넌트 설계

- **단일 책임 원칙** - 각 컴포넌트별 명확한 역할 분리
- **재사용성** - 공통 컴포넌트 모듈화
- **타입 안전성** - TypeScript 인터페이스 활용

### 상태 관리 전략

- **서버 상태**: TanStack Query로 캐싱, 동기화, 백그라운드 업데이트
- **클라이언트 상태**: Zustand로 UI 상태, 필터 조건 관리
- **영속성**: localStorage 활용한 사용자 설정 저장

### 데이터 처리

- **정적 데이터 활용** - JSON 파일 기반 Mock API 구현
- **실제 API 패턴** - 실제 서버 연동 시 최소한의 변경으로 대응 가능
- **에러 핸들링** - 네트워크 오류, 데이터 파싱 오류 처리

## 🎯 기술적 의사결정

### TanStack Query 선택 이유

- **캐싱 최적화**: 동일 조건 재검색 시 즉시 응답
- **백그라운드 동기화**: 사용자 경험 향상
- **무한 스크롤**: 내장 지원으로 간편한 구현

### Zustand 선택 이유

- **경량성**: Redux 대비 보일러플레이트 최소화
- **TypeScript 친화적**: 완전한 타입 안전성 제공
- **직관적 API**: 학습 곡선 최소화

### Tailwind CSS 선택 이유

- **개발 속도**: 유틸리티 클래스로 빠른 프로토타이핑
- **일관성**: 디자인 시스템 기반 일관된 스타일링
- **성능**: 사용되지 않는 CSS 자동 제거
