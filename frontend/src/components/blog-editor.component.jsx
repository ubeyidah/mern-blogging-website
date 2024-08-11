import React from "react";
import { Link } from "react-router-dom";

const BlogEditor = () => {
  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src="imgs/logo.png" alt="logo" />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1">Write Your Blog</p>
        <div className="flex gap-4 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>
    </>
  );
};

export default BlogEditor;
