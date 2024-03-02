import mongoose from "mongoose";

const reviewSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    review:{
        type:String,
    }
})

const Review=mongoose.model("Review",reviewSchema);

export default Review;