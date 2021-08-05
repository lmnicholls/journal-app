import React, { Fragment } from "react";
import styled from "styled-components";
import Background from "./Background";
import NavHome from "./nav/NavHome";

const StartPage = (props) => {
  return (
    <Fragment>
      <NavHome />
      <Start>
        <Background />
        <h1 className="title">Moments in Time</h1>
        <h4 className="description">
          Your personal journal to use anywhere in the world.
        </h4>
      </Start>
    </Fragment>
  );
};

export default StartPage;

const Start = styled.div`
  text-align: center;
  padding-top: 300px;
`;
