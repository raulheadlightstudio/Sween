import React, {createContext, useReducer} from 'react';
import {
  initialRegisterState,
  registerReducer,
} from '../reducers/registerReducer';
import RegisterActions from '../actions/registerActions';

export const GlobalRegisterContext = createContext();

const RegisterContext = ({children}) => {
  const [registerState, dispatchRegister] = useReducer(
    registerReducer,
    initialRegisterState,
  );

  return (
    <GlobalRegisterContext.Provider
      value={{registerState, RegisterActions, dispatchRegister}}>
      {children}
    </GlobalRegisterContext.Provider>
  );
};

export default RegisterContext;
