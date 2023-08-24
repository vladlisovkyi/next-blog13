import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const path = req.nextUrl.searchParams.get("path");
  const token = req.nextUrl.searchParams.get("token");
  if (!token || token !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Not Authorized" });
  }
  if (!path) throw new Error("Path not found");
  revalidatePath(path);
  revalidatePath("/");
  revalidateTag("posts");
  revalidateTag("categories");
  return NextResponse.json({ revalidated: true, now: Date.now() });
}
