import { nanoid } from "nanoid";
import { blogSchema } from "../validation/blog.validation.js";
import Blogs from "../Schema/Blog.js";
import Users from "../Schema/User.js";

export const createBlog = async (req, res) => {
  try {
    const currentUser = req.user;
    let { title, banner, content, des, tags, draft } = req.body;
    const { error } = blogSchema.validate({
      title,
      banner,
      content,
      des,
      tags,
      blocks: content.blocks,
    });
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    tags = tags.map((tag) => tag.toLowerCase());
    const blogId =
      title.replace(/[^a-zA-z0-9]/g, " ").replace(/\s+/g, "-") + nanoid();
    const newBlog = await Blogs({
      blog_id: blogId,
      title,
      des,
      banner,
      content,
      tags,
      draft: Boolean(draft),
      author: currentUser._id,
    }).save();
    const incrementValue = draft ? 0 : 1;
    await Users.findOneAndUpdate(
      { _id: currentUser._id },
      {
        $inc: { "account_info.total_posts": incrementValue },
        $push: { blogs: newBlog._id },
      }
    );
    res.status(200).json({ id: newBlog._id });
  } catch (error) {
    console.log("Error: on create blog => ", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
