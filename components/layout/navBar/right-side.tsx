"use client";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "../../ui/button";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { ModeToggle } from "@/components/toggles/theme-toggle";
import { NavMenu } from "./navMenu/navMenu";

export const RightSide = () => {
  const { userId } = useAuth();
  const { handleNavigation } = useHandleNavigation();
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="flex items-center gap-1">
        <ModeToggle />
        <NavMenu />
      </div>
      {userId ? (
        <UserButton />
      ) : (
        <>
          <Button
            variant="outline"
            size={"sm"}
            onClick={() => handleNavigation("/sign-in")}
          >
            Sign in
          </Button>
          <Button size={"sm"} onClick={() => handleNavigation("/sign-up")}>
            Sign up
          </Button>
        </>
      )}
    </div>
  );
};
