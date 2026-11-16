import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FEATURED_COUNT, featuredProjects, getProject, hasMoreProjects, projects, type Project } from "./projects";

const fake = (slug: string): Project => ({ ...projects[0], slug });

describe("project list", () => {
  it("has unique slugs", () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("uses URL-safe slugs", () => {
    for (const p of projects) expect(p.slug).toMatch(/^[a-z0-9-]+$/);
  });

  it("has a screenshot file for every project", () => {
    for (const p of projects) expect(existsSync(join(process.cwd(), "public", p.screenshot)), p.slug).toBe(true);
  });

  it("gives every project at least one highlight with its technology", () => {
    for (const p of projects) {
      expect(p.highlights.length, p.slug).toBeGreaterThan(0);
      for (const h of p.highlights) expect(h.tech.length, `${p.slug}: ${h.title}`).toBeGreaterThan(0);
    }
  });
});

describe("featured projects and the 'more projects' link", () => {
  it("features at most FEATURED_COUNT projects, in order", () => {
    const list = ["a", "b", "c", "d", "e"].map(fake);
    expect(featuredProjects(list).map((p) => p.slug)).toEqual(["a", "b", "c"].slice(0, FEATURED_COUNT));
  });

  it("hides the link when every project is already on the home page", () => {
    expect(hasMoreProjects(["a", "b", "c"].slice(0, FEATURED_COUNT).map(fake))).toBe(false);
  });

  it("shows the link once there are more projects than the home page shows", () => {
    expect(hasMoreProjects(Array.from({ length: FEATURED_COUNT + 1 }, (_, i) => fake(`p${i}`)))).toBe(true);
  });

  it("finds a project by slug, and returns nothing for an unknown one", () => {
    expect(getProject("tldwatch")?.name).toBe("TLDWatch");
    expect(getProject("nope")).toBeUndefined();
  });
});
