import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Nav from "../nav/Nav";
import EditEntry from "./EditEntry";
import DeleteModal from "./DeleteModal";
import { fetchEntries } from "../../actions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faPlusCircle,
  faAngleLeft,
  faAngleRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";

const Journal = () => {
  const { authenticated } = useSelector((state) => state.auth);
  const entries = useSelector((state) => {
    return state.journalEntries.entries;
  });

  const [leftPageIndex, setLeftPageIndex] = useState(-1);
  const [rightPageIndex, setRightPageIndex] = useState(0);
  const [entryID, setEntryID] = useState("");
  const [entry, setEntry] = useState("");

  const [show, setShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  useEffect(() => {
    dispatch(fetchEntries());
  }, [dispatch, authenticated]);

  const handleAddEntryClick = () => {
    history.push("/new-entry");
  };

  const handleFirstPageClick = () => {
    setLeftPageIndex(-1);
    setRightPageIndex(0);
  };

  const handlePreviousPageClick = () => {
    if (leftPageIndex >= 0) {
      setLeftPageIndex(leftPageIndex - 2);
      setRightPageIndex(rightPageIndex - 2);
    }
  };

  const handleNextPageClick = () => {
    if (rightPageIndex < entries.length - 1) {
      setLeftPageIndex(leftPageIndex + 2);
      setRightPageIndex(rightPageIndex + 2);
    }
  };

  const handleLastPageClick = useCallback(() => {
    if (entries?.length % 2 === 0) {
      setLeftPageIndex(entries?.length - 1);
      setRightPageIndex(entries?.length);
    } else {
      setLeftPageIndex(entries?.length - 2);
      setRightPageIndex(entries?.length - 1);
    }
  }, [entries?.length]);

  useEffect(() => {
    handleLastPageClick();
  }, [handleLastPageClick]);

  const handleDeleteEntry = (id) => {
    setEntryID(id);
    setEntry(
      entries?.find((entry) => {
        return entry._id === id;
      })
    );
    handleDeleteShow();
  };

  const handleEditEntry = (id) => {
    setEntryID(id);
    setEntry(
      entries?.find((entry) => {
        return entry._id === id;
      })
    );
    handleShow();
  };

  if (!entries) {
    return (
      <div>
        <JournalBackground />
        <Nav />
        <JournalHeading>
          <JournalTitle>My Journal</JournalTitle>
          <h5>
            Get journaling. Add an entry to your journal and start recording
            memories!
          </h5>
          <Button onClick={handleAddEntryClick}>
            <FontAwesomeIcon
              icon={faPlusCircle}
              className="icon bars fa-1xx"
              style={{ paddingRight: "5px" }}
            />
            Add Entry
          </Button>
        </JournalHeading>
        <JournalDiv>
          <JournalBookDiv>
            <PageDiv>
              <LeftPage
                style={{
                  fontFamily: "Patrick Hand SC",
                  fontSize: "24px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Beginning of Journal
              </LeftPage>
            </PageDiv>
            <PageDiv>
              <RightPage
                style={{
                  fontFamily: "Patrick Hand SC",
                  fontSize: "24px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                End of Journal
              </RightPage>
            </PageDiv>
          </JournalBookDiv>
        </JournalDiv>
      </div>
    );
  }

  return (
    <>
      <JournalBackground />
      <EditEntry
        setShow={setShow}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        entryID={entryID}
        entry={entry.entry}
        title={entry.title}
        date={entry.date}
      />
      <DeleteModal
        setShow={setDeleteShow}
        show={deleteShow}
        handleClose={handleDeleteClose}
        handleShow={handleDeleteShow}
        entryID={entryID}
      />
      <Nav />
      <JournalHeading>
        <JournalTitle>My Journal</JournalTitle>
        <Heading>
          Flip through your journal to look at all your entries.
        </Heading>
        <Button onClick={handleAddEntryClick}>
          <FontAwesomeIcon
            icon={faPlusCircle}
            className="icon bars fa-1xx"
            style={{ paddingRight: "5px" }}
          />
          Add Entry
        </Button>
      </JournalHeading>
      <JournalDiv>
        <JournalBookDiv>
          {!entries[leftPageIndex] ? (
            <PageDiv>
              <LeftPage
                style={{
                  fontFamily: "Patrick Hand SC",
                  fontSize: "24px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Beginning of Journal
              </LeftPage>
            </PageDiv>
          ) : (
            <PageDiv>
              <LeftPage>
                <Entry>
                  <EntryHeader>
                    <EntryTitle>{entries[leftPageIndex].title}</EntryTitle>
                    <div style={{ textAlign: "right" }}>
                      <EditButton
                        onClick={() =>
                          handleEditEntry(
                            entries[leftPageIndex]._id,
                            entries[leftPageIndex].title
                          )
                        }
                        icon={faEdit}
                        className="icon bars fa-1x"
                      />
                      <DeleteButton
                        onClick={() =>
                          handleDeleteEntry(entries[leftPageIndex]._id)
                        }
                        icon={faTrash}
                        className="icon bars fa-1x"
                      />
                    </div>
                  </EntryHeader>
                  <JournalDate>
                    {new Date(entries[leftPageIndex].date).toDateString()}
                  </JournalDate>

                  <JournalText
                    onClick={() => handlePreviousPageClick()}
                    className="page-text"
                    dangerouslySetInnerHTML={{
                      __html: entries[leftPageIndex].entry,
                    }}
                  ></JournalText>
                </Entry>

                <PageNumber>Page {leftPageIndex + 1}</PageNumber>
              </LeftPage>
            </PageDiv>
          )}
          {!entries[rightPageIndex] ? (
            <PageDiv>
              <RightPage
                style={{
                  fontFamily: "Patrick Hand SC",
                  fontSize: "24px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                End of Journal
              </RightPage>
            </PageDiv>
          ) : (
            <PageDiv>
              <RightPage>
                <Entry>
                  <EntryHeader>
                    <EntryTitle>{entries[rightPageIndex].title}</EntryTitle>
                    <div style={{ textAlign: "right" }}>
                      <EditButton
                        onClick={() =>
                          handleEditEntry(entries[rightPageIndex]._id)
                        }
                        icon={faEdit}
                        className="icon bars fa-1x"
                      />
                      <DeleteButton
                        onClick={() =>
                          handleDeleteEntry(entries[rightPageIndex]._id)
                        }
                        icon={faTrash}
                        className="icon bars fa-1x"
                      />
                    </div>
                  </EntryHeader>
                  <JournalDate>
                    {new Date(entries[rightPageIndex].date).toDateString()}
                  </JournalDate>

                  <JournalText
                    onClick={() => handleNextPageClick()}
                    className="page-text"
                    dangerouslySetInnerHTML={{
                      __html: entries[rightPageIndex].entry,
                    }}
                  />
                </Entry>

                <PageNumber>Page {rightPageIndex + 1}</PageNumber>
              </RightPage>
            </PageDiv>
          )}
        </JournalBookDiv>

        <div>
          <Button type="button" onClick={() => handleFirstPageClick()}>
            <FontAwesomeIcon
              icon={faAngleDoubleLeft}
              className="icon bars fa-1xx"
              style={{ paddingRight: "5px" }}
            />
            First
          </Button>
          <Button type="button" onClick={() => handlePreviousPageClick()}>
            <FontAwesomeIcon
              icon={faAngleLeft}
              className="icon bars fa-1xx"
              style={{ paddingRight: "5px" }}
            />
            Previous
          </Button>
          <Button type="button" onClick={() => handleNextPageClick()}>
            Next
            <FontAwesomeIcon
              icon={faAngleRight}
              className="icon bars fa-1xx"
              style={{ paddingLeft: "5px" }}
            />
          </Button>
          <Button type="button" onClick={() => handleLastPageClick()}>
            Last
            <FontAwesomeIcon
              icon={faAngleDoubleRight}
              className="icon bars fa-1xx"
              style={{ paddingLeft: "5px" }}
            />
          </Button>
        </div>
      </JournalDiv>
    </>
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
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: -10;
`;

const JournalHeading = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  padding-top: 75px;
  h5 {
    color: white;
    font-family: Patrick Hand SC;
    font-size: 32px;
  }
`;

const Heading = styled.div`
  font-family: "Patrick Hand SC";
  width: 70vw;
  margin: 0 auto;
  font-size: 36px;
  margin-top: 0px;
  color: white;
  text-align: center;
`;

const EditButton = styled(FontAwesomeIcon)`
  color: #91bd9f;
  margin-right: 5px;
  :hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled(FontAwesomeIcon)`
  color: #ed8f8c;
  :hover {
    cursor: pointer;
  }
`;

const JournalDiv = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 150px;
`;

const Entry = styled.div`
  display: flex;
  flex-flow: column;
  height: 100%;
`;

const EntryHeader = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
  height: 37px;
`;

const JournalTitle = styled.h3`
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
  height: 85vh;
  .page-text img {
    width: 200px;
  }
`;

const JournalText = styled.div`
  flex-grow: 1;
  height: 100%;
  cursor: pointer;
`;

const PageDiv = styled.div`
  width: 50%;
  display: flex;
  flex-flow: row;
  border-right: 4px solid rgba(97, 100, 100, 0.3);
`;

const LeftPage = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-flow: column;
  overflow-y: scroll;
  justify-content: space-between;
`;

const RightPage = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-flow: column;
  overflow-y: scroll;
  justify-content: space-between;
`;

const Button = styled.button`
  margin-top: 10px;
  margin-right: 2px;
  margin-bottom: 10px;
  background-color: #49a7da;
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: white;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: white;
    color: #6cdcbf;
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
  height: 22px;
`;
