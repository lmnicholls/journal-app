import { Modal } from "react-bootstrap";
import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { editEntry, fetchEntries } from "../../actions";
import "./css/journalentry.css";
import "react-quill/dist/quill.snow.css";
import "./css/richTextEditor.css";
import ReactQuill from "react-quill";
import RichTextEditorToolbar, {
  modules,
  formats,
} from "./RichTextEditorToolbar";
import styled from "styled-components";
import moment from "moment";
import "./css/journalentry.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditEntry = (props) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.title);
  const [entry, setEntry] = useState(props.entry);

  console.log("props", props);
  useEffect(() => {
    setTitle(props.title);
    setEntry(props.entry);
  }, [props.entry, props.title]);

  const handleEditorChange = (state) => {
    setEntry(state);
  };

  const handleEditEntry = (e) => {
    e.preventDefault();
    dispatch(
      editEntry(props.entryID, title, entry, () => {
        dispatch(fetchEntries());
      })
    );
    props.handleClose();
  };

  if (props.entry) {
    return (
      <>
        <Modal
          size="lg"
          scrollable="true"
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
            <ModalTitle>Edit Journal Entry</ModalTitle>
            <CloseDiv onClick={() => props.handleClose()}>
              <FontAwesomeIcon
                icon={faTimes}
                className="icon bars"
                style={{ fontSize: "20px" }}
              />
            </CloseDiv>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: "#49a7da", color: "white" }}>
            <JournalEntryForm onSubmit={(e) => handleEditEntry(e)}>
              <JournalEntryTitleDate>
                <label>Title</label>
                <input
                  type="text"
                  className="form-control"
                  name="title"
                  value={title}
                  placeholder={title}
                  required
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                />
              </JournalEntryTitleDate>
              <JournalEntryTitleDate>
                <label>Date</label>
                <h4>{moment(props.entry?.date).format("MM/DD/YYYY")}</h4>
              </JournalEntryTitleDate>
              <div className="textEditor">
                <RichTextEditorToolbar />
                <TextEditor
                  theme="snow"
                  className="entry-form"
                  value={entry}
                  onChange={handleEditorChange}
                  placeholder={"Write something awesome..."}
                  modules={modules}
                  formats={formats}
                />
              </div>
            </JournalEntryForm>
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: "#49a7da", border: "none" }}>
            <div>
              <SaveButton
                variant="primary"
                type="submit"
                onClick={(e) => handleEditEntry(e)}
              >
                Save
              </SaveButton>
              <CancelButton variant="secondary" onClick={props.handleClose}>
                Cancel
              </CancelButton>
            </div>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return <div></div>;
};

export default EditEntry;

const ModalTitle = styled(Modal.Title)`
  font-family: "Patrick Hand SC";
  font-size: 32px;
`;

const JournalEntryForm = styled.form`
  font-family: "Patrick Hand SC";
  text-align: center;
  border-radius: 25px;
  padding: 20px;
  h3 {
    font-size: 36px;
    margin-top: 0px;
  }
  label {
    font-size: 24px;
    padding-bottom: 15px;
  }
`;

const JournalEntryTitleDate = styled.div`
  display: flex;
  flex-flow: row;
  width: 100%;
  align-items: center;
  input {
    margin-left: 10px;
    font-size: 24px;
  }
  h4 {
    margin-top: 10px;
    font-size: 20px;
  }
  label {
    width: 60px;
    padding-bottom: 0px;
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

const TextEditor = styled(ReactQuill)`
  img {
    width: 250px;
  }
`;
