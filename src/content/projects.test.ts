import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FEATURED_COUNT, featuredProjects, projects, type Project } from "./projects";

const fake = (slug: string): Project => ({ ...projects[0], slug });

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

describe("featured projects", () => {
  it("features at most FEATURED_COUNT projects, in order", () => {
    const list = ["a", "b", "c", "d", "e"].map(fake);
    expect(featuredProjects(list).map((p) => p.slug)).toEqual(["a", "b", "c"].slice(0, FEATURED_COUNT));
  });
});
