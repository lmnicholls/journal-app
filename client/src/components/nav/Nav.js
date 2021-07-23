import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DropdownMenu from "./DropdownMenu";

const NavAuth = () => {
  const renderLinks = () => {
    return (
      <React.Fragment>
        <li>
          <Link to="/signin">Logout</Link>
        </li>
      </React.Fragment>
    );
  };

  return (
    <NavContainer>
      <NavLeft>
        <DropdownMenu />
        <NavTitle>Moments in Time</NavTitle>
      </NavLeft>
      <NavUl>{renderLinks()}</NavUl>
    </NavContainer>
  );
};

export default NavAuth;

const NavContainer = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  position: fixed;
  z-index: 150;
  background-color: rgba(98, 169, 207, 0.8);
  color: white;
  margin: 0;
  width: 100%;
  height: auto;
  a {
    color: #fff;
  }
`;

const NavUl = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  margin: 0;
  height: 50px;
  li:first-child {
    float: left;
  }
  li {
    margin-left: 0.8em;
    height: 30px;
    padding: 10px;
  }
  li a {
    color: white;
    font-family: Patrick Hand SC;
    font-size: 20px;
  }
  padding-right: 10px;
  li:hover {
    background-color: gray;
  }
`;

const NavTitle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 5px;
  font-family: "Rochester";
  font-size: 28px;
`;

const NavLeft = styled.div`
  display: flex;
  flex-flow: row;
`;
