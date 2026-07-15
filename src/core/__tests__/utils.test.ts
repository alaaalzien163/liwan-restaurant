import { describe, it, expect } from "vitest";
import { cn, slugify, truncate } from "@core/lib/utils";

describe("cn", () => {
  it("merges class names correctly", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "visible")).toBe("base visible");
  });

  it("merges Tailwind classes correctly", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });
});

describe("slugify", () => {
  it("converts string to slug", () => {
    expect(slugify("Hello World")).toBe("hello-world");
  });

  it("removes special characters", () => {
    expect(slugify("Hello! @World#")).toBe("hello-world");
  });
});

describe("truncate", () => {
  it("truncates long strings", () => {
    expect(truncate("Hello World", 5)).toBe("Hello...");
  });

  it("does not truncate short strings", () => {
    expect(truncate("Hello", 10)).toBe("Hello");
  });
});
