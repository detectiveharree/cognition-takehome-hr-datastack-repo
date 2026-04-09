import { NextResponse } from "next/server";
import { getDocsStructure } from "@/lib/docs.server";

export async function GET() {
  const structure = getDocsStructure();
  return NextResponse.json(structure);
}
