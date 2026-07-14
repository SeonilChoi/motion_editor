import fs from "fs";
import { NextResponse } from "next/server";
import { ensureMotionRoot } from "@/lib/motionDir";

export async function GET() {
  try {
    const root = ensureMotionRoot();
    const entries = fs.readdirSync(root, { withFileTypes: true });
    const files = entries
      .filter((e) => e.isFile() && e.name.toLowerCase().endsWith(".csv"))
      .map((e) => {
        const stat = fs.statSync(`${root}/${e.name}`);
        return {
          name: e.name,
          relativePath: e.name,
          size: stat.size,
          mtime: stat.mtime.toISOString(),
        };
      })
      .sort((a, b) => a.name.localeCompare(b.name));
    return NextResponse.json(files);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
