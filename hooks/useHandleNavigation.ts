"use client";

import { useRouter } from "next/navigation";

export enum typeRouter {
  PUSH = "push",
  REPLACE = "replace",
  BACK = "back",
  FORWARD = "forward",
}
export const useHandleNavigation = () => {
  const router = useRouter();
  const handleNavigation = (
    url: string,
    type: typeRouter = typeRouter.PUSH,
  ) => {  

    if(!url){
        return;
    }

    switch (type) {
      case typeRouter.REPLACE:
        router.replace(url);
        break;
      case typeRouter.BACK:
        router.back();
        break;
      case typeRouter.FORWARD:
        router.forward();
        break;
      default:
        router.push(url);
    }
  };

  return { handleNavigation };
};
