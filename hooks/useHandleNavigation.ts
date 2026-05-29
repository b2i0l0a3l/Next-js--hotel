"use client";

import { usePathname, useRouter } from "next/navigation";

export enum typeRouter {
  PUSH = "push",
  REPLACE = "replace",
  BACK = "back",
  FORWARD = "forward",
  REFRESH = "refresh",
}
export const useHandleNavigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  const handleNavigation = (
    url: string,
    type: typeRouter = typeRouter.PUSH,
  ) => {  
    if(type === typeRouter.REFRESH){
      router.refresh();
      return;
    } 
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

  const includePath = (path:string) => {
    return pathname.includes(path);
  }

  return { handleNavigation , includePath };
};
