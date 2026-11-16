# 🌳 링크나무

내 모든 링크를 한 페이지에 모아두고, 하나의 URL로 공유하는 서비스입니다.

## 시작하기

```bash
npm install
cp .env.example .env.local   # MongoDB Atlas 연결 문자열 입력 (선택)
npm run dev                  # http://localhost:3000
```

## 내 정보 수정

`src/data/profile.ts`에서 이름, 소개, 프로필 사진, 링크 목록을 바꾸세요.

## 클릭 수 집계

`.env.local`에 `MONGODB_URI`를 넣으면 링크 클릭이 MongoDB `clicks` 컬렉션에 저장되고 카드에 클릭 수가 표시됩니다. 값이 없으면 집계 없이 동작합니다.
Vercel에 배포할 때는 프로젝트 설정의 Environment Variables에 같은 값을 넣으세요.
