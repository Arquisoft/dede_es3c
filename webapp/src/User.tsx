import React, { useReducer, FC, createContext, ReactNode } from 'react';

enum UserActionType {
    SET_USER = 'SET_USER'
  }

interface UserState  {
    user: string
  }

  interface UserStateProps {
    children: ReactNode;
  }

  interface SetUserAction {
    type: typeof UserActionType.SET_USER;
    payload: string;
  }

  interface ContextProps {
      state: UserState;
      dispatch: {
          setUser:(user:string) => void;
      }
  }

  const userReducer = (state: UserState, action: SetUserAction): UserState => {
      if (action.type === UserActionType.SET_USER){
        return {
          user: action.payload
        }
      }
      else{
        return state;
      }
  }

  const localStorageUser = localStorage.getItem("currentUser");
  const initialState = {
      user: localStorageUser ? localStorageUser: "not logged"
  }

  export const UserContext = createContext({} as ContextProps);

  const UserState_: FC<UserStateProps> = ({children}) => {
      const [state, dispatch] = useReducer(userReducer, initialState);
      const setUser = (user: string) => {
        localStorage.setItem('currentUser', user);
        dispatch({
          type: UserActionType.SET_USER,
          payload: user
        });
      }

    return (
        <UserContext.Provider value = {{state, dispatch: {setUser}}}>
            {children}
        </UserContext.Provider>

    );
  }
  export default UserState_

