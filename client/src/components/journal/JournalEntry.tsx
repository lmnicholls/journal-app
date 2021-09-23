import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Nav from "../nav/Nav";
import { addEntry, fetchEntries } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./css/journalentry.css";
import RichTextEditor from "./RichTextEditor";

const JournalEntry = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState<EditorState>(EditorState.createEmpty());
  const date = new Date();
  const { authenticated } = useSelector<any, any>((state) => state.auth);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  const handleAddEntryClick = () => {
    history.push("/journal");
  };

  const handleFormSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    dispatch(addEntry(title, date, entry));
    dispatch(fetchEntries());
    history.push("/journal");
  };

  return (
    <>
      <Nav />
      <JournalEntryBackground />
      <Journal>
        <Button onClick={handleAddEntryClick}>Back To Journal</Button>
        <JournalEntryForm onSubmit={(e) => handleFormSubmit(e)}>
          <h3>New Journal Entry</h3>
          <JournalEntryTitleDate>
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              placeholder="Title of Entry"
              required
              onChange={(e) => {
                setTitle(e.target.value);
              }}
            ></input>
          </JournalEntryTitleDate>
          <JournalEntryTitleDate>
            <label>Date</label>
            <h4>{date.toDateString()}</h4>
          </JournalEntryTitleDate>
          <div className="textEditor">
            <RichTextEditor entry={entry} setEntry={setEntry} />
          </div>
          <div style={{ textAlign: "right" }}>
            <SubmitButton className="btn btn-primary submit" type="submit">
              Submit
            </SubmitButton>
          </div>
        </JournalEntryForm>
      </Journal>
    </>
  );
};

export default JournalEntry;

const Journal = styled.div`
  padding-top: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
`;

const JournalEntryBackground = styled.div`
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

const JournalEntryForm = styled.form`
  font-family: "Patrick Hand SC";
  color: white;
  text-align: center;
  border-radius: 25px;
  width: 40%;
  padding: 20px;
  background: rgba(95, 158, 189, 0.8);
  h3 {
    font-size: 36px;
    margin-top: 0px;
  }
  label {
    font-size: 24px;
    padding-bottom: 15px;
  }
`;

const JournalEntryTitleDate = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  align-items: center;
  input {
    margin-left: 10px;
    font-size: 24px;
  }
  h4 {
    margin-top: 10px;
    font-size: 20px;
  }
  label {
    width: 60px;
    padding-bottom: 0px;
  }
`;

const Button = styled.button`
  margin-top: 10px;
  margin-right: 2px;
  margin-bottom: 10px;
  background-color: rgb(217, 219, 219);
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: rgb(95, 158, 189);
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: rgb(80, 180, 139);
    color: rgb(112, 110, 110);
  }
`;

const SubmitButton = styled.button`
  background-color: rgb(217, 219, 219);
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: rgb(95, 158, 189);
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: rgb(80, 180, 139);
    color: rgb(112, 110, 110);
  }
`;
