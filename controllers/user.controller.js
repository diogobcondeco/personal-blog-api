// import post model
const Post = require("../models/Post.model");

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      authorId: req.user._id,
    });

    res.status(200).json({
      status: "success",
      posts,
    });
  } catch (error) {
    throw error;
  }
};
