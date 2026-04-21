import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  // TODO: batch résumés Claude Haiku pour articles non encore résumés
  return NextResponse.json({ status: "todo", route: "summarize" });
}
