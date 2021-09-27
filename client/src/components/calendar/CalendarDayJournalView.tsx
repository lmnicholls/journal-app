import { Modal, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { useDispatch } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import "./calendar.css";
import styled from "styled-components";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { deleteEntry, fetchEntries } from "../../actions";
import EditEntry from "../journal/EditEntry";
import DeleteModal from "../journal/DeleteModal";

export default function CalendarDayJournalView(props: any) {
  const journalEntry = props.entries.filter(
    (entry: any) => entry._id === props.entryID
  );

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteShow, setDeleteShow] = useState(false);
  const handleDeleteClose = () => setDeleteShow(false);
  const handleDeleteShow = () => setDeleteShow(true);

  const handleDeleteEntry = (id: string) => {
    handleDeleteShow();
  };

  const handleEditEntry = (id: string) => {
    handleShow();
  };

  if (journalEntry.length !== 0) {
    return (
      <>
        <EditEntry
          setShow={setShow}
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          entryID={journalEntry[0]._id}
          entry={journalEntry[0].entry}
          title={journalEntry[0].title}
          date={journalEntry[0].date}
        />
        <DeleteModal
          setShow={setDeleteShow}
          show={deleteShow}
          handleClose={handleDeleteClose}
          handleShow={handleDeleteShow}
          entryID={props.entryID}
        />
        <Modal
          show={props.show}
          onHide={() => {
            props.handleClose();
          }}
          style={{ backgroundColor: "rgba(62, 164, 219, 0.4)" }}
          size="lg"
        >
          <ModalHeader>
            <Modal.Title style={{ flex: "1 90%" }}>
              {journalEntry[0].title}
            </Modal.Title>
            <CloseDiv
              onClick={() => {
                props.handleClose();
              }}
            >
              <FontAwesomeIcon
                icon={faTimes}
                className="icon bars"
                style={{ fontSize: "20px" }}
              />
            </CloseDiv>
          </ModalHeader>
          <ModalBody>
            <Container>
              <TopRow
                style={{
                  color: "rgba(55, 121, 156, 0.8)",
                  paddingLeft: "3px",
                }}
              >
                <div>
                  {moment(journalEntry[0].date).format("dddd, MMMM D, YYYY")}
                </div>
                <div style={{ textAlign: "right" }}>
                  <EditButton
                    onClick={() => handleEditEntry(props.entryID)}
                    icon={faEdit}
                    className="icon bars fa-1xx"
                  />
                  <DeleteButton
                    onClick={() => handleDeleteEntry(props.entryID)}
                    icon={faTrash}
                    className="icon bars fa-1xx"
                  />
                </div>
              </TopRow>
              <Row>
                <JournalText
                  className="page-text"
                  dangerouslySetInnerHTML={{
                    __html: journalEntry[0].entry,
                  }}
                ></JournalText>
              </Row>
            </Container>
          </ModalBody>
        </Modal>
      </>
    );
  }

  return <div></div>;
}

const JournalText = styled.div`
  img {
    max-width: 40%;
    max-height: auto;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
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

const EditButton = styled(FontAwesomeIcon)`
  color: #91bd9f;
  font-size: 18px;
  margin-right: 5px;
  :hover {
    cursor: pointer;
  }
`;

const DeleteButton = styled(FontAwesomeIcon)`
  color: #ed8f8c;
  font-size: 18px;
  :hover {
    cursor: pointer;
  }
`;

const CloseDiv = styled.div`
  font-size: "24px";
  background-color: "#193753";
  :hover {
    color: red;
    cursor: pointer;
  }
`;
