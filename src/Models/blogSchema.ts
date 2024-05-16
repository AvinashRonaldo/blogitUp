import mongoose, { Schema,model } from "mongoose";
import { slugifyTitle } from "../Helpers";

const blogSchema  = new Schema({
    title : {type :String,required:true,unique:true},
    description:{type :String,required:true},
    body:{type :Object,required:true},
    tags : [String],
    authoredBy: {type :String,required:true},
    slug : {type :String},
},{timestamps:true});

blogSchema.pre("save",async function(next){
    if (this.isNew || this.isModified(this.title)) {
        this.slug = await slugifyTitle(this.title);
    }
    next();
})

export const Blog = mongoose.model("Blog",blogSchema);