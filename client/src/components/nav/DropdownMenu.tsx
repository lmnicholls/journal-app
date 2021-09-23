import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faCalendarAlt,
  faPen,
  faBookOpen,
  faHome,
  faList,
  faSmile,
  faStickyNote,
} from "@fortawesome/free-solid-svg-icons";

const DropdownMenu = () => {
  const dropdownRef: React.Ref<HTMLElement> = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const onClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.stopPropagation();
    setIsActive(!isActive);
  };

  useEffect(() => {
    const pageClickEvent: (this: Window, ev: MouseEvent) => any = (e) => {
      if (
        dropdownRef.current !== null &&
        !dropdownRef.current.contains(e.target as Node)
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
    <MenuContainer>
      <MenuTrigger onClick={onClick}>
        <FontAwesomeIcon icon={faBars} className="icon bars fa-2x" />
      </MenuTrigger>
      <Menu
        ref={dropdownRef}
        className={`menu ${isActive ? "active" : "inactive"}`}
      >
        <ul>
          <li>
            <Link to="/home">
              <Icon icon={faHome} />
              Home
            </Link>
          </li>
          <li>
            <Link to="/board">
              <Icon icon={faStickyNote} />
              Think Board
            </Link>
          </li>
          <li>
            <Link to="/notes">
              <Icon icon={faList} />
              Session Notes
            </Link>
          </li>
          <li>
            <Link to="/new-entry">
              <Icon icon={faPen} />
              New Entry
            </Link>
          </li>
          <li>
            <Link to="/journal">
              <Icon icon={faBookOpen} />
              Journal
            </Link>
          </li>
          <li>
            <Link to="/calendar">
              <Icon icon={faCalendarAlt} />
              Calendar
            </Link>
          </li>
          <li>
            <Link to="/feelings">
              <Icon icon={faSmile} />
              Feelings
            </Link>
          </li>
        </ul>
      </Menu>
    </MenuContainer>
  );
};

export default DropdownMenu;

const MenuContainer = styled.div`
  position: relative;
`;

const MenuTrigger = styled.button`
  background: transparent;
  cursor: pointer;
  border: none;
  vertical-align: middle;
  transition: box-shadow 0.4s ease;
  padding-top: 14px;
  padding-left: 10px;
  padding-bottom: 16px;
  font-size: 10px;
  color: white;
  :hover {
    box-shadow: 0 1px 8px rgba(245, 243, 243, 0.3);
  }
`;

const Menu = styled.nav`
  background: #ffffff;
  position: absolute;
  top: 55spx;
  width: 150px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
  opacity: 0;
  visibility: hidden;
  transform: translateY(-20px);
  transition: opacity 0.4s ease, transform 0.4s ease, visibility 0.4s;
  &.active {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  li {
    a {
      text-decoration: none;
      font-family: Patrick Hand SC;
      font-size: 18px;
      color: white;
      background-color: rgba(95, 158, 189, 0.8);
      padding: 15px 20px;
      display: block;
      :hover {
        background-color: gray;
      }
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
  padding-right: 5px;
`;
