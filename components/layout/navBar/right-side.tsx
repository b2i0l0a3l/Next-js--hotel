import { ModeToggle } from "@/components/toggles/theme-toggle";
import { NavMenu } from "./navMenu/navMenu";
import AvatarButton from "@/components/shared/avatarButton";

export const RightSide = () => {
  return (
    <div className="flex items-center gap-3 shrink-0">
      <div className="flex items-center gap-1">
        <ModeToggle />
        <NavMenu />
      </div>
      <AvatarButton />
    </div>
  );
};
