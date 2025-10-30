import { Outlet } from "react-router-dom";
import { Navbar, Dropdown } from "./components/ui";
import { useTriviaContext } from "./context";
import "./App.css";

const App = () => {
  const { categories } = useTriviaContext();

  const categoriesData = [
    { label: "All", path: "/main-title" },
    ...categories.map((cat) => ({
      label: cat.name,
      path: `/main-title/${encodeURIComponent(cat.name)}`,
    })),
  ];

  const distributionData = [
    { label: "Category", path: "/distribution/category" },
    { label: "Difficulty", path: "/distribution/difficulty" },
  ];

  return (
    <div>
      <Navbar
        logo="Open Trivia"
        dropdowns={[
          (closeMenu) => (
            <Dropdown
              title="Categories"
              items={categoriesData}
              onItemClick={closeMenu}
            />
          ),
          (closeMenu) => (
            <Dropdown
              title="Distribution"
              items={distributionData}
              onItemClick={closeMenu}
            />
          ),
        ]}
      />
      <Outlet />
    </div>
  );
};

export default App;
