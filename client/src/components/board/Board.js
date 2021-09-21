import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Example from "./Example";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import styled from "styled-components";
import "./board.css";
import Nav from "../nav/Nav";
import {
  addPostit,
  fetchPostits,
  deletePostit,
  editPostitPosition,
} from "../../actions";

function Board() {
  const { authenticated } = useSelector((state) => state.auth);
  const postits = useSelector((state) => {
    return state.postits.postits;
  });
  const [postitInput, setPostitInput] = useState("");

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

  const handleAddPostitClick = (e) => {
    e.preventDefault();
    if (!postitInput) {
      return;
    }
    let rotate = Math.floor(Math.random() * 30);
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight;
    let x = Math.floor(Math.random() * winWidth) - 50;
    let y = Math.floor(Math.random() * winHeight) - 50;
    dispatch(addPostit(postitInput, rotate, x, y));
    dispatch(fetchPostits());
    setPostitInput("");
  };

  const handleDeletePostit = (e, postitID) => {
    e.preventDefault();
    dispatch(
      deletePostit(postitID, () => {
        dispatch(fetchPostits());
      })
    );
  };

  const handleDropPostit = (e, postitID) => {
    e.preventDefault();

    e.target.style.left = `${e.pageX - 50}px`;
    e.target.style.top = `${e.pageY - 50}px`;
    let x = e.pageX - 50;
    let y = e.pageY - 50;
    dispatch(
      editPostitPosition(postitID, x, y, () => {
        dispatch(fetchPostits());
      })
    );
  };

  const handleDragOver = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  if (!postits) {
    return <div></div>;
  }

  return (
    <>
      <BoardBackground>
        <Nav />
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
          <DndBoard>
            <DndProvider backend={HTML5Backend}>
              <Example postits={postits} />
            </DndProvider>
          </DndBoard>
        </BoardDiv>
      </BoardBackground>
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
  }
  button {
    width: 100%;
    background-color: #fff27f;
    cursor: pointer;
    padding: 5px;
    border: 0;
    outline: none;
  }
  button:hover {
    background-color: red;
    color: white;
  }
`;

const DndBoard = styled.div`
  margin-left: 10px;
  width: 100%;
`;
