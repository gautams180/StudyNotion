const User = require("../models/User");
const OTP = require("../models/OTP");
const Profile = require("../models/Profile");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//sendOTP
exports.sendOTP = async (req,res) => {

    try {
        //fetch email from request ki body
        const {email} = req.body;

        //check if user already exists
        const checkUserPresent = await User.findOne({email});

        if(checkUserPresent) {
            return res.status(401).json({
                success:false,
                message:'User already registered',
            })
        }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets:false,
            lowerCaseAlphabets:false,
            specialChars:false,
        });
        console.log("OTP generated: ",otp);

        //check unique otp or not
        let result = await OTP.findOne({otp: otp});

        //jab tk collection me otp mil rha, naya otp generate krte rho
        while(result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets:false,
                lowerCaseAlphabets:false,
                specialChars:false,
            });
            result = await OTP.findOne({otp: otp});
            console.log("Result: " , result);
        }

        //otp ka object bna lo db me entry k liye 
        const otpPayload = {email,otp}

        //create an entry for otp in DB
        const otpBody = await OTP.create(otpPayload);
        console.log(otpBody);

        //return response successfully
        res.status(200).json({
            success:true,
            message:'OTP Sent Successfully',
            otp, 
        })

    }
    catch(error) {
        console.log(error);
        res.status(500).json({
            success:false,
            message:error.message,
        })
    }

};


//signup
exports.signUp = async(req, res) => {
    try {

        //data fetch from request ki body
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
        } = req.body;

        //validate krlo
        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp ) {
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            })
        }

        //2 password match krlo
        if(password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message:"Password and ConfirmPassword Value does not match, please try again"
            });
        }

        //check user already exists or not
        const existingUser = await User.findOne({email:email});
        if(existingUser) {
            return res.status(400).json({
                success:false,
                message:"User is already registered",
            });
        }

        //find most recent OTP stored for the user
        const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);          //iss query se most recent entry fetch krte hai 
        console.log(recentOtp);

        //validate OTP - check kro otp entered by user DB se laaye otp k equal hai ya nhi
        if(recentOtp.length == 0) {
            //OTP not found
            return res.status(400).json({
                success:false,
                message:'OTP not found',
            })
        } else if(otp !== recentOtp[0].otp) {
            //Invalid OTP
            return res.status(400).json({
                success:false,
                message:"Invalid OTP",
            })
        }

        //Hash Password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create entry in DB

        const profileDetails = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
        })

        const user = await User.create({
            firstName,
            lastName,
            email,
            contactNumber,
            password: hashedPassword,
            accountType,
            additionalDetails: profileDetails._id,
            image:`http://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`  //name se image create hoga profile pic k liye
        })

        //return yes
        return res.status(200).json({
            success:true,
            message:'User is registered successfully',
            user,
        });
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"User cannot be registered"
        });
    }
}

//Login
exports.login = async (req, res) => {
    try {

        //get data from req body
        const {email , password} = req.body;

        //validation data
        if(!email || !password) {
            return res.status(403).json({
                success:false,
                message:"All fields are required",
            });
        }

        //user check exist or not
        let user = await User.findOne({email}).populate("additionalDetails");
        if(!user) {
            return res.status(401).json({
                success:false,
                message:"User is not registered, please signup first"
            });
        }

        //generate JWT, after password matching
        if(await bcrypt.compare(password, user.password)) {
            const payload = {
                email : user.email,
                id: user._id,
                accountType: user.accountType,
            } 
            //creating jwt
            const token = jwt.sign(payload, process.env.JWT_SECRET,{
                expiresIn:"2h"
            });
            user = user.toObject(); 
            user.token = token;
            user.password = undefined;

            //create cookie and send response
            const options = {
                expires: new Date(Date.now() + 3*24*60*60*1000),
                httpOnly:true,
            }
            res.cookie("token", token, options).status(200).json({
                success:true,
                token,
                user,
                message:'Logged in successfully',
            })

        }
        else {
            return res.status(401).json({
                success:false,
                message:'Password is incorrect',
            });
        }

    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Login Failure, please try again",
        });
    }
}

//TODO:Homework

//change Password
exports.changePassword = async (req,res) => {
    try {
        //get data from req body
        const email = req.body.email;
        const user = User.findOne({email});

        if(!user) {
            return res.json({
                success:false,
                message:'Your email is not registered with us'
            })
        }

        //get old password, newPassword, confirmNewPassword
        const oldPassword = user.password;
        const {newPassword, confirmNewPassword} = req.body;

        //validation
        if(newPassword !== confirmNewPassword) {
            return res.json({
                success:false,
                message:'Password not matching',
            });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        
        //update pwd in DB
        await User.findOneAndUpdate(
            {email:email},
            {password:hashedPassword},
            {new:true}
        )

        //send mail - Password updated
        await mailSender(
            email,
            "Password Updated Successfully" 
        )

        //return response
        return res.status(200).json({
            success:true,
            message:"Password Updated Successfully",
        })
    }
    catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Password cannot be updated"
        })
    }
}