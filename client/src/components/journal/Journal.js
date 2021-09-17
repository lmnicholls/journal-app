import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Nav from "../nav/Nav";
import { fetchEntries } from "../../actions";
import "./css/journal.css";

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
          <JournalTitle>My Journal</JournalTitle>
          <h5>
            Get journaling. Add an entry to your journal and start recording
            memories!
          </h5>
        </JournalDiv>
      </div>
    );
  }

  return (
    <JournalBackground>
      <Nav />
      <JournalDiv>
        <JournalTitle>My Journal</JournalTitle>

        <JournalBookDiv>
          {leftPageIndex < 0 ? (
            <LeftPage></LeftPage>
          ) : (
            <LeftPage>
              <div className="entry">
                <EntryTitle>{entries[leftPageIndex].title}</EntryTitle>
                <JournalDate>
                  {new Date(entries[leftPageIndex].date).toDateString()}
                </JournalDate>
                <div
                  className="page-text"
                  dangerouslySetInnerHTML={{
                    __html: entries[leftPageIndex].entry,
                  }}
                ></div>
              </div>

              <PageNumber>Page {leftPageIndex + 1}</PageNumber>
            </LeftPage>
          )}
          {rightPageIndex > numEntries - 1 ? (
            <RightPage></RightPage>
          ) : (
            <RightPage>
              <div className="entry">
                <EntryTitle>{entries[rightPageIndex].title}</EntryTitle>
                <JournalDate>
                  {new Date(entries[rightPageIndex].date).toDateString()}
                </JournalDate>
                <div
                  className="page-text"
                  dangerouslySetInnerHTML={{
                    __html: entries[rightPageIndex].entry,
                  }}
                ></div>
              </div>
              <PageNumber>Page {rightPageIndex + 1}</PageNumber>
            </RightPage>
          )}
        </JournalBookDiv>

        <div>
          <Button type="button" onClick={() => handleFirstPageClick()}>
            First
          </Button>
          <Button type="button" onClick={() => handlePreviousPageClick()}>
            Previous
          </Button>
          {/* <span className="current_pages">
              Pages {leftPageIndex + 1}-{rightPageIndex + 1} of {numEntries}
            </span> */}
          <Button type="button" onClick={() => handleNextPageClick()}>
            Next
          </Button>
          <Button type="button" onClick={() => handleLastPageClick()}>
            Last
          </Button>
        </div>
      </JournalDiv>
    </JournalBackground>
  );
};

export default Journal;

const JournalBackground = styled.div`
  background-color: #5de4d2;
  background-image: linear-gradient(
    315deg,
    #5de4d2 25%,
    #6cdcbf 52%,
    #49a7da 90%
  );
`;

const JournalDiv = styled.div`
  padding-top: 100px;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 150px;
`;

const JournalTitle = styled.h3`
  padding-bottom: 15px;
  margin: 0;
  text-shadow: 3px 3px rgb(51, 167, 151);
  font-family: "Patrick Hand SC";
  font-size: 64px;
  color: white;
`;

const JournalBookDiv = styled.div`
  display: flex;
  flex-flow: row;
  border: 10px solid rgb(97, 100, 100);
  border-radius: 5px;
  background-color: white;
  width: 70%;
  height: 500px;
  .page-text img {
    width: 200px;
  }
`;

const LeftPage = styled.div`
  width: 50%;
  border-right: 4px solid rgba(97, 100, 100, 0.3);
  padding: 5px;
  display: flex;
  flex-flow: column;
  max-height: 100%;
  overflow-y: scroll;
  justify-content: space-between;
`;

const RightPage = styled.div`
  width: 50%;
  padding: 5px;
  display: flex;
  flex-flow: column;
  max-height: 100%;
  overflow-y: scroll;
  justify-content: space-between;
`;

const Button = styled.button`
  margin-top: 10px;
  margin-right: 2px;
  background-color: rgb(217, 219, 219);
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: rgb(95, 158, 189);
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: rgb(80, 180, 139);
    color: rgb(112, 110, 110);
  }
`;

const PageNumber = styled.div`
  font-family: "Patrick Hand SC";
  font-size: 18px;
  height: 25px;
  text-align: center;
  bottom: 0;
`;

const EntryTitle = styled.h1`
  font-family: "Patrick Hand SC";
  font-size: 24px;
`;

const JournalDate = styled.h3`
  font-family: "Patrick Hand SC";
  font-size: 18px;
`;
