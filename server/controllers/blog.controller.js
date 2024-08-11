export const createBlog = async (req, res) => {
  try {
    const { title, banner, content, des, tags } = req.body;
  } catch (error) {
    console.log("Error: on create blog => ", error.message);
    res
      .status(error.status || 500)
      .json({ message: error.message || "Internal server error" });
  }
};
