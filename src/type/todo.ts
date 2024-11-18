// [질문] type 이름 설정 , 타입 파알 분라하는 법

export type getUserListType = {
  content_type: string;
  "fields.user.sys.id"?: string; // 쿼리스트링으로 들어가는건 다 Optioner임
};

export type createTodoType = {
  fields: {
    title: {
      "ko-KR": string;
    };
    content: {
      "ko-KR": string;
    };
    isDone: {
      "ko-KR": boolean;
    };
    user: {
      "ko-KR": {
        sys: {
          id: string;
          type: "Link";
          linkType: "Entry";
        };
      };
    };
  };
};

export type todoItemType = {
  fields: {
    title: { "ko-KR": string };
    content: { "ko-KR": string };
    isDone: { "ko-KR": true };
  };
  sys: {
    id: string;
  };
};

export type checkedPatchData = {
  isChecked: boolean;
  entryId: string;
};
