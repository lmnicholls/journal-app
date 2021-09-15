import { Button, Modal, Container, Row, Col } from "react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import "../../css/calendar.css";

export default function CalendarDayListView(props) {
  const dispatch = useDispatch();

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
        <Modal.Header>
          <Modal.Title style={{ flex: "1 90%" }}>Journal Entries</Modal.Title>
          <button
            onClick={() => {
              props.handleClose();
            }}
          >
            ✕
          </button>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <Col xs={6} md={6}>
                Title
              </Col>
            </Row>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
}
