import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Nav from "./nav/Nav";

const Chat = (props) => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  return (
    <ChatBackground>
      <Nav />
      <StatsDiv>
        <h3>Chat</h3>
      </StatsDiv>
    </ChatBackground>
  );
};

export default Chat;

const StatsDiv = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ChatBackground = styled.div`
  background-color: #5de4d2;
  background-image: linear-gradient(
    315deg,
    #5de4d2 25%,
    #6cdcbf 52%,
    #49a7da 90%
  );
  width: 100vw;
  height: 100vh;
`;
