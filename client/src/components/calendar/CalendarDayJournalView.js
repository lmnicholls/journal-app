import { Modal, Container, Row } from "react-bootstrap";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../css/calendar.css";
import styled from "styled-components";
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
          style={{ "background-color": "rgba(62, 164, 219, 0.4)" }}
          size="lg"
        >
          <Modal.Header>
            <Modal.Title style={{ flex: "1 90%" }}>
              {journalEntry[0].title}
            </Modal.Title>
            <CloseButton
              onClick={() => {
                props.handleClose();
              }}
            >
              ✕
            </CloseButton>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <Row
                style={{
                  color: "rgba(55, 121, 156, 0.8)",
                  paddingLeft: "10px",
                }}
              >
                {moment(journalEntry[0].date).format("dddd, MMMM D, YYYY")}
              </Row>
              <Row>
                <JournalText
                  className="page-text"
                  dangerouslySetInnerHTML={{
                    __html: journalEntry[0].entry,
                  }}
                ></JournalText>
              </Row>
            </Container>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  return <div></div>;
}

const CloseButton = styled.button`
  font-size: 20px;
  color: white;
  border: none;
  background-color: transparent;
  :hover {
    color: rgb(139, 37, 207);
  }
`;

const JournalText = styled.div`
  img {
    max-width: 40%;
    max-height: auto;
  }
`;
