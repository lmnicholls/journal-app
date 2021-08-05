import React, { Fragment, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Nav from "./nav/Nav";
import HTMLFlipBook from "react-pageflip";
import { fetchEntries } from "../actions";
import "../css/journal.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="page page-cover" ref={ref} data-density="soft">
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
        <h3>{new Date(props.date).toDateString()}</h3>
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
  const history = useHistory();
  const { authenticated } = useSelector((state) => state.auth);
  const entries = useSelector((state) => {
    return state.journalEntries.entries[0];
  });
  const numEntries = useSelector((state) => {
    return state.journalEntries.numEntries;
  });
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchEntries());
    }
  }, [dispatch, authenticated]);

  useEffect(() => {
    if (numEntries > 0) {
      setTimeout(() => {
        book.current.pageFlip().turnToPage(numEntries);
        setTotalPage(numEntries);
      }, 500);
    }
  }, [numEntries]);

  if (!entries) return null;

  const onPage = (e) => setPage(e.data);

  return (
    <Fragment>
      <Nav />
      <JournalDiv>
        <h3 className="journal-title">My Journal</h3>

        <HTMLFlipBook
          width={450}
          height={540}
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
              date={entry.date}
              entry={entry.entry}
              key={entry._id}
              className="page"
            />
          ))}
        </HTMLFlipBook>

        <div className="journal-button-container">
          <div>
            <button
              type="button"
              onClick={() => book.current.pageFlip().turnToPage(1)}
            >
              First
            </button>
            <button
              type="button"
              onClick={() => book.current.pageFlip().flipPrev()}
            >
              Previous
            </button>
            <span className="current_pages">
              Pages {page}-{page + 1} of {numEntries}
            </span>
            <button
              type="button"
              onClick={() => book.current.pageFlip().flipNext()}
            >
              Next
            </button>
            <button
              type="button"
              onClick={() => book.current.pageFlip().turnToPage(numEntries)}
            >
              Last
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
  background-color: #5de4d2;
  background-image: linear-gradient(
    315deg,
    #5de4d2 25%,
    #6cdcbf 52%,
    #49a7da 90%
  );
`;
