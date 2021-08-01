import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ParticlesBg from "particles-bg";
import Nav from "./nav/Nav";
import HTMLFlipBook from "react-pageflip";
import { fetchEntries } from "../actions";
import "../css/journal.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="hard">
      <div className="page-content">
        <h2>{props.children}</h2>
      </div>
    </div>
  );
});

let Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      <div className="page-content">
        <h1 className="page-header">{props.title}</h1>
        <div
          className="page-text"
          dangerouslySetInnerHTML={{ __html: props.entry }}
        ></div>
        <div className="page-footer">Page {props.number + 1}</div>
      </div>
    </div>
  );
});

const Journal = () => {
  const book = useRef();
  const dispatch = useDispatch();
  const { authenticated, firstName } = useSelector((state) => state.auth);
  const entries = useSelector((state) => {
    return state.journalEntries.entries[0];
  });
  const numEntries = useSelector((state) => {
    return state.journalEntries.numEntries;
  });
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchEntries());
    }
  }, [dispatch, authenticated]);

  useEffect(() => {
    if (numEntries > 0) {
      setTimeout(() => book.current.pageFlip().turnToPage(numEntries), 0);
    }
  }, [numEntries]);

  if (!entries) return null;

  const onPage = (e) => setPage(e.data);

  return (
    <Fragment>
      <Nav />
      <div className="background">
        <ParticlesBg type="circle" bg={true} style={{ position: "fixed" }} />
      </div>
      <JournalDiv>
        <h3 className="journal-title">My Journal</h3>
        <HTMLFlipBook
          width={500}
          height={500}
          drawShadow={true}
          onFlip={onPage}
          className="journal-pages"
          ref={book}
        >
          <PageCover></PageCover>
          {entries.map((entry, index) => (
            <Page
              number={index}
              title={entry.title}
              entry={entry.entry}
              key={entry._id}
              className="page"
            />
          ))}
          <PageCover>THE END</PageCover>
        </HTMLFlipBook>
        <div className="container">
          <div>
            <button
              type="button"
              onClick={() => book.current.pageFlip().flipPrev()}
            >
              Previous page
            </button>
            <button
              type="button"
              onClick={() => book.current.pageFlip().flipNext()}
            >
              Next page
            </button>
          </div>
        </div>
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
