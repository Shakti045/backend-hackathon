import mongoose from "mongoose";
import mailSender from "../util/mailSender.js";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 60 * 10,
    default: Date.now(),
  },
});

const sendVerificationMail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(email, "Verification Email", otp);
  } catch (error) {
    console.error(error.message);
  }
};

otpSchema.pre("save", async function (next) {

  if (this.isNew) {
    await sendVerificationMail(this.email, this.otp);
  }
  next();
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
