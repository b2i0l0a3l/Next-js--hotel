'use client';
import { useAuth } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { useHandleNavigation } from "@/hooks/useHandleNavigation";
import { UserButton } from "@clerk/nextjs";


export default function AvatarButton() {
    const { userId } = useAuth();
    const { handleNavigation } = useHandleNavigation();
    return (
        userId ? (
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
      )
    )
}