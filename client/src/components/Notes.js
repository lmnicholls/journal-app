import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Nav from "./nav/Nav";

const Notes = (props) => {
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
        <h3>Notes</h3>
      </StatsDiv>
    </div>
  );
};

export default Notes;

const StatsDiv = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
