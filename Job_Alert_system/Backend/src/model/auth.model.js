import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: [true, "fullname is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    verified: {
      type: Boolean,
      default: false,
    },
    subscribed: {
      type: Boolean,
      default: true,
    },
    preferences: {
      techStack: { 
        type: [String],
        required: [true , "tech stack is required"]

       },
      remoteType: {
        type: String,
        enum: ["remote", "onsite"],
        default: "onsite",
      },
    },
  },
  { timestamps: true },
);




userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();      // Only hash if password changed
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  return await bcrypt.compare(plainPassword, this.password);
};

export default mongoose.model("User", userSchema);
