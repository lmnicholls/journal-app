import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Nav from "./nav/Nav";
import io from "socket.io-client";
import ChatRoom from "./ChatRoom";

const socket = io("http://localhost:5000");

const Chat = (props) => {
  const { authenticated } = useSelector((state) => state.auth);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(!showChat);
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  return (
    <>
      <ChatBackground />
      <Nav />
      <ChatContainer>
        {!showChat ? (
          <JoinChatContainer>
            <h3>Join A Chat</h3>
            <input
              type="text"
              placeholder="John..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="text"
              placeholder="Room ID"
              onChange={(e) => setRoom(e.target.value)}
            />
            <button onClick={joinRoom}>Join A Room</button>
          </JoinChatContainer>
        ) : (
          <ChatRoom socket={socket} username={username} room={room} />
        )}
      </ChatContainer>
    </>
  );
};

export default Chat;

const ChatContainer = styled.div`
  margin: 0;
  padding-bottom: 3rem;
  padding-top: 50px;
  font-family: Patrick Hand SC;
`;

const JoinChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  h3 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }
  input {
    width: 210px;
    height: 40px;
    margin: 7px;
    border: 2px solid #43a047;
    border-radius: 5px;
    padding: 5px;
    font-size: 16px;
  }
  button {
    width: 225px;
    height: 50px;
    margin: 7px;
    border: none;
    border-radius: 5px;
    padding: 5px;
    font-size: 16px;
    background: #43a047;
    color: #fff;
    cursor: pointer;
    :hover {
      background: #2e7d32;
    }
  }
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
  position: fixed;
  top: 0;
  z-index: -10;
`;
