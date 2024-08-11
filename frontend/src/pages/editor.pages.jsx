import { useState } from "react";
import BlogEditor from "../components/blog-editor.component";
import PublishForm from "../components/publish-form.component";

const blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
};
const Editor = () => {
  const [editorState, setEditorState] = useState("editor");
  const [blogEditor, setBlogEditor] = useState({ isReady: false });
  const [blogDetail, setBlogDetail] = useState(blogStructure);
  return (
    <>
      {editorState === "editor" ? (
        <BlogEditor
          blog={blogDetail}
          setBlog={setBlogDetail}
          blogEditor={blogEditor}
          setBlogEditor={setBlogEditor}
          setEditorState={setEditorState}
        />
      ) : (
        <PublishForm blog={{ blogDetail, setBlogDetail }} />
      )}
    </>
  );
};

export default Editor;
