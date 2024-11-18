import { useQuery } from "@tanstack/react-query";
import { getUsers, UserQuery } from "../api/user";

export const useGetUsers = () => {
  return useQuery({
    queryFn: () => {
      return getUsers(); // [질문] 왜 return 을 해야하는지?
    },
    queryKey: UserQuery.getMany({ content_type: "user" }),
  });
};
