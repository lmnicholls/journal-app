import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import Nav from "./nav/Nav";
import "../css/notes.css";
import TherapyNoteItem from "./notes/TherapyNoteItem";

const Notes = (props) => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  const [note, setNote] = useState("");
  const [notesItems, setNotesItems] = useState([]);
  let noteItems = [
    "hi",
    "another note",
    "yet another note",
    "never ending COVID",
    "unrealistic expectations of myself",
  ];

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

  const handleDeleteClick = (e, index) => {
    e.preventDefault();
    let noteItemsCopy = [...noteItems];
    noteItemsCopy.splice(index, 1);
    console.log(noteItemsCopy);
    setNotesItems(notesItems);
  };

  return (
    <div className="background">
      <Nav />
      <NotesContainer>
        <h3 className="journal-title">Notes</h3>
        <NotesDiv>
          <NotePad>
            <div>
              {noteItems.map((note, index) => (
                <TherapyNoteItem
                  note={note}
                  key={note}
                  index={index}
                  handleDeleteClick={handleDeleteClick}
                />
              ))}
            </div>
            <Form>
              <AddNote>
                <Form.Group className="mb-3" controlId="formLogo">
                  <Form.Control
                    type="text"
                    // value={logo}
                    placeholder="Enter note"
                    className="addNoteForm"
                    // onChange={(e) => {
                    //   setLogo(e.target.value);
                    // }}
                  />
                </Form.Group>

                <Button variant="primary" className="addButton" type="submit">
                  +
                </Button>
              </AddNote>
            </Form>
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

const AddNote = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const NotePad = styled.div`
  background-color: white;
  font-family: "Patrick Hand SC";
  font-size: 28px;
  padding: 30px 50px;
  min-width: 30vw;
  min-height: 400px;
  border-radius: 20px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
`;
