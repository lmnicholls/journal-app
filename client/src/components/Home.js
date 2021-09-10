import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Background from "./Background";
import Nav from "./nav/Nav";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faPen,
  faBookOpen,
  faSms,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  return (
    <Fragment>
      <Nav />
      <Background />
      <Start>
        <Link
          to="/messenger"
          style={{ textDecoration: "none" }}
          className="links"
        >
          <h2>Messenger</h2>
          <div className="icon-border">
            <FontAwesomeIcon icon={faSms} className="icon" />
          </div>
        </Link>

        <Link
          to="/new-entry"
          style={{ textDecoration: "none" }}
          className="links"
        >
          <div>
            <h2>New Entry</h2>
          </div>

          <div className="icon-border">
            <FontAwesomeIcon icon={faPen} className="icon" />
          </div>
        </Link>

        <Link
          to="/journal"
          style={{ textDecoration: "none" }}
          className="links"
        >
          <div>
            <h2>Journal</h2>
          </div>

          <div className="icon-border">
            <FontAwesomeIcon icon={faBookOpen} className="icon" />
          </div>
        </Link>

        <Link
          to="/calendar"
          style={{ textDecoration: "none" }}
          className="links"
        >
          <h2>Calendar</h2>
          <div className="icon-border">
            <FontAwesomeIcon icon={faCalendarAlt} className="icon" />
          </div>
        </Link>
      </Start>
    </Fragment>
  );
};

export default Home;

const Start = styled.div`
  text-align: center;
  display: flex;
  flex-flow: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 100px 50px;
`;
