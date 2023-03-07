import { TokenValues } from "./types";

export const size = {
  1: " .25rem",
  2: " .5rem",
  3: " 1rem",
  4: " 1.25rem",
  5: " 1.5rem",
  6: " 1.75rem",
  7: " 2rem",
  8: " 3rem",
  9: " 4rem",
  10: " 5rem",
  11: " 7.5rem",
  12: " 10rem",
  13: " 15rem",
  14: " 20rem",
  15: " 30rem",
};

export const fluidSize = {
  base: "clamp(20rem, 90vw, 80rem)",
};

export const fontSize = {
  base: "1.4rem",
  heading: "clamp(2rem, 4vw, 3.5rem);",
  display: "clamp(4rem, 8vw, 7rem);",
};

export const readingSize = {
  small: "15ch",
  base: "60ch",
  large: "70ch",
};

export const clr = {
  "neutral-0": "#ffffff",
  "neutral-1": "#f8f9fa",
  "neutral-2": "#e9ecef",
  "neutral-3": "#dee2e6",
  "neutral-4": "#ced4da",
  "neutral-5": "#adb5bd",
  "neutral-6": "#868e96",
  "neutral-7": "#495057",
  "neutral-8": "#343a40",
  "neutral-9": "#212529",
  "neutral-10": "#16191d",
  "neutral-11": "#0d0f12",
  "neutral-12": "#030507",
};

export const darkColors = Object.entries(clr).reduce<TokenValues>(
  (result, entrie, index) => {
    const [key, value] = entrie;
    const name = key.replace(/[0-9]+/, () => (12 - index).toString());
    return { ...result, ...{ [name]: value } };
  },
  {}
);

export const font = {
  sans: " system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif",
  serif: " ui-serif, serif",
  mono: " Dank Mono, Operator Mono, Inconsolata, Fira Mono, ui-monospace,  SF Mono, Monaco, Droid Sans Mono, Source Code Pro, monospace",
};

export const fontWeight = {
  1: "100",
  2: "200",
  3: "300",
  4: "400",
  5: "500",
  6: "600",
  7: "700",
  8: "800",
  9: "900",
};
