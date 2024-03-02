import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true,
    },
    review:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Review",
    },
    preference:[{
        type:String
    }]
})

const User = mongoose.model("User", userSchema);

export default User;