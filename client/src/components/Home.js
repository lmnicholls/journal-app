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
  faComments,
  faList,
  faSmile,
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
      <LinkDiv>
        <Start>
          <Link to="/chat" style={{ textDecoration: "none" }} className="links">
            <h2>Chat</h2>
            <div className="icon-border">
              <FontAwesomeIcon icon={faComments} className="icon" />
            </div>
          </Link>

          <Link
            to="/notes"
            style={{ textDecoration: "none" }}
            className="links"
          >
            <h2>Notes</h2>
            <div className="icon-border">
              <FontAwesomeIcon icon={faList} className="icon" />
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
        </Start>
        <Start>
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

          <Link
            to="/feelings"
            style={{ textDecoration: "none" }}
            className="links"
          >
            <h2>Feelings</h2>
            <div className="icon-border">
              <FontAwesomeIcon icon={faSmile} className="icon" />
            </div>
          </Link>
        </Start>
      </LinkDiv>
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
  margin: auto;
`;

const LinkDiv = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
`;
