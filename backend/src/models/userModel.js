import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// abhi keliye temporary schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/,
    unique: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  cart : 
  {
    type: 
    [
      {
        order: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'order',
          required: true
        },
        quantity:
        {
          type: Number,
          default: 1,
          min: 1
        }

      }
    ],
    default: []
  }
}, { timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Method to compare password during login
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("user", userSchema);
export default User;