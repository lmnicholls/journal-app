import React from "react";
import RichTextEditorToolbar, {
  modules,
  formats,
} from "./RichTextEditorToolbar";
import "react-quill/dist/quill.snow.css";
import "./css/richTextEditor.css";
import ReactQuill from "react-quill";
import styled from "styled-components";

const RichTextEditor = (props: any) => {
  const handleEditorChange = (state: any) => {
    props.setEntry(state);
  };

  return (
    <div>
      <RichTextEditorToolbar />
      <TextEditor
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

const TextEditor = styled(ReactQuill)`
  img {
    width: 40%;
    max-height: auto;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
`;
