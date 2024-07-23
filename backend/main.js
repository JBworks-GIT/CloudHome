require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/authRoutes.js")
require("./config/db.js"); //
const cors = require("cors");
const otpRouter = require("./routes/otpRoutes.js");
const folderRouter = require("./routes/folderRoutes.js");

const verifyToken = require("./middlewares/verifyToken.js");
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("App is running...");
});
app.use(cors({origin:true}));
app.use(express.json());
app.use("/api/v1/auth", authRouter)

app.use(verifyToken);

app.use("/api/v1/otp", otpRouter)
app.use("/api/v1/folder", folderRouter)


app.listen(process.env.PORT,()=>{
  console.log(`------------------ App Listening at ${process.env.PORT} ---------------`);
});