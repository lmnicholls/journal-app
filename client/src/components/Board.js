import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Nav from "./nav/Nav";
import "./strategies.css";
import {
  addPostit,
  fetchPostits,
  deletePostit,
  editPostitPosition,
} from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Board = (props) => {
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
    let x = `${Math.floor(Math.random() * winWidth) - 50}px`;
    let y = `${Math.floor(Math.random() * winHeight) - 50}px`;
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

    // e.target.style.left = `${e.pageX - 50}px`;
    // e.target.style.top = `${e.pageY - 50}px`;
    let x = `${e.pageX - 50}px`;
    let y = `${e.pageY - 50}px`;
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
    <StrategiesBackground>
      <Nav />
      <StatsDiv onDrag={handleDragOver}>
        <h3>Board</h3>

        <form className="strategy-form">
          <textarea
            value={postitInput}
            onChange={(e) => setPostitInput(e.target.value)}
            placeholder="Add a new postit..."
          ></textarea>
          <button onClick={(e) => handleAddPostitClick(e)}>Add</button>
        </form>
        {postits.map((postit) => (
          <div
            className="note"
            key={postit._id}
            style={{
              transform: `rotate(${postit.rotate}deg)`,
              left: postit.x,
              top: postit.y,
            }}
            draggable="true"
            onDragEnd={(e) => handleDropPostit(e, postit._id)}
          >
            <div
              className="delete"
              onClick={(e) => handleDeletePostit(e, postit._id)}
            >
              <FontAwesomeIcon icon={faTimes} className="icon bars fa-1xx" />
            </div>
            <div className="text">{postit.postit}</div>
          </div>
        ))}
      </StatsDiv>
    </StrategiesBackground>
  );
};

export default Board;

const StatsDiv = styled.div`
  padding-top: 100px;
  display: flex;
  flex-flow: column;
`;

const StrategiesBackground = styled.div`
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
