import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { User } from "../Models";
import { tokenSecret } from "../providers/locals";
import * as  jwt from "jsonwebtoken";


export const login = async(
    req:Request,
    res : Response,
) => {
    try{
        const {username,password} = req.body;
        const userDetails = await User.findOne({username:username})
        if(!userDetails){
            return res.status(400).json({message:"User not present,Please register first"});
        }
        const hashedPassword = userDetails.password;
        const isvalidPass = await bcrypt.compare(password,hashedPassword)
        if(isvalidPass){
            const payload = {
                username : userDetails.username,
                email : userDetails.email
            }
            const accessToken = jwt.sign(payload,tokenSecret,{expiresIn:'1d'})
            return res.status(200).json({message:accessToken});
            
        }
        return res.status(400).json({message:"Invalid Credentials"});
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error",err});
    }
}

export const register = async(
    req: Request,
    res: Response,
) => {
    try{
        const {username,password,email,dob} = req.body;
        const salt = await bcrypt.genSalt(5)
        const hashedPassword = await bcrypt.hash(password,salt) as any;
        const newUser = new User();
        newUser.username = username;
        newUser.password = hashedPassword as string;
        newUser.email = email;
        newUser.dob = new Date(dob);
        await newUser.save();
        return res.status(200).json({message:"User Registered successfully"});
    }catch(err){
        return res.status(500).json({message:"Internal server error",err});
    }
}

export const updateUser = async(
    req:Request,
    res:Response
) => {
    try{
        const {phoneNumber,nickName} = req.body;
        const {username,email} = req.user;
        const user = await User.findOne({usernname:username,email:email})
        if(!user){
            return res.status(400).json({message:"User not exists"})
        }
        user.phoneNumber = phoneNumber;
        user.nickName = nickName;
        await user.save();
        return res.status(200).json({message:"User profile updated successfully"});
    } catch(err){
        console.log(err);
        return res.status(500).json({message:"Internal server error"})
    }
}