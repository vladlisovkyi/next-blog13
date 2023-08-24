
import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: any }) {
  await connectDb();
  const id = params.id;
  const userById = await User.findById(id);
  return NextResponse.json(userById);
}
