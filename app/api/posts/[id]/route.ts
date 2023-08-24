import { connectDb } from "@/lib/connectDb";
import Category from "@/models/Category";
import Post from "@/models/Post";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

interface PageProps {
  params: {
    id: string;
  };
}

export async function GET(req: Request, { params: { id } }: PageProps) {
  await connectDb();
  const postById = await Post.findById(id);

  return NextResponse.json(postById);
}

export async function DELETE(req: Request, { params: { id } }: PageProps) {
  await connectDb();
  const postById = await Post.findById(id);
  const categoryId = await postById.category;
  await Post.findByIdAndDelete(postById);
  const category = await Category.findById(categoryId);
  category.posts = category.posts.filter(
    (postId: string) => postId.toString() !== id.toString()
  );
  await category.save();
  revalidateTag("posts");
  revalidateTag("categories");
  return NextResponse.json(postById);
}
