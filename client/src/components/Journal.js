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
      <JournalDiv>
        <h3>My Journal</h3>
      </JournalDiv>
    </Fragment>
  );
};

export default Journal;

const JournalDiv = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
