import React from "react";
import RichTextEditorToolbar, {
  modules,
  formats,
} from "./RichTextEditorToolbar";
import "react-quill/dist/quill.snow.css";
import "../css/richTextEditor.css";
import ReactQuill from "react-quill";

const RichTextEditor = (props) => {
  const handleEditorChange = (state) => {
    props.setEntry(state);
  };

  return (
    <div>
      <RichTextEditorToolbar />
      <ReactQuill
        theme="snow"
        className="entry-form"
        value={props.entry}
        onChange={handleEditorChange}
        placeholder={"Write something awesome..."}
        modules={modules}
        formats={formats}
      />
    </div>
  );
};

export default RichTextEditor;
