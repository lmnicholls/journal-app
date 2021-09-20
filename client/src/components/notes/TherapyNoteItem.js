import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TherapyNoteItem = ({
  note,
  checked,
  id,
  handleDeleteClick,
  handleCheckClick,
  index,
}) => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  return (
    <>
      <NoteItem key={id} index={index}>
        <Note>
          <NoteCheck onClick={(e) => handleCheckClick(e)}>
            {checked ? "✓" : ""}
          </NoteCheck>
          <NoteText style={checked ? { textDecoration: "line-through" } : {}}>
            {note}
          </NoteText>
        </Note>
        <DeleteNoteDiv>
          <DeleteButton onClick={(e) => handleDeleteClick(e, id)}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              color="#f59393"
              style={{ height: "20px" }}
            />
          </DeleteButton>
        </DeleteNoteDiv>
      </NoteItem>
    </>
  );
};

export default TherapyNoteItem;

const NoteItem = styled.div`
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  align-items: center;
`;

const Note = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  margin-right: 10px;
`;

const NoteCheck = styled.button`
  border: 2px solid black;
  border-radius: 20px;
  width: 20px;
  height: 20px;
  font-size: 12px;
  cursor: pointer;
  margin: 0 auto;
  padding: 0;
  display: table-cell;
  vertical-align: middle;
`;

const NoteText = styled.div`
  margin-left: 10px;
`;

const DeleteNoteDiv = styled.div``;

const DeleteButton = styled.div`
  padding: 0;
  display: table-cell;
  vertical-align: middle;
  border: none;
  background: transparent;
  cursor: pointer;
`;
