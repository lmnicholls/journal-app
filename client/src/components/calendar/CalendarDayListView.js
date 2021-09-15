import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
// import "../../css/calendar.css";
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
        animation={false}
        className="modal"
      >
        <Modal.Header className="modalHeader">
          <Modal.Title style={{ flex: "1 90%" }} className="modalTitle">
            Journal Entries
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
          <Container>
            <Row className="dateRow">
              <Col>Date:</Col>
              <Col className="date">
                {moment(props.date).format("MM/DD/YYYY")}
              </Col>
            </Row>
            <Row>
              {entries.map((entry) => {
                return (
                  <Col>
                    <button className="journalEntryButton">
                      {entry.title}
                    </button>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
