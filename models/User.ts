import mongoose, { Schema, models } from "mongoose";

const userSchema = new Schema({
  username: String, // Add the username field
  email: String,
  password: String, // Store content as Markdown or your chosen markup format
});

const User = models.User || mongoose.model("User", userSchema);

export default User;
