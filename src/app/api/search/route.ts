import { NextResponse } from "next/server";
import { items } from "@/app/components/items";
import type { ApiResponse, Artwork } from "@/app/types";
import { fuzzyScore } from "@/app/utils/fuzzy";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const query = q.toLowerCase();
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "2");

  let filtered: { item: Artwork; score: number }[] = items.map((item) => ({
    item,
    score: fuzzyScore(query, item),
  }));

  filtered = filtered.filter((f) => f.score > 0);

  filtered.sort((a, b) => b.score - a.score);

  const start = (page - 1) * limit;
  const paginated = filtered.slice(start, start + limit).map((f) => f.item);

  const response: ApiResponse<Artwork> = {
    results: paginated,
    total: filtered.length,
    page,
    limit,
  };

  return NextResponse.json(response);
}
