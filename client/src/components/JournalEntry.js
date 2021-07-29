import React, { Fragment, useState } from "react";
import { EditorState } from "draft-js";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import ParticlesBg from "particles-bg";
import Nav from "./nav/Nav";
import { addEntry } from "../actions";
import { useDispatch } from "react-redux";
import "../css/journalentry.css";
import RichTextEditor from "./RichTextEditor";

const JournalEntry = () => {
  const [title, setTitle] = useState("");
  const [entry, setEntry] = useState(EditorState.createEmpty());
  const date = new Date();

  const dispatch = useDispatch();
  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(
      addEntry(title, date, entry, () => {
        history.push("/home");
      })
    );
  };

  return (
    <Fragment>
      <Nav />
      <div className="background">
        <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
      </div>
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
    </Fragment>
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
