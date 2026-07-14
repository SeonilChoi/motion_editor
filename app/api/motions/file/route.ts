import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { assertCsvName, ensureMotionRoot, resolveSafeMotionPath } from "@/lib/motionDir";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "path query param required" }, { status: 400 });
  }

  try {
    assertCsvName(path.basename(filePath));
    ensureMotionRoot();
    const resolved = resolveSafeMotionPath(filePath);

    if (!fs.existsSync(resolved)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const content = fs.readFileSync(resolved, "utf-8");
    return new NextResponse(content, {
      headers: { "Content-Type": "text/csv; charset=utf-8" },
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}

export async function PUT(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const filePath = searchParams.get("path");

  if (!filePath) {
    return NextResponse.json({ error: "path query param required" }, { status: 400 });
  }

  try {
    assertCsvName(path.basename(filePath));
    ensureMotionRoot();
    const resolved = resolveSafeMotionPath(filePath);
    const content = await request.text();

    fs.writeFileSync(resolved, content, "utf-8");
    return NextResponse.json({ ok: true, path: filePath });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 400 });
  }
}
