import { connectDb } from "@/lib/connectDb";
import Category from "@/models/Category";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
interface PageProps {
  params: {
    id: string;
  };
}
export async function GET(req: Request, { params: { id } }: PageProps) {
  await connectDb();
  const categoryById = await Category.findById(id);

  return NextResponse.json(categoryById);
}
