import { Container } from "../../shared/container";
import { LeftSide } from "./left-side";
import { NavBarCenter } from "./navbar-center";
import { RightSide } from "./right-side";

const NavBar = () => {
  return (
    <div className="sticky top-0 border  border-b-primary/10 bg-secondary w-full z-99999 ">
      <Container>
        <div className="flex items-center justify-between">
            <LeftSide />
            <NavBarCenter />
            <RightSide />
        </div> 
      </Container>
    </div>
  );
};

export default NavBar;
