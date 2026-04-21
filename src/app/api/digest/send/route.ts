import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  // TODO: top 10 de la semaine → Resend → tous les DigestSubscriber actifs
  return NextResponse.json({ status: "todo", route: "digest/send" });
}
