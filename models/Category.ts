import mongoose, { Schema, models } from "mongoose";

const categorySchema = new Schema({
  name: String,
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Category = models.Category || mongoose.model("Category", categorySchema);

export default Category;
