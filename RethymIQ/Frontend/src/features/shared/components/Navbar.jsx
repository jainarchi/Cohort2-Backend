import React from "react";
import { RiMoonLine, RiSunLine, RiAccountCircleLine } from "@remixicon/react";
import "../styles/navbar.scss";

const Navbar = () => {
  return (
    <nav>
      <h2>
        Welcome <span className="name">Alex</span>
      </h2>

      <div className="navright">
        <RiMoonLine size="1.4rem" />
        <RiSunLine size="1.4rem" />
        <RiAccountCircleLine size="1.8rem" />
      </div>
    </nav>
  );
};

export default Navbar;
