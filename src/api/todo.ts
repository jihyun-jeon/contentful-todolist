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

  return CMA_CLIENT.entry.publish({ entryId: res.sys.id }, rawData);
};

//  <4. 완료여부 변경 fetcher 분리>
export const patchTodo = async (
  entryId: string,
  isChecked: boolean
) => {
  const entry = await getTodo(entryId)

  const res = await CMA_CLIENT.entry.patch(
    {
      entryId,
      version: entry.sys.version,
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

  return CMA_CLIENT.entry.publish({ entryId: res.sys.id }, rawData);
};

//  <5. todo 삭제 fetcher>
export const deleteTodo = async (entryId: string) => {
  await CMA_CLIENT.entry.unpublish({ entryId });
  await CMA_CLIENT.entry.delete({ entryId });
  return entryId;
};

export const TodoQuery = {
  root: ["todo"],
  getMany: (todoQuery: getUserListType) => [...TodoQuery.root, 'getMany', todoQuery],
  getOne: (id: string) => [...TodoQuery.root, 'getOne', id],
};
