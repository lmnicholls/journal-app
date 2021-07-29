import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ParticlesBg from "particles-bg";
import Nav from "./nav/Nav";
import HTMLFlipBook from "react-pageflip";
import { fetchEntries } from "../actions";
import "../css/journal.css";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <div className="page-footer">{props.number + 1}</div>
      </div>
    </div>
  );
});

const Journal = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchEntries());
    }
  }, [dispatch, authenticated]);

  const entries = useSelector((state) => {
    return state.journalEntries.entries[0];
  });

  if (!entries) return null;

  return (
    <Fragment>
      <Nav />
      <div className="background">
        <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
      </div>
      <JournalDiv>
        <h3 className="journal-title">My Journal</h3>
        <HTMLFlipBook
          width={300}
          height={500}
          drawShadow={true}
          className="journal-pages"
          startZIndex={3}
          showCover={true}
        >
          {entries.map((entry) => (
            <article key={entry._id}>
              <h1>{entry.title}</h1>
              <p>{new Date(entry.date).toDateString()}</p>
              <div dangerouslySetInnerHTML={{ __html: entry.entry }}></div>
            </article>
          ))}
        </HTMLFlipBook>
      </JournalDiv>
    </Fragment>
  );
};

export default Journal;

const JournalDiv = styled.div`
  padding-top: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 150px;
`;
