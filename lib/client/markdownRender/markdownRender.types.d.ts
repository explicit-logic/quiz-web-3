import type { ElementType, ReactElement, ReactNode } from 'react';

export type HeadingLevels = 1 | 2 | 3 | 4 | 5 | 6;

export type ParserTokens = Token[] | TokensList;

export type Parse = (tokens: ParserTokens) => ReactNode;

export type Props = {
  render: RenderHandler;
  tokensList: TokensList;
};

export type RenderHandler = (params: RenderersOptions) => Partial<Renderers>;

export type Renderers = {
  space: (token: Tokens.Space) => ReactNode;
  heading: (token: Tokens.Heading) => ReactNode;
  paragraph: (token: Tokens.Paragraph) => ReactNode;
  text: (token: Tokens.Text) => ReactNode;
  blockquote: (token: Tokens.Blockquote) => ReactNode;
  list: (token: Tokens.List) => ReactNode;
  code: (token: Tokens.Code) => ReactNode;
  html: (token: Tokens.HTML) => ReactNode;
  hr: (token: Tokens.Hr) => ReactNode;

  strong: (token: Tokens.Strong) => ReactNode;
  em: (token: Tokens.Em) => ReactNode;
  del: (token: Tokens.Del) => ReactNode;
  codespan: (token: Tokens.Codespan) => ReactNode;
  link: (token: Tokens.Link) => ReactNode;
  image: (token: Tokens.Image) => ReactNode;
  br: (token: Tokens.Br) => ReactNode;
  escape: (token: Tokens.Escape) => ReactNode;
};

export type RenderersOptions = {
  codespan: (text: string, lang?: string | null) => ReactNode;
  getId: () => string;
  h: <T extends ElementType>(el: T, children?: ReactNode, props?: object) => ReactElement;
  parse: Parse;
  unescape: (text: string) => string;
};
