'use client';

import React, { createContext, useState } from 'react';

// Constants
import { STATES } from '@/constants/connection';

type StateType = typeof STATES[keyof typeof STATES];

type ConnectionContextType = {
  state: StateType,
  setState: React.Dispatch<React.SetStateAction<StateType>>,
};

const initialValues: ConnectionContextType = Object.freeze({
  state: STATES.OFFLINE,
  setState: () => {},
});

export const ConnectionContext = createContext<ConnectionContextType>(initialValues);

export function ConnectionProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, setState] = useState<StateType>(STATES.OFFLINE);

  return (
    <ConnectionContext.Provider value={{
      state,
      setState
    }}>
      {children}
    </ConnectionContext.Provider>
  );
}
