import { useMutation, useQuery } from "@tanstack/react-query";

import {
  deleteTodo,
  getTodo,
  getTodos,
  patchTodo,
  postTodo,
} from "./fetchers";
import { createTodoType, getUserListType } from "../model/types";
import { queryClient } from "@/shared/quertClient";

// <GET - 리스트>
export const useGetTodos = (USER_ID?: string | null) => {
  const params = {
    content_type: "todoItem",
    "fields.user.sys.id": USER_ID ?? '',
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
      return patchTodo(entryId, isChecked);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TodoQuery.root });
    },
  });
};

// <DELTE>
export const useDeleteTodo = () => {
  return useMutation({
    mutationFn: (entryId: string) => {
      return deleteTodo(entryId);
    },
    onSuccess: (entryId) => {
      queryClient.invalidateQueries({ queryKey: TodoQuery.root });
      queryClient.removeQueries({ queryKey: TodoQuery.getOne(entryId) });
    }
  });
};

// < POST - todo등록 >
export const useAddTodo = () => {
  return useMutation({
    mutationFn: (data: createTodoType) => {
      return postTodo(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: TodoQuery.root });
    },
  });
};

export const TodoQuery = {
  root: ["todo"],
  getMany: (todoQuery?: getUserListType) => [...TodoQuery.root, 'getMany', todoQuery],
  getOne: (id: string) => [...TodoQuery.root, 'getOne', id],
};
