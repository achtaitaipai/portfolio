import { join } from "node:path";
import { writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

type TokensLists = { [key: string]: { [key: string]: string } };

type Config = {
  outDir: string;
  fileName: string;
  tokensLists: TokensLists;
};

const config: Config = {
  outDir: "src/style/generated",
  fileName: "tokens",
  tokensLists: {
    clr: {
      "neutral-000": "hsl(0, 0%, 0%)",
      "neutral-700": "hsl(0, 0%, 94%)",
      "neutral-900": "hsl(0, 0%, 100%)",
    },
  },
};

const main = async () => {
  if (!existsSync(config.outDir)) await mkdir(config.outDir);
  const outPath = join(config.outDir, config.fileName + ".css");
  await writeFile(outPath, "hello");
};

const generateVariables = () => {
  const { tokensLists } = config;
  let out = "";
  for (const [prefix, tokenList] of Object.entries(tokensLists)) {
    for (const [name, value] of Object.entries(tokenList)) {
      out += `--${prefix}-${name}:${value};`;
    }
  }
  console.log(out);
};

// main();
generateVariables();
