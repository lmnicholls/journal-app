import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Nav from "../nav/Nav";
import { addEntry } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import "./css/journalentry.css";
import RichTextEditor from "./RichTextEditor";

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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addEntry(title, date, entry, () => {
        history.push("/journal");
      })
    );
  };

  return (
    <div className="background">
      <Nav />
      <Journal>
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
    </div>
  );
};

export default JournalEntry;

const Journal = styled.div`
  padding-top: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 100px;
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

const SubmitButton = styled.button`
  background-color: rgb(217, 219, 219);
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: rgb(95, 158, 189);
  margin-top: 10px;
  padding: 8px 16px;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: rgb(80, 180, 139);
    color: rgb(112, 110, 110);
  }
`;
