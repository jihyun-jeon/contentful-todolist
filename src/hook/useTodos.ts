import { useMutation, useQuery } from "@tanstack/react-query";

import { queryClient } from "../shared/quertClient";
import {
  deleteTodo,
  getTodo,
  getTodos,
  patchTodo,
  postTodo,
  TodoQuery,
} from "../api/todo";
import { createTodoType } from "../type/todo";

// <GET - 리스트>
export const useGetTodos = (USER_ID: string) => {
  const params = {
    content_type: "todoItem",
    "fields.user.sys.id": USER_ID,
  };
  return useQuery({
    queryFn: () => {
      return getTodos(params);
    },
    queryKey: TodoQuery.getMany(params),
    enabled: !!USER_ID, // sys id가 undefined 일땐 api 자동 호출 X
    staleTime: Infinity,
  });
};

// <GET - 단일조회>
export const useGetTodo = (entryId: string) => {
  return useQuery({
    queryFn: () => {
      return getTodo(entryId);
    },
    queryKey: [],
    enabled: !!entryId,
  });
};

// <PUT - 완료여부 수정>
export const useUpdateIsDone = () => {
  return useMutation({
    mutationFn: async ({
      entryId,
      isChecked,
    }: {
      entryId: string;
      isChecked: boolean;
    }) => {
      // [질문] 왜 TodoList 컴포넌트에서 get요청 후 patch 요청 따로 커스텀훅으로 처리 하는건 오류가 났는지? / 개선 : get-patch 한번에 처리
      await patchTodo(entryId, isChecked);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TodoQuery.all });
    },
  });
};

// <DELTE>
export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: (entryId: string) => {
      return deleteTodo(entryId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TodoQuery.all });
    },
  });
};

// < POST - todo등록 >
export const useAddTodo = () => {
  return useMutation({
    mutationFn: async (data: createTodoType) => {
      await postTodo(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TodoQuery.all });
    },
  });
};
