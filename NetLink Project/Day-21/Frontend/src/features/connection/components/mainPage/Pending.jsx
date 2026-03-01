import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Pending = () => {
  return (
    <div className="ConnectionsList">

      <div className="head">
        <NavLink
          to="invitation"
          className={({ isActive }) =>
            isActive ? "clickBtn activeTab" : "clickBtn"
          }
        >
          INCOMING
        </NavLink>

        <NavLink
          to="sent"
          className={({ isActive }) =>
            isActive ? "clickBtn activeTab" : "clickBtn"
          }
        >
          SENT
        </NavLink>
      </div>




      <div className="cardCont">
        <Outlet />
      </div>
    </div>
  );
};

export default Pending;
