import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Nav from "./nav/Nav";

const Stats = (props) => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  return (
    <div className="background">
      <Nav />
      <StatsDiv>
        <h3>My Stats</h3>
      </StatsDiv>
    </div>
  );
};

export default Stats;

const StatsDiv = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
