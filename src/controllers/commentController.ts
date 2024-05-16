import { Request, Response } from "express"


export const createComment = async(
    req:Request,
    res:Response,
) => {
    try{
        const reqBody = req.body;
        return res.status(200).json({message:"Comment added successfully"})
    } catch(err){
        res.status(500).json({message:"Internal server error occured"})
    }
}