const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const { otpTemplate } = require("../mail/template/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required: true,
    },
    otp:{
        type:String,
        required: true,
    },
    createdAt:{
        type:Date,
        default: Date.now(),
        expires: 5*60,
    },
});

// function to send mail 
async function sendVerificationMail(email , otp) {
    try{
        const mailResponse = await mailSender(email , "Verification email from GossipGram" , otpTemplate(otp));
        console.log("Email sent Seccessfully ", mailResponse);


    }catch(error){
        console.log("error occurred while send mail function :",error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next) {
    await sendVerificationMail(this.email , this.otp);
    next();

})


module.exports = mongoose.model("OTP", OTPSchema);
