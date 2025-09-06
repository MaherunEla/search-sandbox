export type Artwork = {
  id: number;
  title: string;
  description: string;
  author: string;
};

export type ApiResponse<T> = {
  results: T[];
  total: number;
  page: number;
  limit: number;
};
