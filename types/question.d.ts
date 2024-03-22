import type { Token as _Token, Tokens as _Tokens, TokensList as _TokensList } from 'marked';

import type { TYPES as QUESTION_TYPES } from '@/constants/question';

declare global {
  export import Tokens = _Tokens;

  type Token = _Token;
  type TokensList = _TokensList;

  type Question = (Questions.MultipleChoice | Questions.MultipleResponse);

  namespace Questions {
    interface MultipleChoice {
      id: string;
      type: typeof QUESTION_TYPES.MC;

      items: Tokens.ListItem[];
    }

    interface MultipleResponse {
      id: string;
      type: typeof QUESTION_TYPES.MR;

      items: Tokens.ListItem[];
    }
  }

  type QuestionsList = Question[];
}
