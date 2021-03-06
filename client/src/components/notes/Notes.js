import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Form, Button } from "react-bootstrap";
import styled from "styled-components";
import Nav from "../nav/Nav";
import TherapyNoteItem from "./TherapyNoteItem";
import { addNote, fetchNotes, deleteNote, editNoteCheck } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const Notes = (props) => {
  const { authenticated } = useSelector((state) => state.auth);
  const notes = useSelector((state) => {
    return state.notes.notes;
  });
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
    if (!note) return;
    let checked = false;
    dispatch(addNote(note, checked));
    dispatch(fetchNotes());
    setNote("");
  };

  const handleDeleteClick = (e, noteID) => {
    e.preventDefault();
    dispatch(
      deleteNote(noteID, () => {
        dispatch(fetchNotes());
      })
    );
  };

  const handleCheckClick = (e, noteID, checkStatus) => {
    e.preventDefault();
    dispatch(
      editNoteCheck(noteID, checkStatus, () => {
        dispatch(fetchNotes());
      })
    );
  };

  if (notes?.length === 0) {
    return (
      <>
        <Nav />
        <NotesBackground />
        <NotesContainer>
          <NotesTitle>Notes</NotesTitle>
          <NotesDiv>
            <NotePad>
              <div> Add a note...</div>
              <Form>
                <AddNote>
                  <NoteFormInput
                    type="text"
                    value={note}
                    size="lg"
                    placeholder="Enter note"
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  />
                  <AddButton
                    className="addButton"
                    type="submit"
                    onClick={(e) => handleAddNoteClick(e)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </AddButton>
                </AddNote>
              </Form>
            </NotePad>
          </NotesDiv>
        </NotesContainer>
      </>
    );
  }

  return (
    <>
      <Nav />
      <NotesBackground />
      <NotesContainer>
        <NotesTitle>Notes</NotesTitle>
        <Header>Add topics for discussion at your next therapy session.</Header>
        <NotesDiv>
          <NotePad>
            <div>
              {notes?.map((note, index) => (
                <TherapyNoteItem
                  note={note.note}
                  value={note._id}
                  key={note._id}
                  checked={note.checked}
                  index={index}
                  handleDeleteClick={(e) => handleDeleteClick(e, note._id)}
                  handleCheckClick={(e) =>
                    handleCheckClick(e, note._id, note.checked)
                  }
                />
              ))}
            </div>
            <Form>
              <AddNote>
                <NoteFormInput
                  type="text"
                  value={note}
                  size="lg"
                  placeholder="Enter note"
                  onChange={(e) => {
                    setNote(e.target.value);
                  }}
                />
                <AddButton
                  className="addButton"
                  type="submit"
                  onClick={(e) => handleAddNoteClick(e)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </AddButton>
              </AddNote>
            </Form>
          </NotePad>
        </NotesDiv>
      </NotesContainer>
    </>
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

const NotesTitle = styled.h3`
  margin: 0;
  text-shadow: 3px 3px rgb(51, 167, 151);
  font-family: "Patrick Hand SC";
  font-size: 64px;
  color: white;
`;

const AddNote = styled(Form.Group)`
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

const NotesBackground = styled.div`
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

const Header = styled.h4`
  font-family: "Patrick Hand SC";
  width: 70vw;
  margin: 0 auto;
  font-size: 32px;
  margin-top: 0px;
  color: white;
  text-align: center;
  padding-bottom: 20px;
`;

const NoteFormInput = styled(Form.Control)`
  flex: 1 1 auto;
  height: 50px;
  padding-top: 10px;
  margin-right: 10px;
  font-family: "Patrick Hand SC" !important;
  font-size: 24px !important;
  background-color: rgb(194, 189, 189);
`;

const AddButton = styled(Button)`
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  border: none;
  border-radius: 40px;
  background-color: #49a7da;
  color: white;
  :hover {
    background-color: #6cdcbf;
    color: white;
  }
`;
