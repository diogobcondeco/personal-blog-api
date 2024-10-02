// import express
const express = require("express");

// import Post controller
const postController = require("./../controllers/post.controller");

// import authentication middleware
const authController = require("./../auth/user.auth");

// create router
const router = express.Router();

// API endpoint structure
router.get("/", postController.getAllPublishedPosts);
router.get("/:postId", postController.getSinglePublishedPost);
router.put("/:postId", authController.authenticate, postController.updateAPost); // protected route
router.delete(
  "/:postId",
  authController.authenticate,
  postController.deleteAPost
); // protected route

module.exports = router;
