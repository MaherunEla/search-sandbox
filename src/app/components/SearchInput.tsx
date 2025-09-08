"use client";

import { useState, useEffect } from "react";
import { items } from "@/app/components/items";
import type { ApiResponse, Artwork } from "@/app/types";
import { highlightText } from "../utils/highlight";

function useDebounce(value: string, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Artwork[]>([]);

  const debouncedQuery = useDebounce(query, 400);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 2;

  useEffect(() => {
    if (!debouncedQuery) {
      setResults([]);
      setTotal(0);
      setPage(1);
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError("");

      try {
        const res = await fetch(
          `/api/search?q=${debouncedQuery}&page=${page}&limit=${limit}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data: ApiResponse<Artwork> = await res.json();
        setResults(data.results);
        setTotal(data.total);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery, page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-4">
      <div className="relative">
        <input
          type="search"
          role="searchbox"
          aria-label="Search artworks"
          placeholder="Search artworks...."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(1);
          }}
          className="border rounded px-3 py-2 w-full"
        />

        {/* {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            aria-label="Clear search"
          >
            x
          </button>
        )} */}
      </div>

      {loading && (
        <div className="mt-2 space-y-2">
          {[...Array(limit)].map((_, idx) => (
            <div key={idx} className="h-4 bg-gray-300 rounded animate-pulse">
              {" "}
            </div>
          ))}
        </div>
      )}
      {error && <p className="mt-2 text-red-500">Error: {error}</p>}

      <ul className="mt-2 border-t border-gray-200">
        {results.map((item) => (
          <li key={item.id} className="my-2">
            <div
              dangerouslySetInnerHTML={{
                __html: highlightText(item.title, query),
              }}
            />
            {item.description && (
              <p
                className="text-sm text-gray-600"
                dangerouslySetInnerHTML={{
                  __html: highlightText(item.description, query),
                }}
              />
            )}
          </li>
        ))}
      </ul>

      {totalPages > 1 && (
        <div className="mt-2 flex gap-2 items-center">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-2 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
