import React, { Fragment } from "react";
import styled from "styled-components";
import ParticlesBg from "particles-bg";
import Nav from "./nav/Nav";
import "../css/journalentry.css";
import RichTextEditor from "./RichTextEditor";

const JournalEntry = (props) => {
  let currentDate = new Date();
  let formattedDate = currentDate.toDateString();

  return (
    <Fragment>
      <Nav />
      <div className="background">
        <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
      </div>
      <Journal>
        <form
          className="sign-in-form"
          //  onSubmit={handleSubmit(handleFormSubmit)}
        >
          <h3>New Journal Entry</h3>
          <div className="form-group journal">
            <label>Title</label>
            <input
              className="form-control"
              name="title"
              placeholder="Title of Entry"
              required
            ></input>
          </div>
          <div className="form-group journal">
            <label>Date</label>
            <h4>{formattedDate}</h4>
          </div>
          <RichTextEditor />
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
