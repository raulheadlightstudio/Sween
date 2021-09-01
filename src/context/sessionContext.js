import React, { createContext, useReducer } from 'react';
import {
  initialSessionState,
  sessionReducer,
} from '../reducers/sessionReducer';
import SessionActions from '../actions/sessionActions';

export const GlobalSessionContext = createContext();

const SessionContext = ({ children }) => {
  const [sessionState, dispatchSession] = useReducer(
    sessionReducer,
    initialSessionState
  );

  return (
    <GlobalSessionContext.Provider
      value={{ sessionState, SessionActions, dispatchSession }}
    >
      {children}
    </GlobalSessionContext.Provider>
  );
};

export default SessionContext;
