type utilityAction = (tokenName: string) => string;
type Utility = {
  selector: string | utilityAction;
  property: string;
};

export type TokenValues = { [key: string]: string };

export type TokenGroup = {
  variablesPrefix?: string;
  values: TokenValues;
  utilities?: Utility[];
};

export type Config = {
  outDir: string;
  fileName: string;
  tokens: TokenGroup[];
};
