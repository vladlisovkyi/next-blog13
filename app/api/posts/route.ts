import { connectDb } from "@/lib/connectDb";
import Category from "@/models/Category";
import Post from "@/models/Post";
import { NextApiRequest, NextApiResponse } from "next";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  await connectDb();
  const body = await req.json();
  const { title, content, category, image, authorId } = body;

  const post = await Post.create({
    title,
    content,
    category,
    image,
    authorId,
  });

  await Category.findByIdAndUpdate(category, {
    $push: { posts: post._id },
  });
  revalidateTag("posts");
  revalidateTag("categories");
  revalidatePath("/");
  return NextResponse.json(post);
}

export async function GET(req: NextRequest, res: NextApiResponse) {
  await connectDb();
  revalidateTag("posts");
  revalidateTag("categories");
  revalidatePath("/");
  const posts = await Post.find();
  return NextResponse.json(posts);
}
