import { TYPES } from '@/constants/question';

export function extractQuestions(tokens: TokensList): QuestionsList {
  const questions: QuestionsList = [];
  let id = 0;
  function getId() {
    return `q-${++id}`;
  }

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
    case 'list': extractFromList(token as Tokens.List, swap); break;
    }

    // Has children
    if ('tokens' in token) {
      walk(<TokensList>token.tokens);
    }
  }

  function extractFromList(token: Tokens.List, swap: (newToken: Token) => void) {
    const { ordered } = token;
    const id = getId();
    swap({
      type: 'link',
      href: id,
      raw: 'Q',
    });

    if (ordered) {
      questions.push({
        id,
        type: TYPES.MC,
        items: token.items,
      });
    } else {
      questions.push({
        id,
        type: TYPES.MR,
        items: token.items,
      });
    }
  }

  walk();

  return questions;
}
