const Post = require("../../models/post");
const User = require("../../models/user");

const posts = async (postIds) => {
  try {
    const posts = await Post.find({ _id: { $in: postIds } });
    return posts.forEach((post) => {
      return {
        ...post._doc,
        _id: post.id,
        author: user.bind(this, user._doc.author),
      };
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const user = async (userId) => {
  try {
    const user = await User.findById(userId);
    return {
      ...user._doc,
      _id: user.id,
      email: user.email,
      createdPosts: posts.bind(this, user._doc.createdPosts),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = {
  createPost: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      const author = await User.findById(req.userId);
      if (author.createdPosts.length > 10) {
        throw new Error("File capacity exceeded");
      }

      const imageUrl = req.file || "sampleString";
      const caption = args.caption || "";
      const comment = args.comment || "";
      const authorId = req.userId;

      const newPost = new Post({
        author: authorId,
        caption: caption,
        comment: comment,
        imageUrl: imageUrl,
      });

      const result = await newPost.save();

      author.createdPosts.push(newPost);

      await author.save();
      return {
        ...result._doc,
        _id: result.id,
        user: user.bind(this, result.author),
        caption: result.caption,
        comment: result.comment,
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString(),
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
  getPostById: async (args, req) => {
    try {
      if (!req.isAuth) {
        throw new Error("Unauthenticated!");
      }
      const result = await Post.findById(args.id);

      return {
        ...result._doc,
        _id: result.id,
        author: user.bind(this, result.author),
        caption: result.caption,
        comment: result.comment,
        likes: result.likes,
        dislikes: result.dislikes,
        createdAt: new Date(result._doc.createdAt).toISOString(),
        updatedAt: new Date(result._doc.updatedAt).toISOString(),
      };
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};
