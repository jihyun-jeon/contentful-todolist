import { createClient } from "contentful-management";

export const CMA_CLIENT = createClient(
  {
    accessToken: import.meta.env.VITE_CMA_TOKEN,
  },
  {
    type: "plain",
    defaults: {
      spaceId: "fkfm153n0jdu",
      environmentId: "master", // [TODO] 상수화 또는 env로 분리
    },
  }
);
