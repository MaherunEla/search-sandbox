import { NextResponse } from "next/server";
//import { items } from "@/app/components/items";
import type { ApiResponse, Artwork } from "@/app/types";
import { prisma } from "@/lib/prisma";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const offset = (page - 1) * limit;
  //const items = await prisma.artwork.findMany();

  if (!q) {
    return NextResponse.json({
      results: [],
      total: 0,
      page,
      limit,
    });
  }

  const totalResult = await prisma.$queryRawUnsafe<{ count: bigint }[]>(
    `SELECT COUNT(*)::bigint as count
    FROM "Artwork"
    WHERE similarity(description, $1) > 0.3
    OR similarity(description,$1) > 0.3`,
    q
  );

  const total = Number(totalResult[0].count);

  const results = await prisma.$queryRawUnsafe<Artwork[]>(
    `
    SELECT * 
    FROM "Artwork"
    WHERE similarity(title,$1) > 0.3
    OR similarity(description, $1) > 0.3
    ORDER BY GREATEST(similarity(title,$1), similarity(description,$1)) DESC
    LIMIT $2 OFFSET $3;`,
    q,
    limit,
    offset
  );

  const response: ApiResponse<Artwork> = {
    results,
    total,
    page,
    limit,
  };

  return NextResponse.json(response);
}
