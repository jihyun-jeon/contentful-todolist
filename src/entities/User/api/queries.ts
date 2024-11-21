import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./fetchers";
import { getUsersType } from "../model/types";

export const useGetUsers = () => {
  return useQuery({
    queryFn: () => {
      return getUsers(); // [질문] 왜 return 을 해야하는지?
    },
    queryKey: UserQuery.getMany({ content_type: "user" }),
  });
};

export const UserQuery = {
  all: ["user"],
  getMany: (userQuery: getUsersType) => [UserQuery.all, userQuery],
};
