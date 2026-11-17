// The steps every project goes through, shown as the pipeline in the hero and
// on the share image.

export type Step = { name: string };

export const pipeline: Step[] = [
  { name: "Idea" },
  { name: "Spec" },
  { name: "Tests" },
  { name: "Build" },
  { name: "Review" },
  { name: "CI" },
  { name: "Deploy" },
];
