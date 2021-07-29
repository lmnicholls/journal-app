import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ParticlesBg from "particles-bg";
import Nav from "./nav/Nav";
import HTMLFlipBook from "react-pageflip";
import { fetchEntries } from "../actions";

const pages = [
  { title: "First chapter", content: "Content content content" },
  { title: "Second chapter", content: "Content content content" },
  { title: "Third chapter", content: "Content content content" },
  { title: "Fourth chapter", content: "Content content content" },
];

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

  console.log(entries);
  return (
    <Fragment>
      <Nav />
      <div className="background">
        <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
      </div>
      <JournalDiv>
        <h3>My Journal</h3>
        <HTMLFlipBook width={300} height={500}>
          {entries.map((entry) => (
            <article
              key={entry._id}
              style={{ width: "300px ", padding: "10px 20px" }}
            >
              <h1>{entry.title}</h1>
              <p>{new Date(entry.date).toDateString()}</p>
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
  align-items: center;
  justify-content: center;
`;
