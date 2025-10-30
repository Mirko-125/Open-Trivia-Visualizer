import { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ dropdowns = [], logo = "OPEN TRIVIA" }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <button
          className={`hamburger ${isMenuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`navbar-components ${isMenuOpen ? "open" : ""}`}>
          {dropdowns.map((dropdown, index) => (
            <div key={index} className="navbar-component">
              {typeof dropdown === "function"
                ? dropdown(() => setIsMenuOpen(false))
                : dropdown}
            </div>
          ))}
        </div>

        <Link
          to="/"
          className="navbar-logo"
          onClick={() => setIsMenuOpen(false)}
        >
          {logo}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
