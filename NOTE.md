# contentful과 contentful-management

### 1. contentful SDK <br/>

콘텐츠를 조회(read-only) 하는 데 사용 (CDA).

- 목적: 주로 Content Delivery API (CDA)와 Preview API를 사용하여 콘텐츠를 조회(read-only)하기 위한 SDK
- 사용 용도: 웹사이트나 애플리케이션에서 게시된 콘텐츠를 불러와서 사용자에게 보여줄 때 사용합니다.
- 특징: 데이터의 조회만 가능하고, 데이터 생성, 수정, 삭제는 불가능합니다.

```js
import { createClient } from "contentful";

const CMA_CLIENT = createClient({
  space: "your_space_id",
  accessToken: "your_cda_token",
});

CMA_CLIENT.getEntries().then((response) => console.log(response.items));
```

### 2. contentful-management SDK <br/>

콘텐츠를 생성, 수정, 삭제하는 데 사용 (CMA).

- 목적: Content Management API (CMA)와 상호작용하여 콘텐츠를 생성, 수정, 삭제하는 SDK입니다.
- 사용 용도: 백엔드 시스템, 관리 콘솔, 관리자 페이지 또는 배포 파이프라인에서 콘텐츠를 프로그램적으로 관리하고 업데이트할 때 사용합니다.
- 특징: 데이터 조회뿐 아니라 콘텐츠 생성, 수정, 삭제가 가능하며, 주로 관리자 및 개발자 도구로 사용됩니다.

```js
import { createClient } from "contentful-management";

const CMA_CLIENT = createClient({
  accessToken: "your_cma_token",
});

CMA_CLIENT.getSpace("your_space_id")
  .then((space) => {
    return space.getEnvironment("master");
  })
  .then((environment) => {
    environment.createEntry("content_type_id", {
      fields: {
        title: { "en-US": "Example Title" },
      },
    });
  });
```

---

# restful api → sdk api로 개선

### 1. api 요청 단순화

[ restful api ]

- update를 위해서는 api 여러개를 실행해야 함.
- 헤더 및 URL을 명시적으로 구성해야 했습니다.

```js
// 1. unpublish
const res = await cmaAxiosInstance({
  method: "delete",
  url: import.meta.env.VITE_CMA_API_URL + `/${entryId}/published`,
  headers: {
    "X-Contentful-Version": publishedVersion + 1,
  },
});

const { version } = res.data.sys;

// 2. delete
await cmaAxiosInstance({
  method: "delete",
  url: import.meta.env.VITE_CMA_API_URL + `/${entryId}`,
  headers: {
    "X-Contentful-Version": version,
  },
});
```

[ sdk 사용시 ]

- Contentful 내부에서 필요한 작업들을 추상화하여 제공하므로 코드가 간결해짐
  - 호출해야 하는 api 수 감소
  - url, header 일일히 명시하지 않아도 됨

```js
CMA_CLIENT.entry.delete({ entryId });
```

---

### [질문]

- 폴더 구조
- ussCallback, useMemo
- localStorage.getItem 반복 Context api로
- context api를 사용해야 하는 경우는? : 모달, Localstorage 등에서 왜 컨텍스트 사용?
- vite-env.d.ts 설정

### [리팩토링]

- [x] SDK로 수정 - contentful를 쉽게 쓰기 위한 sofuware development kit 임
- [x] 리액트 쿼리 fetcher 함수만 따로 분리
- [x] api요청 커스텀 훅으로
- [x] onSuccess로 invalidateQuery하는 로직은 api 모듈 쪽에서 하기<br/>
- : useQuery를 사용하는 컴포넌트 내에서 onSuccess로 이 로직을 실행하면<n/>
  api요청 후 컴포넌트가 unmount된다면 -> 해당 로직이 실행되지 않을 것임<n/>
  -> 그럼 쿼리가 invalid되지 않아 이전 상태로 유지될 치명적 오류 발생<n/>
  그래서 이런 중요한 로직은 Api호출 하는 쪽의 onSuccess 에서 처리해주기<n/>
- [ ] context api로 localStorage 다루기
- [ ] 쿼리스트링으로 들어가는건 타입 다 optioner 처리
- [ ] 경로 상대경로X, 절대경로로

---
