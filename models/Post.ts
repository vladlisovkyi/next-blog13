import mongoose, { Schema, models } from "mongoose";

const postSchema = new Schema(
  {
    title: String,
    content: String,
    image: String,
    authorId: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  },
  {
    timestamps: true,
  }
);

const Post = models.Post || mongoose.model("Post", postSchema);

export default Post;
