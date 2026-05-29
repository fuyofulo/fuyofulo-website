import { NextResponse } from "next/server";
import { incrementVisitorCount } from "../../../lib/visitor-count";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    const count = await incrementVisitorCount();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json(
      { error: "failed to increment" },
      { status: 500 },
    );
  }
}
