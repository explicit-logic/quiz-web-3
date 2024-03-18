'use client';

import React, { createContext, useState } from 'react';

type ConnectionContextType = {
  established: boolean,
  loading: boolean,
  setEstablished: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
};

const initialValues: ConnectionContextType = Object.freeze({
  established: false,
  loading: false,
  setEstablished: () => {},
  setLoading: () => {},
});

export const ConnectionContext = createContext<ConnectionContextType>(initialValues);

export function ConnectionProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [established, setEstablished] = useState(initialValues.established);
  const [loading, setLoading] = useState(initialValues.loading);

  return (
    <ConnectionContext.Provider value={{
      established,
      loading,
      setEstablished,
      setLoading,
    }}>
      {children}
    </ConnectionContext.Provider>
  );
}
