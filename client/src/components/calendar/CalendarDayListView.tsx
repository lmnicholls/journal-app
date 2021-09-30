import { Modal, Container, Row, Col } from "react-bootstrap";
import React, { useState } from "react";
import CalendarDayJournalView from "./CalendarDayJournalView";
import "bootstrap/dist/css/bootstrap.min.css";
import "./calendar.css";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Entry {
  _id: string;
  title: string;
  date: Date;
  entry: string;
}
interface Props {
  setShow: Function;
  show: boolean;
  date: Date;
  entries: Entry[];
  handleClose: Function;
  handleShow: Function;
}

export default function CalendarDayListView(props: Props) {
  const [show, setShow] = useState(false);
  const [entryID, setEntryID] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const entries = props.entries.filter(
    (entry: Entry) =>
      moment(entry.date).format("MM/DD/YYYY") ===
      moment(props.date).format("MM/DD/YYYY")
  );

  const handleJournalEntryClick = (
    e: React.SyntheticEvent<EventTarget>,
    entryID: string
  ) => {
    e.preventDefault();
    setEntryID(entryID);
    handleShow();
  };

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.handleClose();
        }}
        className="modal"
      >
        <ModalHeader>
          <Modal.Title style={{ flex: "1 90%" }}>Journal Entries</Modal.Title>
          <CloseButton
            onClick={() => {
              props.handleClose();
            }}
          >
            <FontAwesomeIcon
              icon={faTimes}
              className="icon bars"
              style={{ fontSize: "20px" }}
            />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <Container>
            <DateRow>
              <Col>Date: {moment(props.date).format("dddd, MMMM Do YYYY")}</Col>
            </DateRow>
            <EntriesRow>
              {entries.length === 0 ? (
                <Col>No journal entries for this date.</Col>
              ) : (
                entries.map((entry: Entry) => {
                  return (
                    <Col key={entry._id}>
                      <JournalEntryButton
                        value={entry._id}
                        onClick={(e) => handleJournalEntryClick(e, entry._id)}
                      >
                        {entry.title}
                      </JournalEntryButton>
                    </Col>
                  );
                })
              )}
            </EntriesRow>
          </Container>
        </ModalBody>
      </Modal>
      <CalendarDayJournalView
        entries={entries}
        entryID={entryID}
        setShow={setShow}
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
      />
    </>
  );
}

const CloseButton = styled.button`
  font-size: 20px;
  color: white;
  border: none;
  background-color: transparent;
  :hover {
    color: red;
  }
`;

const DateRow = styled.div`
  font-family: "Patrick Hand SC";
  font-size: 24px;
  color: rgba(55, 121, 156, 0.8);
`;

const EntriesRow = styled(Row)`
  display: flex;
  flex-flow: column;
`;

const JournalEntryButton = styled.button`
  background: none;
  color: rgb(84, 82, 85);
  border: none;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  font-family: "Patrick Hand SC";
  padding: 0;
  :hover {
    color: rgb(139, 37, 207);
  }
`;

const ModalHeader = styled(Modal.Header)`
  background-color: rgba(55, 121, 156, 0.8);
  color: white;
  font-family: "Patrick Hand SC";
`;

const ModalBody = styled(Modal.Body)`
  padding: 0;
  color: rgb(84, 82, 85);
  font-family: "Patrick Hand SC";
  font-size: 24px;
`;
