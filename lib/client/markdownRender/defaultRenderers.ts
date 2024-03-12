// Types
import type { Renderers, RenderersOptions, HeadingLevels } from './markdownRender.types';

export function getDefaultRenderers(
  { h, parse, codespan, unescape }: RenderersOptions
): Renderers {
  return {
    space: () => null,
    html: (token) => token.text,
    heading: (token) => {
      const level = token.depth as HeadingLevels;
      return h(`h${level}`, parse(token.tokens));
    },
    paragraph: (token) => {
      return h('p', parse(token.tokens));
    },
    text: (token) => {
      const textTokens = 'tokens' in token ? token.tokens : null;
      if (textTokens) {
        return parse(textTokens);
      }

      return unescape(token.text);
    },
    blockquote: (token) => {
      const quote = parse(token.tokens);
      return h('blockquote', quote);
    },
    list: (token) => {
      const items = token.items;
      const children = items.map((item) => {
        const listItemChildren = [];

        if (item.task) {
          listItemChildren.push(
            h('input', null, { type: 'checkbox', disabled: true, checked: item.checked })
          );
        }

        listItemChildren.push(parse(item.tokens));

        return h('li', listItemChildren);
      });

      return h(token.ordered ? 'ol' : 'ul', children);
    },
    code: (token) => {
      return h('pre', codespan(token.text, token.lang));
    },
    hr: () => h('hr'),

    // Inline
    strong: (token) => h('strong', parse(token.tokens)),
    em: (token) => h('em', parse(token.tokens)),
    del: (token) => h('del', parse(token.tokens)),
    codespan: (token) => codespan(unescape(token.text), null),
    link: (token) => {
      return h('a', parse(token.tokens), { href: token.href, target: '_blank' });
    },
    image: (token) => {
      return h('img', null, { src: token.href, alt: token.text, title: token.title });
    },
    br: () => h('br'),
    escape: (token) => unescape(token.text),
  };
}
