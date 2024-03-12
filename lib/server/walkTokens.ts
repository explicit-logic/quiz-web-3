import { getQuizConfig } from '@/lib/server/getQuizConfig.mjs';

export function walkTokens({ locale, slug, tokens }: { locale: string, slug: string, tokens: TokensList }) {
  const quizConfig = getQuizConfig();

  function walk(_tokens: TokensList = tokens) {
    for (let idx = 0; idx < _tokens.length; idx++) {
      const swap = (newToken: Token) => {
        _tokens[idx] = newToken;
        walkToken(newToken, swap);
      };
      walkToken(_tokens[idx], swap);
    }
  }

  function walkToken(token: Token, swap: (newToken: Token) => void) {
    switch (token.type) {
    case 'image': walkImage(token as Tokens.Image); break;
    case 'paragraph': walkParagraph(token as Tokens.Paragraph, swap); break;
    }

    // Has children
    if ('tokens' in token) {
      walk(<TokensList>token.tokens);
    }
  }

  function walkImage(token: Tokens.Image) {
    if (!token.href.startsWith('./')) { return; }

    const fileName = (token.href ?? '').replace('./', '');
    token.href = `${quizConfig.basePath ?? ''}/images/${locale}/${slug}/${fileName}`;
  }

  function walkParagraph(token: Tokens.Paragraph, swap: (newToken: Token) => void) {
    if ('tokens' in token && token.tokens?.length === 1) {
      const [firstChildToken] = token.tokens;
      if (firstChildToken.type === 'image') {
        swap(firstChildToken);
      }
    }
  }

  walk();
}
