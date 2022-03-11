import { Password } from '@mui/icons-material';
import React, { useReducer, FC, createContext, ReactNode } from 'react';
import { User } from './shared/shareddtypes';

enum UserActionType {
    SET_USER = 'SET_USER'
  }

interface UserState  {
    user: string
  };

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
          //setLogged:(isLogged:boolean) => void
      }
  }

  const userReducer = (state: UserState, action: SetUserAction): UserState => {
      switch(action.type){
          case UserActionType.SET_USER:
              return {
                  user: action.payload
              }
            default:
                return state;
      }
  }

  const localStorageUser = localStorage.getItem("currentUser");
  const initialState = {
      user: localStorageUser ? localStorageUser: "not logged"
  }

  export const UserContext = createContext({} as ContextProps);

  const UserState: FC<UserStateProps> = ({children}) => {
      const [state, dispatch] = useReducer(userReducer, initialState);
      const setUser = (user: string) => {
        localStorage.setItem('currentUser', user);
        dispatch({
          type: UserActionType.SET_USER,
          payload: user
        });
      }

      function getUser(state:UserState){
          return state.user;
      }

    return (
        <UserContext.Provider value = {{state, dispatch: {setUser}}}>
            {children}
        </UserContext.Provider>

    );
  }
  export default UserState

