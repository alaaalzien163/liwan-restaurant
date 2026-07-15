import { NextResponse } from "next/server";

const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#E97C11"/>
  <text x="256" y="320" text-anchor="middle" font-family="system-ui, sans-serif" font-size="280" font-weight="bold" fill="white">L</text>
</svg>`;

export function GET() {
  return new NextResponse(SVG, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
