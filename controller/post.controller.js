// import the Post model object
const Post = require('./../model/Post.model');

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
exports.getSinglePublishedPost = async (req, res) {
  try {
    const post = await Post.findById(req.params.postId)
    .where('state')
    .eq('published');

    if (!post) {
      return res.status(404).json({
        status: 'Failed',
        message: 'Post with given Id not found',
      })
    } else {
      // increment the `readCount` property
      post.readCount === 0 ? post.readCount++ : post.readCount++;
      await post.save();
    }

    res.status(200).json({
      status: 'success',
      post,
    });
  } catch (error) {
    throw error;
  }
}

// create a post
// update a post
// delete a post