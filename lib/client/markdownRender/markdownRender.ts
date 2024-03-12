// Modules
import { createElement, ElementType, Fragment, ReactElement, ReactNode } from 'react';

// Types
import type { ParserTokens, Renderers, RenderersOptions } from './markdownRender.types';

// Helpers
import { getDefaultRenderers } from './defaultRenderers';

export function process(
  tokensList: TokensList,
  getRenders: (params: RenderersOptions) => Partial<Renderers> = () => ({}),
)
{
  let id = 0;

  const renderersParams = {
    codespan,
    getId,
    h,
    parse,
    unescape,
  };

  const renderers = {
    ...getDefaultRenderers(renderersParams),
    ...(getRenders ? getRenders(renderersParams) ?? {} : {}),
  } as Record<string, (token: Token) => ReactNode>;

  function codespan(code: ReactNode, lang: string | null = null) {
    const className = lang ? `language-${lang}` : null;
    return h('code', code, { className });
  }

  function getId() {
    return (id++).toString();
  }

  function h<T extends ElementType>(el: T, children: ReactNode = null, props = {}): ReactElement {
    const elProps = {
      key: getId(),
    };

    return createElement(el, { ...props, ...elProps }, children);
  }

  function parse(tokens: ParserTokens = []): ReactNode[] {
    return tokens.map(parseToken);
  }

  function parseToken(token: Token): ReactNode {
    const type = token.type as keyof Renderers;
    if (renderers[type]) {
      return renderers[type](token);
    } else {
      console.warn(`Token with "${token.type}" type was not found`); // eslint-disable-line no-console
      return null;
    }
  }

  const children = parse(tokensList);

  return createElement(Fragment, null, children);
}

const htmlUnescapes: Record<string, string> = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': '\'',
};

/** Used to match HTML entities and HTML characters. */
const reEscapedHtml = /&(?:amp|lt|gt|quot|#(?:0+)?39);/g;
const reHasEscapedHtml = RegExp(reEscapedHtml.source);

function unescape(str = '') {
  return reHasEscapedHtml.test(str) ? str.replace(reEscapedHtml, (entity) => htmlUnescapes[entity] || '\'') : str;
}

