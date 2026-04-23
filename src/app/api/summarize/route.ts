import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST() {
  return NextResponse.json({
    message: "Résumés générés à la demande dans le reader",
  });
}

export async function GET() {
  return NextResponse.json({
    message: "Résumés générés à la demande dans le reader",
  });
}
