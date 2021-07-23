import React, { useRef, useState, useEffect } from "react";
import "../../css/dropdown.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChartBar,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const DropdownMenu = () => {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick = () => setIsActive(!isActive);

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
        <img
          src="https://img.icons8.com/color/50/000000/menu--v1.png"
          alt="menu-bars"
        />
      </button>
      <nav
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          <li>
            <a href="/new-entry">
              <FontAwesomeIcon icon={faPen} className="icon" />
              New Entry
            </a>
          </li>
          <li>
            <a href="/calendar">
              <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
              Calendar
            </a>
          </li>
          <li>
            <a href="/new-entry">
              <FontAwesomeIcon icon={faChartBar} className="icon" />
              Stats
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DropdownMenu;
