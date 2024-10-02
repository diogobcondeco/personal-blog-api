// import express
import { Router } from "express";

// import user controller
import { getAllPosts } from "./../controller/user.controller";

// import authentication middleware
import { authenticate, signup, login } from "./../auth/auth";

// create router
const router = Router();

// API endpoint for an author
router.get("/author", authenticate, getAllPosts);

// API endpoint for signup and login
router.post("/auth/signup", signup);
router.post("/auth/login", login);

export default router;
