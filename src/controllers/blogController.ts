import { Request,Response } from "express";
import { Blog } from "../Models";
import { convertDateToString, slugifyTitle } from "../Helpers";
import { Date } from "mongoose";


export const createBlog = async(
    req: Request,
    res:Response ) => {
    try{
        const requestBody = req.body;
        const {title,description,body,tags} = requestBody;
        const {username} = req.user;
        const newBlog = new Blog();
        newBlog.title = title;
        newBlog.description = description;
        newBlog.body=body;
        newBlog.tags = tags;
        newBlog.authoredBy = username;
        await newBlog.save();
        return res.status(200).json({message:"Blog created successfully"});
    } catch(err){
        console.log(err);
        return res.status(500).json({ message: "Internal server Error Occured"});
    }
}

export const getBlogs = async (
    req: Request,
    res: Response) => {
    try {
        const blogs = await Blog.find({});
        blogs.forEach(async(blog) => {
            blog.slug = await slugifyTitle(blog.title);
        })
        return res.status(200).json({ message: blogs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server Error Occured" });
    }
}

export const getBlogById = async (
    req: Request,
    res: Response) => {
    try {
        const blogId = req.params.blogId
        const blogs = await Blog.findById(blogId);
        if(!blogs){
            return res.status(400).json({message:"Blog not found"})
        }
        return res.status(200).json({ message: blogs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server Error Occured" });
    }
}

export const getBlogBySlug = async (
    req: Request,
    res: Response) => {
    try {
        const slug = req.params.slugId;
        const blogs = await Blog.findOne({slug:slug});
        if(!blogs){
            return res.status(400).json({message:"Blog not found"})
        }
        return res.status(200).json({ message: blogs });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server Error Occured" });
    }
}

export const updateBlog = async (
    req: Request,
    res: Response) => {
    try {
        const blogId = req.params.blogId;
        const requestBody = req.body;
        const blogToUpdate = await Blog.findByIdAndUpdate(blogId,requestBody,{new:true});
        return res.status(200).json({ message: "Blog updated successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server Error Occured" });
    }
}

export const deleteBlog = async (
    req: Request,
    res: Response) => {
    try {
        const blogId = req.params.blogId;
        const blogToDelete = await Blog.findByIdAndDelete(blogId);
        return res.status(200).json({ message: "Blog deleted successfully" });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal server Error Occured" });
    }
}
