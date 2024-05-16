import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema({
    username: {type :String,required:true,unique:true},
    password: {type :String,required:true,unique:true},
    email : {type :String,required:true,unique:true},
    dob : {type :Date},
    phoneNumber: {type :String,unique:true,minLength:10,maxLength:10},
    nickName: {type :String},
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);

//Single SO
//