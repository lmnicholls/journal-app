import React, { Fragment } from "react";
import styled from "styled-components";
import Background from "./Background";
import NavHome from "./nav/NavHome";

const StartPage = (props: any) => {
  return (
    <Fragment>
      <NavHome />
      <Start>
        <Background />
        <Title>Therapy & Me</Title>
        <Description>
          All your therapy needs when and where you need it.
        </Description>
      </Start>
    </Fragment>
  );
};

export default StartPage;

const Start = styled.div`
  text-align: center;
  padding-top: 300px;
`;

const Title = styled.h1`
  font-family: "Rochester";
  font-size: 80px;
  margin: 0px;
  color: white;
  text-shadow: 3px 3px rgb(51, 167, 151);
`;

const Description = styled.h4`
  font-family: "Patrick Hand SC";
  font-size: 40px;
  margin-top: 0px;
  color: white;
  text-shadow: 2px 2px rgb(51, 167, 151);
`;
