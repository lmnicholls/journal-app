import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Example from "./Example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import "./board.css";
import Nav from "../nav/Nav";
import { addPostit, fetchPostits } from "../../actions";

interface AuthState {
  auth: string;
  firstName: string;
  lastName: string;
  email: string;
  authenticated: string;
}

interface PostIt {
  _id: string;
  postit: string;
  rotate: number;
  x: number;
  y: number;
  color: string;
}
interface RootState {
  auth: AuthState;
  postits: { postit: PostIt[]; postits: PostIt[] };
}

function Board() {
  const { authenticated } = useSelector((state: RootState) => state.auth);
  const { postits } = useSelector((state: RootState) => {
    return state.postits;
  });
  const [postitInput, setPostitInput] = useState("");
  const colors = ["lightyellow", "lightblue", "lightpink", "lightgreen"];

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchPostits());
    }
  }, [dispatch, authenticated]);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  const handleAddPostitClick: React.MouseEventHandler<HTMLButtonElement> = (
    e
  ) => {
    e.preventDefault();
    if (!postitInput) {
      return;
    }
    let postit = postitInput;
    let rotate = Math.floor(-30 + Math.random() * (30 + 1 - -30));
    let dndboard = document.querySelector("#dndboard");
    if (!dndboard) return;
    let width = dndboard.clientWidth;
    let height = dndboard.clientHeight;
    let color = colors[Math.floor(Math.random() * 4)];
    let x = Math.floor(Math.random() * width) - 50;
    let y = Math.floor(Math.random() * height) - 50;
    dispatch(addPostit({ postit, rotate, x, y, color }));
    dispatch(fetchPostits());
    setPostitInput("");
  };

  if (!postits) {
    return <div></div>;
  }

  return (
    <>
      <Nav />
      <BoardBackground />
      <BoardTitle>Quotes • Betterment • Positivity</BoardTitle>
      <BoardDiv>
        <Form>
          <textarea
            value={postitInput}
            onChange={(e) => setPostitInput(e.target.value)}
            placeholder="Add a new post it..."
          ></textarea>
          <button onClick={(e) => handleAddPostitClick(e)}>Add</button>
        </Form>
        <DndBoard id="dndboard">
          <DndProvider backend={HTML5Backend}>
            <Example postits={postits} />
          </DndProvider>
        </DndBoard>
      </BoardDiv>
    </>
  );
}

export default Board;

const BoardBackground = styled.div`
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

const BoardDiv = styled.div`
  padding: 20px;
  display: flex;
  flex-flow: row;
`;

const BoardTitle = styled.h3`
  margin: 0;
  text-shadow: 3px 3px rgb(51, 167, 151);
  font-family: "Patrick Hand SC";
  font-size: 64px;
  color: white;
  text-align: center;
  padding-top: 50px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 200px;
  font-family: Patrick Hand SC;
  font-size: 22px;
  textarea {
    border: 1px solid lightgray;
    min-width: 100%;
    max-width: 100%;
    padding: 10px;
    outline: none;
    background-color: #fff27f;
  }
  button {
    width: 100%;
    background-color: #fff27f;
    cursor: pointer;
    padding: 5px;
    border: 0;
    outline: none;
    color: #666563;
  }
  button:hover {
    background-color: #666563;
    color: #fff27f;
  }
`;

const DndBoard = styled.div`
  margin-left: 10px;
  // position: absolute;
  overflow-x: scroll;
  overflow-y: scroll;
  width: 1670px;
  height: 800px;
`;
