import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "please provide first name"],
      minlength: 3,
      maxlength: 50,
    },
    lastName: {
      type: String,
      required: [true, "please provide last name"],
      minlength: 3,
      maxlength: 50,
    },
    phoneNumber: {
      type: String,
      required: [true, "please provide phone number"],
      minlength: 3,
      maxlength: 15,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "please provide email"],
      validate: {
        validator: validator.isEmail,
        message: "please provide email",
      },
    },
    password: {
      type: String,
      required: [true, "please provide password"],
      minlength: 6,
    },
    wallet: {
      type: Number,
      default: 0.0,
    },
    // wallet: {
    //   type: Number,
    //   default: 0,
    // },

    isVerified: {
      type: Boolean,
      default: false,
    },
    bvnVerified: {
      type: Boolean,
      default: false,
    },
    verifiedToken: {
      type: String,
      default: "",
    },
    verified: {
      type: Date,
    },
  },
  { timestamps: true }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const ismatch = await bcrypt.compare(candidatePassword, this.password);
  return ismatch;
};

export default mongoose.model("User", UserSchema);
