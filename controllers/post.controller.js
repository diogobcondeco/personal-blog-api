// import the Post model object
const Post = require('../models/Post.model');
const User = require('../models/User.model');

// get posts (all published posts)
exports.getAllPublishedPosts = async (req, res) => {
  try {
    const posts = await Post.find({ state: "published" });

    res.status(200).json({
      status: 'success',
      posts
    })
  } catch (error) {
    throw error;
  }
}

// get a single post (with state, published)
exports.getSinglePublishedPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId)
      .where("state")
      .eq("published");

    if (!post) {
      return res.status(404).json({
        status: "Failed",
        message: "Post with given Id not found",
      });
    } else {
      // increment the `readCount` property
      post.readCount === 0 ? post.readCount++ : post.readCount++;
      await post.save();
    }

    res.status(200).json({
      status: "success",
      post,
    });
  } catch (error) {
    throw error;
  }
};

// create a post
exports.createAPost = async (req, res) => {
  try {
    const { title, description, tags, body } = req.body;

    // calculate read time of post from the body passed in
    const wpm = 225; // wpm => word per min
    const numberOfWords = body.trim().split(/\s+/).length;
    const readTime = Math.ceil(numberOfWords / wpm);

    // get author name and author id
    let { first_name, last_name } = req.user;
    let author = `${first_name} ${last_name}`;
    let authorId = req.user._id;

    const post = await Post.create({
      title,
      description,
      tags,
      body,
      author,
      authorId,
      readTime,
    });

    // add the new created post to 'posts' array property on the user document
    let user = await User.findById(req.user._id);
    user.posts.push(post._id);
    await user.save(); // save changes made to the user doc

    // send back response
    res.status(201).json({
      status: 'success',
      post,
    });
  } catch (error) {
    throw error;
  }
}

// update a post
exports.updateAPost = async (req, res) => {
  const { state, body } = req.body;

  try {
    const post = await Post.findByIdAndUpdate(
      req.params.postId,
      {
        $set: { state, body },
      },
      { new: true }
    );

    // check if post belongs to the user initiating the request
    if (post.authorId.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        status: "Fail",
        message: `You can only update a post you created!`,
      });
    }

    res.status(200).json({
      status: 'success',
      post
    });
  } catch (error) {
    throw error;
  }
}

// delete a post
exports.deleteAPost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.postId, {
      authorId: req.user.id,
    });

    if (!post) {
      return res.status(404).json({
        status: 'Fail',
        message: 'Post with given Id not found',
      });
    }

    // delete post from 'posts' array in user the document
    const postByUser = await User.findById(req.user._id);
    postByUser.posts.pull(post._id);
    await postByUser.updateOne({ posts: postByUser.posts });

    // return deleted post
    res.status(200).json({
      status: 'success',
      message: 'Post deleted successfully',
    })
  } catch (error) {
    throw error;
  }
};
