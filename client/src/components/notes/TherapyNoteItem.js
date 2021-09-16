import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../../css/notes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TherapyNoteItem = ({ note, checked, id, handleDeleteClick, index }) => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  const handleCheckClick = (e) => {
    e.preventDefault();
    // setClicked(!checked);
  };

  return (
    <>
      <div className="listItem" key={id} index={index}>
        <div className="note">
          <button className="check" onClick={(e) => handleCheckClick(e)}>
            {checked ? "✓" : ""}
          </button>
          <div
            className="noteText"
            style={checked ? { textDecoration: "line-through" } : {}}
          >
            {note}
          </div>
        </div>
        <div className="deleteNote">
          <button className="delete" onClick={(e) => handleDeleteClick(e, id)}>
            <FontAwesomeIcon
              icon={faTrashAlt}
              color="#f59393"
              className="deleteIcon"
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default TherapyNoteItem;
