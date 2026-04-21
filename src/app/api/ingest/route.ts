import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  // TODO: fetch + parse RSS feeds, dedupe by URL, upsert articles
  return NextResponse.json({ status: "todo", route: "ingest" });
}
