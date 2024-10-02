// import express
import { Router } from "express";

// import Post controller
import postController, {
  getAllPublishedPosts,
  getSinglePublishedPost,
  updateAPost,
  deleteAPost,
} from "./../controller/post.controller";

// import authentication middleware
import { authenticate } from "./../auth/auth";

// create router
const router = Router();

// API endpoint structure
router.get("/", getAllPublishedPosts);
router.get("/:postId", postController, getSinglePublishedPost);
router.put("/:postId", authenticate, updateAPost); // protected route
router.delete("/:postId", authenticate, deleteAPost); // protected route

export default router;
