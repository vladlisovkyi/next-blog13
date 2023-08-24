import { connectDb } from "@/lib/connectDb";
import User from "@/models/User";
import { NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function POST(req: Request, res: NextApiResponse) {
  await connectDb();
  const body = await req.json();
  const { username, email, password } = body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    console.log("User already exists");
    console.log(existingUser);
    return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }
  const newUser = await User.create({
    username,
    email,
    password,
  });
  await newUser.save();
  return NextResponse.json(newUser);
}
