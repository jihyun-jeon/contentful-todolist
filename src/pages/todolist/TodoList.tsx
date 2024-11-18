import React, { useEffect, useState } from "react";
import Logout from "../auth/Logout";
import InsertForm from "./components/InsertForm";
import { todoItemType } from "../../type/todo";
import {
  useDeleteTodo,
  useGetTodos,
  useUpdateIsDone,
} from "../../hook/useTodos";
import { useAuth } from "../auth/AuthGuard";
import { Navigate } from "react-router-dom";

// 1. 앱 처음 실행 > Context api 초기값으로 읽히고 > Todolist 읽힘
// 이떈, isAuthenticated값 false , userId값 null
// 2. jsx 까지 다 읽히고 > userEffect 실행  checkAuth 실행 > localStorage 값 읽어 context 업데이트
// 3. context에 있는 isAuthenticated state 업데이트 > TodoList 리렌더링
// 4. context에 있는 userId state 업데이트 > TodoList 리렌더링
// 5. 값이 제대로 다 있음 > 리다이렉트 안되고 > Todolist 제대로 출력 완료

// [질문] 최적화 필요 - context api 실행에 따라 3번 읽힘
// 처음 초기값으로 1번, isAuthenticated값 바뀌면 2번, userId값 바뀌면 3번

function TodoList() {
  const { mutate: isDoneMutate } = useUpdateIsDone();
  const { mutate: deleteMutate } = useDeleteTodo();

  const { checkAuth, isAuthenticated, userId } = useAuth();
  const { data: TodoDatas, isLoading } = useGetTodos(userId);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    // navigate("/", { replace: true }); // [질문] useNavigate 는 왜 안되는지?
    return <Navigate to="/" replace={true} />;
  }

  const onChecked = (
    e: React.ChangeEvent<HTMLInputElement>,
    entryId: string
  ) => {
    const isChecked = e.target.checked;

    isDoneMutate({ entryId: entryId, isChecked });
  };

  const onDelete = (entryId: string) => {
    deleteMutate(entryId);
  };

  return (
    <>
      <Logout />
      <InsertForm />
      <hr />
      <h3> TodoList</h3>
      <ul>
        {TodoDatas?.items.map(({ fields, sys }: todoItemType) => {
          const { title, content } = fields;
          return (
            <li
              key={sys.id}
              style={{
                display: "flex",
                borderBottom: "1px solid black",
              }}
            >
              <input
                type="checkbox"
                checked={fields.isDone["ko-KR"]}
                onChange={(e) => onChecked(e, sys.id)}
              />

              <div>
                <div> 제목 : {title["ko-KR"]} </div>
                <div>
                  내용 : {content["ko-KR"]} , {sys.id}
                </div>
              </div>

              <div style={{ display: "flex" }}>
                <button type="button" onClick={() => onDelete(sys.id)}>
                  삭제
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;
