export type Article = {
  id: string;
  title: string;
  text: string;
  author: string;
  tags: string[];
  createdAt: string; // ISO date string
  readingTimeMin?: number; // approximate reading time in minutes
  imageUrl?: string;
};
