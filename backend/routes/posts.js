import express from "express";
const router = express.Router();
import Post from "../models/Post.js"; // Note the .cjs extension will be removed later

// @route   GET api/posts
// @desc    Get posts with pagination, search, and optional author filters
// @access  Public
router.get("/", async (req, res) => {
  try {
    const {
      page = 1,
      limit = 5,
      search = "",
      authorId,
      excludeAuthorId,
    } = req.query;

    const numericPage = parseInt(page, 10) || 1;
    const numericLimit = parseInt(limit, 10) || 5;

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { author: { $regex: search, $options: "i" } },
      ];
    }

    // Include only posts from a specific author
    if (authorId) {
      query.authorId = authorId;
    }

    // Exclude posts from a specific author
    if (excludeAuthorId && !authorId) {
      query.authorId = { $ne: excludeAuthorId };
    }

    const posts = await Post.find(query)
      .limit(numericLimit)
      .skip((numericPage - 1) * numericLimit)
      .sort({ createdAt: -1 })
      .exec();

    const count = await Post.countDocuments(query);

    res.json({
      posts,
      totalPages: Math.ceil(count / numericLimit),
      currentPage: numericPage,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/posts/:id
// @desc    Get single post by ID
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   POST api/posts
// @desc    Create a post
// @access  Public
router.post("/", async (req, res) => {
  const { title, content, author, authorId, imageUrl } = req.body;

  // Simple validation
  if (!title || !content || !author || !authorId) {
    return res
      .status(400)
      .json({ msg: "Please enter all fields including authorId" });
  }

  try {
    const newPost = new Post({
      title,
      content,
      author,
      authorId,
      imageUrl: imageUrl || null,
    });

    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/posts/:id
// @desc    Update a post
// @access  Public
router.put("/:id", async (req, res) => {
  const { title, content, author, userId, imageUrl } = req.body;

  // Simple validation
  if (!title || !content || !author || !userId) {
    return res
      .status(400)
      .json({ msg: "Please enter all fields including userId" });
  }

  try {
    let post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the user is the author of the post
    if (post.authorId.toString() !== userId) {
      return res.status(403).json({ msg: "You can only edit your own posts" });
    }

    post.title = title;
    post.content = content;
    post.author = author;
    post.imageUrl = imageUrl || null;

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post
// @access  Public
router.delete("/:id", async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ msg: "User ID is required" });
    }

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check if the user is the author of the post
    if (post.authorId.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "You can only delete your own posts" });
    }

    await Post.deleteOne({ _id: req.params.id });
    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

export default router;
