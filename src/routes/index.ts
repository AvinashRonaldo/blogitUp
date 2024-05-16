import { Router } from "express";
import { createBlog, deleteBlog, getBlogById, getBlogBySlug, getBlogs, updateBlog } from "../controllers";
import { verifyToken } from "../Middleware/verifyJwt";
import { login, register, updateUser } from "../controllers/userController";
export const router = Router();

router.post("/blog",verifyToken,createBlog);
router.get("/blog",getBlogs);
router.get("/blog/:blogId",getBlogById);
router.get("/blog/:blogId",getBlogBySlug);
router.delete("/blog/:blogId",verifyToken,deleteBlog);
router.put("/blog/:blogId",verifyToken,updateBlog);
router.post("/login",login);
router.post("/register",register);
router.put("/user/profile",verifyToken,updateUser);

