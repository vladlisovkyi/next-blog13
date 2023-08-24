import { connectDb } from "@/lib/connectDb";
import Category from "@/models/Category";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  await connectDb();
  const body = await req.json();
  const { name } = body;
  const category = await Category.create({ name });
  return NextResponse.json(category);
}

export async function GET(req: Request, res: NextApiResponse) {
  await connectDb();
  const categories = await Category.find();

  return NextResponse.json(categories);
}
