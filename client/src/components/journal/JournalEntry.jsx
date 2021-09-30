import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Nav from "../nav/Nav";
import { addEntry, fetchEntries } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./css/journalentry.css";
import "react-quill/dist/quill.snow.css";
import "./css/richTextEditor.css";
import RichTextEditor from "./RichTextEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronCircleLeft } from "@fortawesome/free-solid-svg-icons";

const JournalEntry = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState(EditorState.createEmpty());
  const date = new Date();
  const { authenticated } = useSelector((state) => state.auth);

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

  const handleFormSubmit = (e) => {
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
        <JournalTitle>New Journal Entry</JournalTitle>
        <Button onClick={handleAddEntryClick}>
          <FontAwesomeIcon
            icon={faChevronCircleLeft}
            className="icon bars fa-1xx"
            style={{ paddingRight: "5px" }}
          />
          Back To Journal
        </Button>
        <JournalEntryForm onSubmit={(e) => handleFormSubmit(e)}>
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

const JournalTitle = styled.h3`
  margin: 0;
  text-shadow: 3px 3px rgb(51, 167, 151);
  font-family: "Patrick Hand SC";
  font-size: 64px;
  color: white;
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
    font-size: 24px;
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
  background-color: #49a7da;
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: white;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: white;
    color: #6cdcbf;
  }
`;

const SubmitButton = styled.button`
  background-color: #49a7da;
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: 2px solid white;
  color: white;
  margin-top: 10px;
  padding: 4px 8px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: #6cdcbf;
    color: white;
    border: 2px solid white;
  }
`;
