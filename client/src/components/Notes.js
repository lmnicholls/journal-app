import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import Nav from "./nav/Nav";
import "../css/notes.css";
import TherapyNoteItem from "./notes/TherapyNoteItem";

const Notes = (props) => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  const [note, setNote] = useState("");
  // const [noteItems, setNoteItems] = useState([]);
  let noteItems = ["hi", "another note", "yet another note"];

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

  return (
    <div className="background">
      <Nav />
      <NotesContainer>
        <h3 className="journal-title">Notes</h3>
        <NotesDiv>
          <NotePad>
            {noteItems.map((note, index) => (
              <TherapyNoteItem note={note} />
            ))}
          </NotePad>
        </NotesDiv>
      </NotesContainer>
    </div>
  );
};

export default Notes;

const NotesContainer = styled.div`
  padding-top: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
`;

const NotesDiv = styled.div``;

const NotePad = styled.div`
  background-color: white;
  font-family: "Patrick Hand SC";
  font-size: 28px;
  padding: 30px 50px;
  min-width: 30vw;
  min-height: 400px;
  border-radius: 20px;
`;
