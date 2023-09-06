const ErrorHandler = require("../utils/errorhandler");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel")
const sendEmail = require("../utils/sendEmail.js")
const crypto = require("crypto")

//Register a User

exports.registerUser = catchAsyncErrors( async(req,res,next) =>{
    const {name,email,password}= req.body;

    const user = await User.create({
        name,email,password,
        avatar:{
            public_id:"sample id",
            url:"sample url"
        }
    });
    sendToken(user,201,res);

})


// Login User

exports.loginUser = catchAsyncErrors( async(req,res,next) => {

    const {email,password} = req.body;
    //checking ig user has given password and email both 
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email & Password",400));
    }
    console.log(email,password);
    const user = await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("invalid email or password",401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if(!isPasswordMatched){
        return next(new ErrorHandler("invalid email or password",401));
    }


    sendToken(user,200,res);
})

// Logout User

exports.logout = catchAsyncErrors( async(req,res,next) =>{

    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true
    });

    res.status(200).json({
        success:true,
        message:"Logged Out",
    });
})

// Forgot password

exports.forgotPassword = catchAsyncErrors( async(req,res,next) => {
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return next(new ErrorHandler("User not found",400));
    }
    //Get password token 
    const resetToken = user.getResetPasswordToken();
    await user.save({validateBeforeSave:false});

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = ` Your password reeset token is : \n\n ${resetPasswordUrl} \n\n If uou have not requested this then please ignore`

    try{
        await sendEmail({
            email:user.email,
            subject:`ecommerce password recovery`,
            message,
        });
        res.status(200).json({
            success:true,
            message:`Email sent to ${user.enail} successfully`,
        })
    } catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        await user.save({validateBeforeSave:false});

        return next(new ErrorHandler(error.message,500));
    }

});

exports.resetPassword = catchAsyncErrors(async(req,res,next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await user.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt: Date.now() },
    });

    if(!user){
        return next(new ErrorHandler("Reset password token is invalid or has beeen expired",400));
    }
    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHandler("password does not match",400));
    }

    user.password = req.body.password ;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user,200,res);
})