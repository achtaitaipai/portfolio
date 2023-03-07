export type Tokens = { [key: string]: string };
export type TokensLists = { [key: string]: Tokens };
type utilityAction = (tokenName: string) => string;
export type Utility = {
  selector: string | utilityAction;
  property: string;
  tokens: Tokens;
};

export type Config = {
  outDir: string;
  fileName: string;
  variables?: TokensLists;
  utilities?: Utility[];
};
