import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <NavLink to="/" className="text-2xl font-bold text-blue-600 hover:text-blue-700">
          RecipeList
        </NavLink>
        <nav>
          <ul className="flex space-x-6 text-gray-700 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"
                }
              >
                List
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/loading"
                className={({ isActive }) =>
                  isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "hover:text-blue-600"
                }
              >
                Load
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
