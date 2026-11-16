// The steps every project goes through, shown in the hero and in "How I ship".

export type Step = {
  name: string;
  detail: string;
  tools: string[];
};

export const pipeline: Step[] = [
  {
    name: "Idea",
    detail: "An agent interviews me about the idea until every decision is made and written down.",
    tools: ["Agent skills"],
  },
  {
    name: "Spec",
    detail: "The decisions become a spec, split into small tickets that each deliver something working.",
    tools: ["Specs", "Tickets"],
  },
  {
    name: "Tests",
    detail: "Each ticket starts with a failing test, so \"done\" means something before any code exists.",
    tools: ["Vitest", "Playwright"],
  },
  {
    name: "Build",
    detail: "Coding agents implement one slice at a time until the tests pass.",
    tools: ["Coding agents", "MCP"],
  },
  {
    name: "Review",
    detail: "Every change is reviewed against the spec and the project's standards before it's merged.",
    tools: ["Code review"],
  },
  {
    name: "CI",
    detail: "Type checks, lint and tests run on every push. Red means it doesn't ship.",
    tools: ["GitHub Actions"],
  },
  {
    name: "Deploy",
    detail: "Each branch gets a preview URL; main goes to production.",
    tools: ["Vercel"],
  },
];
