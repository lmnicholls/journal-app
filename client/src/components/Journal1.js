import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Nav from "./nav/Nav";
import { fetchEntries } from "../actions";
import "../css/journal.css";

const Journal = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { authenticated } = useSelector((state) => state.auth);
  const entries = useSelector((state) => {
    return state.journalEntries.entries[0];
  });
  const numEntries = useSelector((state) => {
    return state.journalEntries.numEntries;
  });
  const [leftPageIndex, setLeftPageIndex] = useState(null);
  const [rightPageIndex, setRightPageIndex] = useState(null);

  console.log(authenticated);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  const handleFirstPageClick = () => {
    setLeftPageIndex(-1);
    setRightPageIndex(0);
  };

  const handlePreviousPageClick = () => {
    if (!(leftPageIndex - 2 < -1)) {
      setLeftPageIndex(leftPageIndex - 2);
      setRightPageIndex(rightPageIndex - 2);
    }
  };

  const handleNextPageClick = () => {
    if (!(rightPageIndex + 2 >= numEntries)) {
      setLeftPageIndex(leftPageIndex + 2);
      setRightPageIndex(rightPageIndex + 2);
    } else {
      if (numEntries !== 0) {
        if (numEntries % 2 === 0) {
          setLeftPageIndex(numEntries - 1);
          setRightPageIndex(numEntries);
        } else {
          setRightPageIndex(numEntries - 1);
          setLeftPageIndex(numEntries - 2);
        }
      }
    }
  };

  const handleLastPageClick = () => {
    if (numEntries !== 0) {
      if (numEntries % 2 === 0) {
        setLeftPageIndex(numEntries - 1);
        setRightPageIndex(numEntries);
      } else {
        setRightPageIndex(numEntries - 1);
        setLeftPageIndex(numEntries - 2);
      }
    }
  };

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchEntries());
    }
  }, [dispatch, authenticated]);

  useEffect(() => {
    if (numEntries !== 0) {
      if (numEntries % 2 === 0) {
        setLeftPageIndex(numEntries - 1);
        setRightPageIndex(numEntries);
      } else {
        setRightPageIndex(numEntries - 1);
        setLeftPageIndex(numEntries - 2);
      }
    }
  }, [numEntries]);

  if (!entries || (leftPageIndex === null && rightPageIndex === null)) {
    return (
      <div>
        <Nav />
        <JournalDiv>
          <h3 className="journal-title">My Journal</h3>
          <h5>
            Get journaling. Add an entry to your journal and start recording
            memories!
          </h5>
        </JournalDiv>
      </div>
    );
  }

  return (
    <div className="background">
      <Nav />
      <JournalDiv>
        <h3 className="journal-title">My Journal</h3>

        <div className="journal-book-div">
          {leftPageIndex < 0 ? (
            <div className="left-page"></div>
          ) : (
            <div className="left-page">
              <div className="entry">
                <h1 className="entry-title">{entries[leftPageIndex].title}</h1>
                <h3 className="date">
                  {new Date(entries[leftPageIndex].date).toDateString()}
                </h3>
                <div
                  className="page-text"
                  dangerouslySetInnerHTML={{
                    __html: entries[leftPageIndex].entry,
                  }}
                ></div>
              </div>

              <div className="page-number">Page {leftPageIndex + 1}</div>
            </div>
          )}
          {rightPageIndex > numEntries - 1 ? (
            <div className="right-page"></div>
          ) : (
            <div className="right-page">
              <div className="entry">
                <h1 className="entry-title">{entries[rightPageIndex].title}</h1>
                <h3 className="date">
                  {new Date(entries[rightPageIndex].date).toDateString()}
                </h3>
                <div
                  className="page-text"
                  dangerouslySetInnerHTML={{
                    __html: entries[rightPageIndex].entry,
                  }}
                ></div>
              </div>
              <div className="page-number">Page {rightPageIndex + 1}</div>
            </div>
          )}
        </div>

        <div className="journal-button-container">
          <div>
            <button type="button" onClick={() => handleFirstPageClick()}>
              First
            </button>
            <button type="button" onClick={() => handlePreviousPageClick()}>
              Previous
            </button>
            {/* <span className="current_pages">
              Pages {leftPageIndex + 1}-{rightPageIndex + 1} of {numEntries}
            </span> */}
            <button type="button" onClick={() => handleNextPageClick()}>
              Next
            </button>
            <button type="button" onClick={() => handleLastPageClick()}>
              Last
            </button>
          </div>
        </div>
      </JournalDiv>
    </div>
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
