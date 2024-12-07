import { CMA_CLIENT } from "../shared/contentful";
import { createTodoType, getUserListType } from "../type/todo";

//  <1. 리스트 조회 get fether>
export const getTodos = (params: getUserListType) => {
  return CMA_CLIENT.entry.getMany({ query: params }).then((res) => res);
};

//  <2. 단일조회 get fether>
export const getTodo = (entryId: string) => {
  return CMA_CLIENT.entry
    .get({
      entryId,
    })
    .then((res) => res);
};

// <3. todo 생성 fetcher>
export const postTodo = async (formData: createTodoType) => {
  const res = await CMA_CLIENT.entry.create(
    { contentTypeId: "todoItem" },
    formData
  );

  const rawData = {
    sys: res.sys,
    fields: res.fields,
  };

  await CMA_CLIENT.entry.publish({ entryId: res.sys.id }, rawData);
};

//  <4. 완료여부 변경 fetcher 분리>
export const patchTodo = async (
  entryId: string,
  version: number,
  isChecked: boolean
) => {
  const res = await CMA_CLIENT.entry.patch(
    {
      entryId,
      version,
    },
    [
      {
        op: "replace",
        path: "/fields/isDone/ko-KR",
        value: isChecked,
      },
    ]
  );

  const rawData = {
    sys: res.sys,
    fields: res.fields,
  };

  await CMA_CLIENT.entry.publish({ entryId: res.sys.id }, rawData);
};

//  <5. todo 삭제 fetcher>
export const deleteTodo = async (entryId: string) => {
  await CMA_CLIENT.entry.unpublish({ entryId });
  const res = await CMA_CLIENT.entry.delete({ entryId });

  const rawData = {
    sys: res.sys,
    fields: res.fields,
  };

  await CMA_CLIENT.entry.publish({ entryId: res.sys.id }, rawData);
};

export const TodoQuery = {
  all: ["todo"],
  getMany: (todoQuery: getUserListType) => [...TodoQuery.all, todoQuery],
  // getOne: (todo: unknown) => [...TodoQuery.all, todo],
};
