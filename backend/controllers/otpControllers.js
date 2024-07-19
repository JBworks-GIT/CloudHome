//gkrm dtaz yule uali

const nodemailer = require('nodemailer');
const sendOTPMail = async(email,otp) =>{
  try{
  let mailer = nodemailer.createTransport({
    service : 'gmail',
    secure : true,
    port : 465,
    auth : {
    user : "app.cloud.home@gmail.com",
    pass : "gkrm dtaz yule uali",
    },
  })

  const response = await mailer.sendMail({
    from : "app.cloud.home@gmail.com",
    to: email,
    subject : "OTP verification for your account",
    html : `
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
}catch (err) {
  console.log(err);
  return false;
}
}

const generateOtp =async (req, res) => {
  try {
    const { email } = req.user;

    const isMailSent = await sendOTPMail(email,1200);

    if(!isMailSent){
      res.status(500).json({
        status : "fail",
        message : `otp not sent to ${email}`,
        data : {},
      })
    }

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

module.exports = { generateOtp };
