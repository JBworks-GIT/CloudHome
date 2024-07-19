const express = require("express");
const { generateOtp } = require("../controllers/otpControllers");

const otpRouter = express.Router();

otpRouter.get("/generate",generateOtp);
module.exports = authRouter;