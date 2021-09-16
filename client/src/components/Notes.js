import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import Nav from "./nav/Nav";
import "../css/notes.css";
import TherapyNoteItem from "./notes/TherapyNoteItem";
import { addNote, fetchNotes, deleteNote } from "../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Notes = (props) => {
  const { authenticated } = useSelector((state) => state.auth);
  const notes = useSelector((state) => {
    return state.notes.notes;
  });

  console.log(notes);
  const [note, setNote] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchNotes());
    }
  }, [dispatch, authenticated]);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  const handleAddNoteClick = (e) => {
    e.preventDefault();
    let checked = false;
    dispatch(
      addNote(note, checked, () => {
        dispatch(fetchNotes());
      })
    );
    setNote("");
  };

  const handleDeleteClick = (e, noteID) => {
    e.preventDefault();
    dispatch(deleteNote(noteID));
    dispatch(fetchNotes());
  };

  if (!notes) {
    return <div>Notes loading...</div>;
  }

  return (
    <div className="background">
      <Nav />
      <NotesContainer>
        <h3 className="journal-title">Notes</h3>
        <NotesDiv>
          <NotePad>
            <div>
              {notes.map((note, index) => (
                <TherapyNoteItem
                  note={note.note}
                  value={note._id}
                  key={note._id}
                  checked={note.checked}
                  index={index}
                  handleDeleteClick={(e) => handleDeleteClick(e, note._id)}
                />
              ))}
            </div>
            <Form>
              <AddNote>
                <div>
                  <Form.Group controlId="formLogo">
                    <Form.Control
                      type="text"
                      value={note}
                      size="lg"
                      placeholder="Enter note"
                      className="addNoteForm"
                      onChange={(e) => {
                        setNote(e.target.value);
                      }}
                    />
                  </Form.Group>
                </div>
                <div>
                  <Button
                    className="addButton"
                    type="submit"
                    // size="lg"
                    onClick={(e) => handleAddNoteClick(e)}
                  >
                    <FontAwesomeIcon icon={faPlus} className="icon" />
                  </Button>
                </div>
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

const NotesDiv = styled.div`
  min-width: 500px;
`;

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
  padding: 10px 20px;
  min-width: 30vw;
  min-height: 400px;
  border-radius: 20px;
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
`;
