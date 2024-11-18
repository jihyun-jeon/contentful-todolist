# TODOLIST

## 회원가입

- [ ] 1. 이메일 중복확인 (entries API)
- [ ] 2. 등록 (CMA + create & publish)

## 로그인

- [x] 1. 이메일 등록 여부 확인 (entries API - 전체 userlist GET)
- [x] 2. 등록된 사용자면 → localStorage에 id와 expireAt(Date.now())저장.

## 인증여부 확인

- [ ] 1. localStorage에서 id와 expireAt 확인
- [ ] 2. 둘 중 하나라도 없으면 → 로그인 리다이렉트(localStorage 삭제)
- [ ] 3. expireAt 검사 : 현재시간이 expireAt 이후면 → 로그인 리다이렉트(localStorage 삭제)
- [ ] 4. 사용자 존재 검사 : entries API 호출하여 localStorage id와 같은지 검사 → 없으면 리다이렉트(localStorage 삭제)

## TODO 목록

- [ ] 1. 위 인증을 통과해야 볼 수 있음
- [x] 2. entries 조회 : localStorage에 저장한 ID로 필터한 목록 조회

## TODO 등록, 삭제

- [x] 1. 등록 : title,content,isDone,userId(localStorage저장된 ID) 새로 create + publish
- [x] 2. 삭제 : todo item ID(entry ID)로 삭제

## 로그아웃

- [x] 1. localStorage 제거, 로그인 페이지 이동

<br/>
<br/>

---

원티드 프리온보딩 todolist 명세 참고

https://github.com/starkoora/wanted-pre-onboarding-challenge-fe-1-api?tab=readme-ov-file#createTodo
