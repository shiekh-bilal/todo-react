import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header>
      <div>
        <NavLink to="/">TodoList</NavLink>
        <ul>
          <li>
            <NavLink to="/">List</NavLink>
          </li>
          <li>
            <NavLink to="/loading">Load</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};