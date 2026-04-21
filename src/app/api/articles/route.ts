import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  // TODO: API publique JSON — listing paginé d'articles
  return NextResponse.json({ status: "todo", route: "articles" });
}
