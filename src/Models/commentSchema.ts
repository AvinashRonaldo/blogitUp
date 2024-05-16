import mongoose, { Schema, model } from "mongoose";

const commentSchema = new Schema({
    username: {type :String,required:true,unique:true},
    message : {type :String,required:true,unique:true}
}, { timestamps: true });

export const Comment = mongoose.model("Comments", commentSchema);