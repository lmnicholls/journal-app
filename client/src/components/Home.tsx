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
  faStickyNote,
  faList,
  faSmile,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const { authenticated } = useSelector<any, any>((state) => state.auth);
  const history = useHistory();

  const userName = useSelector<any, any>((state) => state.auth.firstName);
  console.log(userName);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  return (
    <Fragment>
      <Nav />
      <Background />
      <Heading>
        <Background />
        <Description>
          Small acts of self-care in your daily life can have a big impact on
          your mental health. Click on a link to get started.
        </Description>
      </Heading>
      <LinkDiv>
        <Start>
          <HomeLink
            to="/Board"
            style={{ textDecoration: "none" }}
            className="links"
          >
            <h2>Post It Board</h2>
            <IconBorder>
              <Icon icon={faStickyNote} size="2x" />
            </IconBorder>
          </HomeLink>

          <HomeLink
            to="/notes"
            style={{ textDecoration: "none" }}
            className="links"
          >
            <h2>Session Notes</h2>
            <IconBorder>
              <Icon icon={faList} size="2x" />
            </IconBorder>
          </HomeLink>

          <HomeLink
            to="/new-entry"
            style={{ textDecoration: "none" }}
            className="links"
          >
            <div>
              <h2>New Entry</h2>
            </div>

            <IconBorder>
              <Icon icon={faPen} size="2x" />
            </IconBorder>
          </HomeLink>
        </Start>
        <Start>
          <HomeLink
            to="/journal"
            style={{ textDecoration: "none" }}
            className="links"
          >
            <div>
              <h2>Journal</h2>
            </div>

            <IconBorder>
              <Icon icon={faBookOpen} size="2x" />
            </IconBorder>
          </HomeLink>

          <HomeLink
            to="/calendar"
            style={{ textDecoration: "none" }}
            className="links"
          >
            <h2>Calendar</h2>
            <IconBorder>
              <Icon icon={faCalendarAlt} size="2x" />
            </IconBorder>
          </HomeLink>

          <HomeLink to="/feelings" style={{ textDecoration: "none" }}>
            <h2>Feelings</h2>
            <IconBorder>
              <Icon icon={faSmile} size="2x" />
            </IconBorder>
          </HomeLink>
        </Start>
      </LinkDiv>
    </Fragment>
  );
};

export default Home;

const Heading = styled.div`
  text-align: center;
  padding-top: 75px;
`;

const Description = styled.h4`
  font-family: "Patrick Hand SC";
  width: 50vw;
  margin: 0 auto;
  font-size: 36px;
  margin-top: 0px;
  color: white;
`;

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
  padding-top: 25px;
  padding-bottom: 100px;
`;

const HomeLink = styled(Link)`
  font-family: "Patrick Hand SC";
  font-size: 3vmin;
  margin-top: 0px;
  text-shadow: 0.5px 0.5px rgb(51, 167, 151);
  background-color: rgb(98, 169, 207);
  border-radius: 10px;
  margin-right: 15px;
  margin-top: 15px;
  padding: 30px 50px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  width: 270px;
  :hover {
    background-color: rgb(80, 180, 139);
  }
  h2 {
    color: white;
    margin-top: 0px;
  }
`;

const IconBorder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #fff;
  border-radius: 100px;
  width: 100px;
  height: 100px;
`;

const Icon = styled(FontAwesomeIcon)`
  color: white;
`;
