import fs from "fs";
import path from "path";

export function getMotionRoot(): string {
  if (process.env.MOTION_DIR) {
    return path.resolve(process.env.MOTION_DIR);
  }
  return path.resolve(process.cwd(), "data", "motions");
}

export function ensureMotionRoot(): string {
  const root = getMotionRoot();
  if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }
  return root;
}

export function assertCsvName(name: string): void {
  if (name.includes("/") || name.includes("\\") || name.includes("..")) {
    throw new Error("Invalid file name");
  }
  if (!name.toLowerCase().endsWith(".csv")) {
    throw new Error("Only .csv files are allowed");
  }
}

export function resolveSafeMotionPath(relativePath: string): string {
  const root = getMotionRoot();
  const normalized = path.normalize(relativePath);
  const resolved = path.resolve(root, normalized);
  if (!resolved.startsWith(root + path.sep) && resolved !== root) {
    throw new Error("Path escape attempt");
  }
  return resolved;
}
