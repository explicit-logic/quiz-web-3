import type { Tokens as _Tokens, Token as _Token, TokensList as _TokensList } from 'marked';

import { TYPES } from '@/constants/question';

declare global {
  export import Tokens = _Tokens;

  type Token = _Token;
  type TokensList = _TokensList;

  type Question = (Questions.MultipleChoice | Questions.MultipleResponse);

  namespace Questions {
    interface MultipleChoice {
      id: string;
      type: typeof TYPES.MC;

      items: Tokens.ListItem[];
    }

    interface MultipleResponse {
      id: string;
      type: typeof TYPES.MR;

      items: Tokens.ListItem[];
    }
  }

  type QuestionsList = Question[];
}
