import { describe, it, expect } from "vitest";
import { parseTags } from "../text";

describe("parseTags", () => {
  it("splits by commas, trims, and removes empties", () => {
    expect(parseTags("react, hooks, mobx")).toEqual(["react", "hooks", "mobx"]);
    expect(parseTags("  a ,  b, , c ,, ")).toEqual(["a", "b", "c"]);
  });

  it("keeps order and duplicates", () => {
    expect(parseTags("a, a, b")).toEqual(["a", "a", "b"]);
  });

  it("handles empty and whitespace-only input", () => {
    expect(parseTags("")).toEqual([]);
    expect(parseTags("   ")).toEqual([]);
  });

  it("handles unicode and mixed spacing", () => {
    expect(parseTags("тест, пример , теги")).toEqual(["тест", "пример", "теги"]);
  });
});
