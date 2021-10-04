import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ScrollToBottom from "react-scroll-to-bottom";
import "./chat.css";

const ChatRoom = ({ socket, username, room }) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  let key = 0;

  return (
    <ChatWindow>
      <ChatHeader>
        <p>Live Chat</p>
      </ChatHeader>
      <ChatBody>
        <Scroll>
          {messageList.map((messageContent) => {
            return (
              <Message
                id={username === messageContent.author ? "you" : "other"}
                key={key++}
              >
                <div>
                  <MessageContent>
                    <p>{messageContent.message}</p>
                  </MessageContent>
                  <MessageMeta>
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </MessageMeta>
                </div>
              </Message>
            );
          })}
        </Scroll>
      </ChatBody>
      <ChatFooter>
        <input
          type="text"
          placeholder="Enter message..."
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              sendMessage();
            }
          }}
        />
        <button onClick={sendMessage}>></button>
      </ChatFooter>
    </ChatWindow>
  );
};

export default ChatRoom;

const ChatWindow = styled.div`
  width: 300px;
  height: 420px;
  p {
    margin: 0;
  }
`;

const ChatHeader = styled.div`
  height: 45px;
  border-radius: 6px;
  background: #263238;
  position: relative;
  cursor: pointer;
  p {
    display: block;
    padding: 0 1em 0 2em;
    color: #fff;
    font-weight: 700;
    line-height: 45px;
  }
`;

const Scroll = styled(ScrollToBottom)`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  ::-webkit-scrollbar {
    display: none;
  }
`;

const ChatBody = styled.div`
  height: calc(450px - (45px + 70px));
  border: 1px solid #263238;
  background: #fff;
  position: relative;
`;

const Message = styled.div`
  height: auto;
  padding: 10px;
  display: flex;
  #you {
    justify-content: flex-start;
  }
  #other {
    justify-content: flex-end;
  }
`;

const MessageContent = styled.div`
  width: auto;
  height: auto;
  min-height: 40px;
  max-width: 120px;
  background-color: #43a047;
  border-radius: 5px;
  color: white;
  display: flex;
  align-items: center;
  margin-right: 5px;
  margin-left: 5px;
  padding-right: 5px;
  padding-left: 5px;
  overflow-wrap: break-word;
  word-break: break-word;
  #other {
    justify-content: flex-end;
    background-color: cornflowerblue;
  }
  #you {
    justify-content: flex-start;
  }
`;

const MessageMeta = styled.div`
  display: flex;
  font-size: 12px;
  #author {
    margin-left: 10px;
    font-weight: bold;
  }
  #other {
    justify-content: flex-end;
    margin-right: 5px;
  }
  #you {
    justify-content: flex-start;
    margin-left: 5px;
  }
`;

const ChatFooter = styled.div`
  height: 40px;
  border: 1px solid #263238;
  border-top: none;
  display: flex;
  input {
    height: 100%;
    flex: 85%;
    border: 0;
    padding: 0 0.7em;
    font-size: 1em;
    border-right: 1px dotted #607d8b;
    outline: none;
    font-family: Patrick Hand SC;
  }
  button {
    border: 0;
    display: grid;
    place-items: center;
    cursor: pointer;
    flex: 15%;
    height: 100%;
    background: blue;
    outline: none;
    font-size: 25px;
    color: lightgray;
    :hover {
      color: #43a047;
    }
  }
`;
