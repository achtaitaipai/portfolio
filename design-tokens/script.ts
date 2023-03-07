import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  clr,
  darkColors,
  fluidSize,
  font,
  fontSize,
  fontWeight,
  readingSize,
  size,
} from "./tokens";
import type { Config, TokenGroup, TokenValues } from "./types";

const config: Config = {
  outDir: "src/style",
  fileName: "tokens",
  tokens: [
    {
      variablesPrefix: "clr",
      values: clr,
      utilities: [
        {
          property: "color",
          selector: "color",
        },
        {
          property: "background-color",
          selector: "bg",
        },
      ],
    },
    {
      variablesPrefix: "dark-clr",
      values: darkColors,
    },
    {
      variablesPrefix: "font",
      values: font,
    },
    {
      variablesPrefix: "font-weight",
      values: fontWeight,
      utilities: [{ property: "font-weight", selector: "font-weight" }],
    },
    {
      variablesPrefix: "font-size",
      values: fontSize,
      utilities: [{ property: "font-size", selector: "font-size" }],
    },
    {
      variablesPrefix: "reading-size",
      values: readingSize,
    },
    {
      variablesPrefix: "fluid-size",
      values: fluidSize,
    },
    {
      variablesPrefix: "size",
      values: size,
      utilities: [
        {
          selector: "padding",
          property: "padding",
        },
        {
          selector: "padding-inline",
          property: "padding-inline",
        },
        {
          selector: "padding-block",
          property: "padding-block",
        },
        {
          selector: "padding-inline-start",
          property: "padding-inline-start",
        },
        {
          selector: "padding-block-start",
          property: "padding-block-start",
        },
        {
          selector: "padding-inline-end",
          property: "padding-inline-end",
        },
        {
          selector: "padding-block-end",
          property: "padding-block-end",
        },
        {
          selector: "margin",
          property: "margin",
        },
        {
          selector: "margin-inline",
          property: "margin-inline",
        },
        {
          selector: "margin-block",
          property: "margin-block",
        },
        {
          selector: "margin-inline-start",
          property: "margin-inline-start",
        },
        {
          selector: "margin-block-start",
          property: "margin-block-start",
        },
        {
          selector: "margin-inline-end",
          property: "margin-inline-end",
        },
        {
          selector: "margin-block-end",
          property: "margin-block-end",
        },
        {
          selector: "gap",
          property: "gap",
        },
        {
          selector: (tokenName) => `.flow-block-${tokenName} > * + *`,
          property: "margin-block-start",
        },
        {
          selector: (tokenName) => `.flow-inline-${tokenName} > * + *`,
          property: "margin-inline-start",
        },
      ],
    },
  ],
};

const main = async () => {
  if (!existsSync(config.outDir)) await mkdir(config.outDir);
  const outPath = join(config.outDir, config.fileName + ".css");
  await writeFile(outPath, fileContent(config.tokens));
};

const fileContent = (tokens: TokenGroup[]) => {
  let variablesContent = ":root{";
  let utilitiesContent = "";
  tokens.forEach(({ values, variablesPrefix, utilities }) => {
    if (variablesPrefix) {
      iterateTokens(values, (name, value) => {
        variablesContent += `--${variablesPrefix}-${name}:${value};`;
      });
    }
    utilities?.forEach(({ selector, property }) => {
      iterateTokens(values, (name, value) => {
        const selectorValue =
          typeof selector === "string"
            ? `.${selector}-${name}`
            : `${selector(name)}`;
        const tokenValue = variablesPrefix
          ? `var(--${variablesPrefix}-${name})`
          : value;
        utilitiesContent += `${selectorValue}{${property}:${tokenValue};}`;
      });
    });
  });
  variablesContent += "}";
  return variablesContent + utilitiesContent;
};

const iterateTokens = (
  tokens: TokenValues,
  callback: (name: string, value: string) => void
) => {
  for (const token of Object.entries(tokens)) {
    callback(...token);
  }
};

main();
