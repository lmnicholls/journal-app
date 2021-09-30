import { Modal } from "react-bootstrap";
import React from "react";
import { useDispatch } from "react-redux";
import { deleteEntry, fetchEntries } from "../../actions";
import "./css/journalentry.css";
import "react-quill/dist/quill.snow.css";
import "./css/richTextEditor.css";
import styled from "styled-components";
import "./css/journalentry.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

interface Props {
  setShow: Function;
  show: boolean;
  handleClose: () => void;
  handleShow: () => void;
  entryID: string;
}

const DeleteModal = (props: Props) => {
  const dispatch = useDispatch();

  const handleDeleteEntry = (e: any) => {
    e.preventDefault();
    dispatch(
      deleteEntry(props.entryID, () => {
        dispatch(fetchEntries());
      })
    );
    props.handleClose();
  };

  return (
    <>
      <Modal
        size="lg"
        scrollable={true}
        show={props.show}
        onHide={props.handleClose}
        animation={false}
      >
        <Modal.Header
          style={{
            backgroundColor: "#49a7da",
            border: "none",
            color: "white",
          }}
        >
          <ModalTitle>Delete Entry</ModalTitle>
          <CloseDiv onClick={() => props.handleClose()}>
            <FontAwesomeIcon
              icon={faTimes}
              className="icon bars"
              style={{ fontSize: "20px" }}
            />
          </CloseDiv>
        </Modal.Header>
        <ModalBody style={{ backgroundColor: "#49a7da", color: "white" }}>
          <label>Are you sure you want to delete this entry?</label>
        </ModalBody>
        <Modal.Footer style={{ backgroundColor: "#49a7da", border: "none" }}>
          <div>
            <SaveButton type="submit" onClick={(e) => handleDeleteEntry(e)}>
              Delete
            </SaveButton>
            <CancelButton onClick={props.handleClose}>Cancel</CancelButton>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;

const ModalTitle = styled(Modal.Title)`
  font-family: "Patrick Hand SC";
  font-size: 32px;
`;

const ModalBody = styled(Modal.Body)`
  label {
    font-family: "Patrick Hand SC";
    font-size: 26px;
  }
`;

const SaveButton = styled.button`
  margin-top: 10px;
  margin-right: 5px;
  margin-bottom: 10px;
  background-color: white;
  font-family: "Patrick Hand SC";
  font-size: 24px;
  border: none;
  color: #49a7da;
  text-decoration: none;
  cursor: pointer;
  border-radius: 5px;
  :hover {
    background-color: #6cdcbf;
    color: white;
  }
`;

const CancelButton = styled(SaveButton)`
  :hover {
    background-color: #f08185;
    color: white;
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
