import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Types
// import type { AbstractIntlMessages } from 'next-intl';
// import type { RequestConfig } from 'next-intl/server';
import type { IntlConfig } from 'use-intl/core';

type RequestConfig = Omit<IntlConfig, 'locale'>;


export default getRequestConfig(
  async ({ locale }) => {
    const json = <{ default: object }>(await import(`./messages/${locale}.json`));
    if (!json) {
      notFound();
    }

    const messages = json.default;

    return {
      messages,
    } as RequestConfig;
  }
);
