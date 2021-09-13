import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../../css/notes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TherapyNoteItem = ({ note }) => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  // const handleAddNote = () => {
  //   setNoteItems([...noteItems, note]);
  //   setNote("");
  // };

  // const handleDeleteNote = (index: number) => {
  //   let noteItemsCopy = [...noteItems];
  //   noteItemsCopy.splice(index, 1);
  //   setNoteItems(noteItemsCopy);
  // };

  const handleCheckClick = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  };

  return (
    <>
      <div className="listItem" key={note}>
        <div className="note">
          <button className="check" onClick={(e) => handleCheckClick(e)}>
            {clicked ? "✓" : ""}
          </button>
          <div
            className="noteText"
            style={clicked ? { textDecoration: "line-through" } : {}}
            key={note}
          >
            {note}
          </div>
        </div>
        <div className="deleteNote">
          <FontAwesomeIcon icon={faTrashAlt} color="#f59393" className="icon" />
        </div>
      </div>
    </>
  );
};

export default TherapyNoteItem;

const NotesContainer = styled.div`
  padding-top: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const NotePad = styled.div`
  background-color: white;
  font-family: "Patrick Hand SC";
  font-size: 28px;
  padding: 30px 50px;
  min-width: 30vw;
  min-height: 400px;
  border-radius: 20px;
`;
