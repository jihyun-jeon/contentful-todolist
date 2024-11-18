import { CMA_CLIENT } from "../shared/contentful";
import { getUsersType } from "../type/user";

// <fether만 분리>
export const getUsers = () => {
  // getUsers 호출시 params값이 변동적인게 아님, 따라서 params를 변수로 받기보단,
  //  { content_type: "user" } 값을 여기서 바로 정의해 두는게 좋음
  return CMA_CLIENT.entry
    .getMany({ query: { content_type: "user" } }) // [질문] { content_type: "user" } 값이 useGetUsers와 중복 어떻게 관리?
    .then((res) => res);
};

export const UserQuery = {
  all: ["user"],
  getMany: (userQuery: getUsersType) => [UserQuery.all, userQuery],
};
