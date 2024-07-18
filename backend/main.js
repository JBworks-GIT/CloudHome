require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/authRoutes.js")
require("./config/db.js"); //
const cors = require("cors");
const app = express();
app.use(express.json());


app.get("/", (req, res) => {
  res.send("App is running...");
});
app.use(cors({origin:true}));

app.use("/api/v1/auth", authRouter)

app.listen(process.env.PORT,()=>{
  console.log(`------------------ App Listening at ${process.env.PORT} ---------------`);
});