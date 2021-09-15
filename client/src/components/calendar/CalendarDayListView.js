import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/calendar.css";
import moment from "moment";

export default function CalendarDayListView(props) {
  const dispatch = useDispatch();
  const entries = props.entries.filter(
    (entry) =>
      moment(entry.date).format("MM/DD/YYYY") ===
      moment(props.date).format("MM/DD/YYYY")
  );

  console.log("entries", entries);

  return (
    <>
      <Modal
        show={props.show}
        onHide={() => {
          props.handleClose();
        }}
        className="modal"
      >
        <Modal.Header className="modalHeader">
          <Modal.Title style={{ flex: "1 90%" }}>Journal Entries</Modal.Title>
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
          <Container className="modalEntriesContainer">
            <Row className="dateRow">
              <Col>Date: {moment(props.date).format("dddd, MMMM Do YYYY")}</Col>
            </Row>
            <Row className="entriesRow">
              {entries.length === 0 ? (
                <Col>No journal entries for this date.</Col>
              ) : (
                entries.map((entry) => {
                  return (
                    <Col key={entry._id}>
                      <button className="journalEntryButton">
                        {entry.title}
                      </button>
                    </Col>
                  );
                })
              )}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
