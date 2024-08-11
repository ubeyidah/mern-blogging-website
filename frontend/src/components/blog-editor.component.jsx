import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AnimationWrapper from "../common/page-animation";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "../common/firebase";
import toast from "react-hot-toast";
import Progress from "./Progress";
import EditorJS from "@editorjs/editorjs";
import { tools } from "./tools.component";

const BlogEditor = ({
  blog,
  setBlog,
  blogEditor,
  setBlogEditor,
  setEditorState,
}) => {
  const [progress, setProgress] = useState(0);
  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      // enter key
      e.preventDefault();
    }
  };
  const handleTitleChange = (e) => {
    const input = e.target;

    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
    setBlog((prev) => ({ ...prev, title: input.value }));
  };
  const handleBannerUpload = (e) => {
    const imgFile = e.target.files[0];
    if (imgFile) {
      const storage = getStorage(app);
      const storageRef = ref(storage, `images/${imgFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, imgFile);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progressLen =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setProgress(Math.floor(progressLen));
        },
        (error) => {
          toast.error("Faild to upload banner.");
          console.log(error);
          setProgress(0);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          setProgress(0);
          setBlog((prev) => ({ ...prev, banner: url }));
        }
      );
    }
  };
  const editorRef = useRef(null);
  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = new EditorJS({
        holder: "blogEditor",
        data: "",
        tools: tools,
        placeholder: "Let's write an awesome story",
      });
      setBlogEditor(editorRef.current);
    }
  }, []);

  const handlePublish = async () => {
    try {
      if (!blog.banner)
        return toast.error("Please upload banner image to publish");
      else if (!blog.title)
        return toast.error("Please write blog title to publish");
      if (blogEditor.isReady) {
        const data = await blogEditor.save();
        if (data.blocks.length <= 0 || !data) {
          return toast.error("Please write some content to publish");
        } else {
          setBlog((prev) => ({ ...prev, content: data }));
          setEditorState("publish");
        }
      }
    } catch (error) {
      toast.error("Error publishing");
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={"imgs/logo.png"} alt="logo" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1">
          {blog.title || "New Blog"}
        </p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublish}>
            Publish
          </button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full">
            <div className="relative aspect-video bg-white border-4 border-grey">
              <label htmlFor="uploadBanner" className="cursor-pointer">
                {progress ? (
                  <Progress
                    progress={progress}
                    className="flex items-center justify-center h-full min-w-full px-5"
                  />
                ) : (
                  <img
                    src={blog.banner || "imgs/blog banner.png"}
                    alt="blog banner image"
                    className="z-20 hover:opacity-60"
                  />
                )}

                <input
                  type="file"
                  id="uploadBanner"
                  accept=".png,.jpg,.jpeg"
                  hidden
                  disabled={progress}
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full outline-none resize-none mt-8 leading-tight placeholder:opacity-40"
              onKeyDown={handleKeyDown}
              onChange={handleTitleChange}
              value={blog.title}
            />
            <p className="text-sm text-dark-grey/60 mb-3">
              Drag an image from your computer or paste an image URL from online
              to add images or videos.
            </p>
            <hr className="w-full opacity-10 mt-1 " />
            <div id="blogEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export default BlogEditor;
