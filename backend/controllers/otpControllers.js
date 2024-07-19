const generateOtp = (req, res) => {
  try {
    const { email } = req.query;
    
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

module.exports = { generateOtp };
