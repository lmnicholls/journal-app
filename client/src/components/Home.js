import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";
import ParticlesBg from "particles-bg";
import Nav from "./nav/Nav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faChartBar,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

const Home = (props) => {
  return (
    <Fragment>
      <Nav />
      <div className="background">
        <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
      </div>
      <Start>
        <Link
          to="/new-entry"
          style={{ textDecoration: "none" }}
          className="links"
        >
          <h2>New Entry</h2>
          <FontAwesomeIcon icon={faPen} className="icon" />
        </Link>

        <Link
          to="/calendar"
          style={{ textDecoration: "none" }}
          className="links"
        >
          <h2>Calendar</h2>
          <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
        </Link>
        <Link to="/stats" style={{ textDecoration: "none" }} className="links">
          <h2>Stats</h2>
          <div className="icon-border">
            <FontAwesomeIcon icon={faChartBar} className="icon" />
          </div>
        </Link>
      </Start>
    </Fragment>
  );
};

export default Home;

const Start = styled.div`
  text-align: center;
  padding-top: 100px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 100px;
`;
