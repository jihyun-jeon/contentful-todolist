import React, { useEffect, useState } from "react";
import { useAddTodo } from "../../../hook/useTodos";
import { useAuth } from "../../auth/AuthGuard";
import { Navigate } from "react-router-dom";

const INIT_FORMDATA = { title: "", content: "" };

function InsertForm() {
  const [formData, setFormData] = useState(INIT_FORMDATA);
  const { mutate: addTodoMutate } = useAddTodo();

  const { checkAuth, isAuthenticated, userId } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace={true} />;
  }

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onCreateTodo = () => {
    return addTodoMutate(
      {
        fields: {
          title: {
            "ko-KR": formData.title,
          },
          content: {
            "ko-KR": formData.content,
          },
          isDone: {
            "ko-KR": false,
          },
          user: {
            "ko-KR": {
              sys: {
                id: userId,
                type: "Link",
                linkType: "Entry",
              },
            },
          },
        },
      },
      {
        onSuccess: () => {
          setFormData(INIT_FORMDATA);
        },
      }
      // [TODO] 둘의 차이 :	useMutation 내 onSuccess VS mutate 호출 시 onSuccess
    );
  };

  return (
    <>
      <span>
        <label>
          제목
          <input
            type="text"
            value={formData.title}
            onInput={onInput}
            name="title"
          />
        </label>
        <label>
          내용
          <input
            type="text"
            value={formData.content}
            onInput={onInput}
            name="content"
          />
        </label>
      </span>
      <button type="button" onClick={onCreateTodo}>
        추가
      </button>
    </>
  );
}

export default InsertForm;
