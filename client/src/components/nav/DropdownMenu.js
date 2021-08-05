import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendarAlt,
  faChartBar,
  faPen,
  faBookOpen,
  faHome,
} from "@fortawesome/free-solid-svg-icons";

const DropdownMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  useEffect(() => {
    const pageClickEvent = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target)
      ) {
        setIsActive(!isActive);
      }
    };
    if (isActive) {
      window.addEventListener("click", pageClickEvent);
    }
    return () => {
      window.removeEventListener("click", pageClickEvent);
    };
  }, [isActive]);

  return (
    <div className="menu-container">
      <button onClick={onClick} className="menu-trigger">
        <FontAwesomeIcon icon={faBars} className="icon bars fa-2x" />
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          <li>
            <Link to="/home">
              <FontAwesomeIcon icon={faHome} className="icon" />
              Home
            </Link>
          </li>
          <li>
            <Link to="/new-entry">
              <FontAwesomeIcon icon={faPen} className="icon" />
              New Entry
            </Link>
          </li>
          <li>
            <Link to="/journal">
              <FontAwesomeIcon icon={faBookOpen} className="icon" />
              Journal
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/stats">
              <FontAwesomeIcon icon={faChartBar} className="icon" />
              Stats
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;
