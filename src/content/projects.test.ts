import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { projects } from "./projects";

describe("project list", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("has a screenshot file for every project", () => {
    for (const p of projects) expect(existsSync(join(process.cwd(), "public", p.screenshot)), p.slug).toBe(true);
  });

  it("links every project to its live site and GitHub repo", () => {
    for (const p of projects) {
      expect(p.url, p.slug).toMatch(/^https:\/\//);
      expect(p.repo, p.slug).toMatch(/^https:\/\/github\.com\//);
    }
  });
});
