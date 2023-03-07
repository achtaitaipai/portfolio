import { join } from "node:path";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import type { Config } from "./types";
import {
  size,
  fluidSize,
  fontSize,
  readingSize,
  clr,
  font,
  fontWeight,
  zIndex,
} from "./tokens";

const config: Config = {
  outDir: "src/style",
  fileName: "tokens",
  variables: {
    clr,
    size,
    fluidSize,
    font,
    fontWeight,
    fontSize,
    readingSize,
    zIndex,
  },
  utilities: [
    {
      selector: "clr",
      property: "color",
      tokens: clr,
    },
    {
      selector: "bg",
      property: "background-color",
      tokens: clr,
    },
    {
      selector: "font",
      property: "font-family",
      tokens: font,
    },
    {
      selector: "font-size",
      property: "font-size",
      tokens: fontSize,
    },
    {
      selector: "font-weight",
      property: "font-weight",
      tokens: fontWeight,
    },
    {
      selector: "reading-size",
      property: "max-inline-size",
      tokens: readingSize,
    },
    {
      selector: "content-size",
      property: "width",
      tokens: fluidSize,
    },
    {
      selector: "padding",
      property: "padding",
      tokens: size,
    },
    {
      selector: "margin",
      property: "margin",
      tokens: size,
    },
    {
      selector: "padding-inline",
      property: "padding-inline",
      tokens: size,
    },
    {
      selector: "margin-inline",
      property: "margin-inline",
      tokens: size,
    },
    {
      selector: "padding-inline-start",
      property: "padding-inline-start",
      tokens: size,
    },
    {
      selector: "margin-inline-start",
      property: "margin-inline-start",
      tokens: size,
    },
    {
      selector: "padding-inline-end",
      property: "padding-inline-end",
      tokens: size,
    },
    {
      selector: "margin-inline-end",
      property: "margin-inline-end",
      tokens: size,
    },
    {
      selector: "padding-block",
      property: "padding-block",
      tokens: size,
    },
    {
      selector: "margin-block",
      property: "margin-block",
      tokens: size,
    },
    {
      selector: "padding-block-start",
      property: "padding-block-start",
      tokens: size,
    },
    {
      selector: "margin-block-start",
      property: "margin-block-start",
      tokens: size,
    },
    {
      selector: "padding-block-end",
      property: "padding-block-end",
      tokens: size,
    },
    {
      selector: "margin-block-end",
      property: "margin-block-end",
      tokens: size,
    },
    {
      selector: "gap",
      property: "gap",
      tokens: size,
    },
    {
      selector: "row-gap",
      property: "row-gap",
      tokens: size,
    },
    {
      selector: "column-gap",
      property: "column-gap",
      tokens: size,
    },
    {
      selector: (tokenName) => `.flow-block-${tokenName} > * + *`,
      property: "margin-block-start",
      tokens: size,
    },
    {
      selector: (tokenName) => `.flow-inline-${tokenName} > * + *`,
      property: "margin-inline-start",
      tokens: size,
    },
  ],
};

const main = async () => {
  if (!existsSync(config.outDir)) await mkdir(config.outDir);
  const outPath = join(config.outDir, config.fileName + ".css");
  const fileContent = generateVariables() + generateUtilities();
  await writeFile(outPath, fileContent);
};

const generateVariables = () => {
  const { variables } = config;
  if (!variables) return "";
  let out = ":root{";
  for (const [prefix, tokenList] of Object.entries(variables)) {
    for (const [name, value] of Object.entries(tokenList)) {
      out += `--${formatVariablePrefix(prefix)}-${name}:${value};`;
    }
  }
  out += "}";
  return out;
};

const generateUtilities = () => {
  const { utilities } = config;
  if (!utilities) return "";
  let out = utilities.reduce(
    (current, { selector: name, property, tokens }) => {
      let utilitie = "";
      for (const [tokenName, value] of Object.entries(tokens)) {
        if (typeof name === "string")
          utilitie += `.${name}-${tokenName}{${property}:${value};}`;
        else {
          utilitie += `${name(tokenName)}{${property}:${value};}`;
        }
      }

      return current + utilitie;
    },
    ""
  );
  return out;
};

const formatVariablePrefix = (prefix: string) =>
  prefix.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase());

main();
