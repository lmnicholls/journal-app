import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "../../css/notes.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TherapyNoteItem = ({ note, handleDeleteClick, index }) => {
  const { authenticated } = useSelector((state) => state.auth);
  const history = useHistory();
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    if (!authenticated) {
      history.push("/");
    }
  }, [authenticated, history]);

  // const handleAddNote = () => {
  //   setNoteItems([...noteItems, note]);
  //   setNote("");
  // };

  const handleCheckClick = (e) => {
    e.preventDefault();
    setClicked(!clicked);
  };

  return (
    <>
      <div className="listItem" key={note} index={index}>
        <div className="note">
          <button className="check" onClick={(e) => handleCheckClick(e)}>
            {clicked ? "✓" : ""}
          </button>
          <div
            className="noteText"
            style={clicked ? { textDecoration: "line-through" } : {}}
            key={note}
          >
            {note}
          </div>
        </div>
        <div className="deleteNote">
          <button
            className="delete"
            // onClick={(e) => handleDeleteClick(e, index)}
          >
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
