const  bcrypt  = require("bcrypt");
const mongoose = require("mongoose");
const authSchema = new mongoose.Schema({
  name: String,
  imageUrl: String,
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    // required: true, //for generic error
    required: ["Email is required"], //for specific error
    unique: true,
  },
  password: {
    type: String,
    required: ["Password is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});


authSchema.methods.verifyPassword = async(password,hashedPassword) =>{
    return bcrypt.compare(password,hashedPassword);
}
authSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        const hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        next();
    } else {
        next();
    }
});

const userModel = mongoose.model("Users", authSchema);

module.exports = { userModel };
