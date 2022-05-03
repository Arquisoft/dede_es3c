import React, { useReducer, FC, ReactNode, createContext } from 'react';

enum ActionType {
    SET_OPEN = 'SET_OPEN',
    SET_AMOUNT = 'SET_AMOUNT',
}

interface OpenState {
    openCart: string;
}

interface AmountState {
    amountInCart: string;
}

interface OpenStateProps {
    children: ReactNode;
}

interface SetOpenAction {
    typeOpen: typeof ActionType.SET_OPEN;
    payload: string;
}

interface SetAmountAction {
    typeAmount: typeof ActionType.SET_AMOUNT;
    payload: string;
}

interface ContextProps {
    stateOpen: OpenState;
    stateAmount: AmountState;
    dispatch: {
        setOpen: (open: string) => void;
        setAmount: (amount: string) => void;
    }
}

const openReducer = (state: OpenState, action: SetOpenAction): OpenState => {
    if (action.typeOpen === ActionType.SET_OPEN) {
        return {
            openCart: action.payload
        }
    }
    else {
        return state;
    }
}

const amountReducer = (state: AmountState, action: SetAmountAction): AmountState => {
    if (action.typeAmount === ActionType.SET_AMOUNT) {
        return {
            amountInCart: action.payload
        }
    }
    else {
        return state;
    }
}

const localStorageOpen = localStorage.getItem('openCart');
const localStorageAmount = localStorage.getItem('amountInCart');
const initialState = {
    openCart: localStorageOpen ? localStorageOpen : '',
    amountInCart: localStorageAmount ? localStorageAmount : '0',
}

export const OpenContext = createContext({} as ContextProps);

const OpenState_: FC<OpenStateProps> = ({ children }) => {
    const [stateOpen, dispatchOpen] = useReducer(openReducer, initialState);
    const setOpen = (open: string) => {
        localStorage.setItem('openCart', open);
        dispatchOpen({
            typeOpen: ActionType.SET_OPEN,
            payload: open
        });
    }

    const [stateAmount, dispatchAmount] = useReducer(amountReducer, initialState);
    const setAmount = (amount: string) => {
        localStorage.setItem("amountInCart", amount);
        dispatchAmount({
            typeAmount: ActionType.SET_AMOUNT,
            payload: amount
        })
    }

    return (
        <OpenContext.Provider value={{ stateOpen, stateAmount, dispatch: { setOpen, setAmount } }}>
            {children}
        </OpenContext.Provider>
    );
}

export default OpenState_;