import { Artwork } from "../types";

export function fuzzyScore(query: string, artwork: Artwork): number {
  const q = query.toLowerCase();
  let score = 0;

  if (artwork.title.toLowerCase() === q) score += 100;
  else if (artwork.title.toLowerCase().includes(q)) score += 50;

  if (artwork.description?.toLowerCase().includes(q)) score += 30;

  if (artwork.author?.toLowerCase() === q) score += 20;
  else if (artwork.author?.toLowerCase().includes(q)) score += 20;

  return score;
}
