'use client';

import React, { createContext, useEffect, useMemo, useState } from 'react';

// Constants
import { EVENTS, STATES } from '@/constants/connection';

// Lib
import { eventEmitter } from '@/lib/client/eventEmitter';

type StateType = typeof STATES[keyof typeof STATES];

type ConnectionContextType = {
  state: StateType,
};

const initialValues: ConnectionContextType = Object.freeze({
  state: STATES.OFFLINE,
});

export const ConnectionContext = createContext<ConnectionContextType>(initialValues);

export function ConnectionProvider({ children }: Readonly<{
  children: React.ReactNode;
}>) {
  const [state, setState] = useState<StateType>(STATES.OFFLINE);

  useEffect(() => {
    const onClose = () => {
      setState(STATES.OFFLINE);
    };

    const onLoading = () => {
      setState(STATES.LOADING);
    };

    const onOpen = () => {
      setState(STATES.ONLINE);
    };

    const onError = () => {
      setState(STATES.ERROR);
    };

    const handlers = {
      [EVENTS.LOADING]: onLoading,
      [EVENTS.OPEN]: onOpen,
      [EVENTS.CLOSE]: onClose,
      [EVENTS.ERROR]: onError,
    };

    for (const [eventName, handler] of Object.entries(handlers)) {
      eventEmitter.on(eventName, handler);
    }

    return () => {
      for (const [eventName, handler] of Object.entries(handlers)) {
        eventEmitter.off(eventName, handler);
      }
    };
  }, []);

  const value = useMemo(() => ({
    state,
  }), [state]);

  return (
    <ConnectionContext.Provider value={value}>
      {children}
    </ConnectionContext.Provider>
  );
}
