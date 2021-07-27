import React, { Fragment } from "react";
import styled from "styled-components";
import ParticlesBg from "particles-bg";
import Nav from "./nav/Nav";

const Journal = (props) => {
  return (
    <Fragment>
      <Nav />
      <div className="background">
        <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
      </div>
      <StatsDiv>
        <h3>My Stats</h3>
      </StatsDiv>
    </Fragment>
  );
};

export default Journal;

const StatsDiv = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
