import User from "../model/User.js";
import dotenv from "dotenv";
import Otp from "../model/Otp.js";
import jwt from "jsonwebtoken";
import otpGenerator from "otp-generator";
import Review from '../model/Review.js'

export const auth = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(401).json({
        success: false,
        message: "missing field",
      });
    }

    const existingUser=await User.findOne({email});
    const response=await Otp.find({email}).sort({createdAt: -1}).limit(1);

    console.log(response);
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    if(!existingUser){
        await User.create({email:email})
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "user doesn't able to login",
      });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      {expiresIn:"24h"}
    );

    user.token = token;
    console.log("token",token)
    return res.status(200).json({
      success: true,
      message: "user authenticate successfully",
      token: token,
      email:email
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while authenticate user",
    });
  }
};

export const otp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "missing field",
      });
    }

    const otp= otpGenerator.generate(4,{
        upperCaseAlphabets:false,
        lowerCaseAlphabets:false,
        specialChars:false,
    })

    const result =await Otp.findOne({otp:otp});
    console.log("otp",otp);
    while(result){
        otp=otpGenerator.generate(4,{
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        })
    }

    const otpPayload={email,otp};
    const otpBody=await Otp.create(otpPayload);
  

    res.status(200).json({
        success: true,
        message: `OTP Sent Successfully`,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "something went wrong while otp sending",
    });
  }
};

export const review=async(req,res)=>{
    try{
        const {review}=req.body;
        if(!review){
            return res.status(400).json({
                success:false,
                message:"Please add review first"
            })
        }

        const reviewCreated=await Review.create({review});

        return res.status(200).json({
            success:true,
            message:"review added successfully",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Something went wrong while creating review"
        })
    }
}

export const savePreference=async(req,res)=>{
  try{
    console.log("inside preference")
    const {preference}=req.body;
    const {id}=req.user;
    console.log("preference",preference);
    console.log(id)
    if(!preference){
      return res.status(400).json({
        success:false,
        message:"Please add review first"
    })
    }
    const updatedUser=await User.findByIdAndUpdate({_id:id},{preference:preference},{new:true});

    return res.status(200).json({
      success:true,
      message:"user preferenced saved successfully"
    })
  }
  catch(error){
    console.log(error);
    return res.status(500).json({
      success:false,
      message:"Something went wrong while saving your preference"
    })
  }
}
