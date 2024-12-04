import { NavLink } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="text-center text-lg font-bold space-x-5 my-10">
      <NavLink to="/">Home</NavLink>

      <NavLink to="/addSchedule">Add Schedule</NavLink>
      <NavLink to="/allSchedule">All Schedule</NavLink>
    </div>
  );
};

export default Header;
