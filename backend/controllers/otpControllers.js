//gkrm dtaz yule uali

const nodemailer = require("nodemailer");
const OtpModel = require("../model/otpSchema");
const {userModel} = require("../model/userModel");
const sendOTPMail = async (email, otp) => {
  try {
    let mailer = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: "app.cloud.home@gmail.com",
        pass: "gkrm dtaz yule uali",
      },
    });

    const response = await mailer.sendMail({
      from: "app.cloud.home@gmail.com",
      to: email,
      subject: "OTP verification for your account",
      html: `
        <html>
          <body>
            <h1>Your OTP fro Cloud Home App is </h1>
            <h1>${otp}</h1>
          </body>
        </html>
    `,
    });
    console.log(response);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

const generateOtp = async (req, res) => {
  try {
    const { email, _id } = req.user;
    const restrictedTimeForOTP = 10 * 60 * 1000;

    const sentOtpMail = await OtpModel.findOne({
      email,
      createdAt: {
        $gte: Date.now() - restrictedTimeForOTP,
      },
    });

    if (sentOtpMail) {
      res.status(200);
      res.json({
        status: "success",
        message: `otp is already sent at ${email}`,
        data: {
          expiresAt: sentOtpMail.createdAt,
        },
      });
      return;
    }
    const randomOtp = Math.floor(Math.random() * 9000 + 1000);
    const isMailSent = await sendOTPMail(email, randomOtp);

    if (!isMailSent) {
      res.status(500).json({
        status: "fail",
        message: `otp not sent to ${email}`,
        data: {},
      });
      return;
    }

    await OtpModel.create({
      otp: randomOtp,
      email,
      userId: _id,
    });

    // create a entry in database with that OTP

    res.status(201);
    res.json({
      status: "success",
      message: `Otp sent to ${email}`,
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: " Internal Server Error",
      data: err,
    });
  }
};

const verifyOtp = async (req,res) => {
  try {
    const { otp } = req.body;
    const { email } = req.user;
    const restrictedTimeForOTP = 10 * 60 * 1000;

    const sentOtpMail = await OtpModel.findOne({
      email,
      createdAt: {
        $gte: Date.now() - restrictedTimeForOTP,
      },
    });
    if (!sentOtpMail) {
      res.status(404);
      res.json({
        status: "fail",
        message: "Verification failed. please generate new OTP",
      });
      return;
    }
    console.log(sentOtpMail);
    const hashOtp = sentOtpMail.otp;
    const isCorrect = await sentOtpMail.verifyOtp(otp+ "", hashOtp);

    if (!isCorrect) {
      res.status(400);
      res.json({
        status: "fail",
        message: "Incorrect OTP ",
      });
      return;
    }
    console.log(userModel);
    await userModel.findOneAndUpdate({ email }, { isEmailVerified: true });
    res.status(200);
    res.json({
      status: "success",
      message: `Verification succesful`,
      data: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: "fail",
      message: " Internal Server Error",
    });
  }
};
module.exports = { generateOtp, verifyOtp };
