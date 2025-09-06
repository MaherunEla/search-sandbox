import { Artwork } from "../types";
import { get as levenshteinDistance } from "fast-levenshtein";

function similarity(a: string, b: string) {
  a = a.toLowerCase();
  b = b.toLowerCase();
  const distance = levenshteinDistance(a, b);
  const maxLen = Math.max(a.length, b.length);
  if (maxLen === 0) return 1;
  return 1 - distance / maxLen;
}

export function fuzzyScore(query: string, artwork: Artwork): number {
  if (!query) return 0;
  let score = 0;

  if (artwork.title) score += similarity(query, artwork.title) * 50;

  if (artwork.description) score += similarity(query, artwork.description) * 30;

  if (artwork.author) score += similarity(query, artwork.author) * 20;

  return score;
}
