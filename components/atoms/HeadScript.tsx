import React from 'react';

function getScript({ locale }: { locale: string }) {
  return `
  try {
    const mode = window.localStorage.getItem('theme-mode') ?? 'auto';
    const computedMode =
      mode === 'auto' ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') : mode;

    if (computedMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.setAttribute('lang', '${locale}');
  } catch (e) {}
`;
}

function HeadScript(props: { locale: string }) {
  const { locale } = props;

  return (
    <script dangerouslySetInnerHTML={{
      __html: getScript({ locale }),
    }} />
  );
}

export default HeadScript;
