// Modules
import { useEffect, useState } from 'react';

// Hooks
import Router from 'next/router';

export function useRouteLoading() {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url: string) => {
      if (url !== Router.asPath){
        setLoading(true);
      }
      console.log('start', url, Router.asPath);
    };
    const handleComplete = (url: string) => {
      if (url === Router.asPath) {
        setLoading(false);
      }
      console.log('end', url, Router.asPath);
    };

    Router.events.on('routeChangeStart', handleStart);
    Router.events.on('routeChangeComplete', handleComplete);
    Router.events.on('routeChangeError', handleComplete);

    return () => {
      Router.events.off('routeChangeStart', handleStart);
      Router.events.off('routeChangeComplete', handleComplete);
      Router.events.off('routeChangeError', handleComplete);
    };
  });

  return loading;
}
