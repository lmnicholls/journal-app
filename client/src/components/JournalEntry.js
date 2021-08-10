import React, { useState, useEffect } from "react";
import { EditorState } from "draft-js";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Nav from "./nav/Nav";
import { addEntry } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import "../css/journalentry.css";
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
        <form className="sign-in-form" onSubmit={(e) => handleFormSubmit(e)}>
          <h3>New Journal Entry</h3>
          <div className="form-group journal">
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
          </div>
          <div className="form-group journal">
            <label>Date</label>
            <h4>{date.toDateString()}</h4>
          </div>
          <RichTextEditor entry={entry} setEntry={setEntry} />
          <div className="submit-button">
            <button className="btn btn-primary submit" type="submit">
              Submit
            </button>
          </div>
        </form>
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
