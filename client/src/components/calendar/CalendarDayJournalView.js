import { Modal, Container, Row } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/calendar.css";
import moment from "moment";

export default function CalendarDayJournalView(props) {
  const journalEntry = props.entries.filter(
    (entry) => entry._id === props.entryID
  );

  if (journalEntry.length !== 0) {
    return (
      <>
        <Modal
          show={props.show}
          onHide={() => {
            props.handleClose();
          }}
          className="modal"
          size="lg"
        >
          <Modal.Header className="modalHeader">
            <Modal.Title style={{ flex: "1 90%" }}>
              {journalEntry[0].title}
            </Modal.Title>
            <button
              className="closeBtn"
              onClick={() => {
                props.handleClose();
              }}
            >
              ✕
            </button>
          </Modal.Header>
          <Modal.Body>
            <Container className="journalEntryContainer">
              <Row
                style={{
                  color: "rgba(55, 121, 156, 0.8)",
                  paddingLeft: "10px",
                }}
              >
                {moment(journalEntry[0].date).format("dddd, MMMM D, YYYY")}
              </Row>
              <Row className="entryContent">
                <div
                  className="page-text"
                  dangerouslySetInnerHTML={{
                    __html: journalEntry[0].entry,
                  }}
                ></div>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return <div></div>;
}
