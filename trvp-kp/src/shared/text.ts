/**
 * Parse comma-separated tags string into array of non-empty trimmed tags.
 * Keeps order and duplicates (matches current UI logic).
 */
export const parseTags = (input: string): string[] => {
  return input
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
};
