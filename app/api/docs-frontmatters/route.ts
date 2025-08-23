import { NextResponse } from "next/server";
import { getAllDocsFrontmatter } from "@/lib/markdown";

export async function GET() {
  const data = await getAllDocsFrontmatter();
  return NextResponse.json(data);
}
