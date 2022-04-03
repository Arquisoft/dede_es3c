import React, { useReducer, FC, ReactNode, createContext } from 'react';

import en from './langs/en.json';
import es from './langs/es.json';

enum LangActionType {
  SET_LANGUAGE = 'SET_LANGUAGE'
}

 interface LangState {
  language: string;
}

interface LangStateProps {
  children: ReactNode;
}

interface SetLanguageAction {
  type: typeof LangActionType.SET_LANGUAGE;
  payload: string;
}

interface ContextProps {
  state: LangState;
  dispatch: { setLanguage: (lang: string) => void;
              translate: (key: string) => string;}
}

const langReducer = (state: LangState, action: SetLanguageAction): LangState => {
  if (action.type === LangActionType.SET_LANGUAGE){
    return {
      language: action.payload
    }
  }
  else{
      return state;
  }
}

const localStorageLang = localStorage.getItem('language');
const initialState = {
  language: localStorageLang ? localStorageLang : 'EN'
}

export const LangContext = createContext({} as ContextProps);

const LangState_: FC<LangStateProps> = ({ children }) => {
  const [state, dispatch] = useReducer(langReducer, initialState);
  const setLanguage = (lang: string) => {
    localStorage.setItem('language', lang);
    dispatch({
      type: LangActionType.SET_LANGUAGE,
      payload: lang
    });
  }

  const translate = (key: string): string => {
    const { language } = state;
    let langData: { [key: string]: string } = {};

    if(language === 'EN') {
      langData = en;
    }else {
        langData = es;
    }

    return langData[key];
  }

  return(
    <LangContext.Provider value={{ state, dispatch: { setLanguage, translate }}}>
      {children}
    </LangContext.Provider>
  );
}

export default LangState_;