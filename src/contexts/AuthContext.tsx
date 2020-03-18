import React from 'react';

export enum AuthActionType {
    Login = 'login',
    Logout = 'logout'
}

type UserInfo = {
    username: string,
    eid?: string,
};
type Action = {
    type: AuthActionType,
    user?: UserInfo
}
type Dispatch = (action: Action) => void
type State = {
    isLoggedIn: boolean,
    user: UserInfo,
}
const initialState: State = {
    isLoggedIn: false,
    user: null,
};

const AuthStateContext = React.createContext<State | undefined>(undefined);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case AuthActionType.Login:
            return {...state, isLoggedIn: true, user: action.user};
        case AuthActionType.Logout:
            return {...state, isLoggedIn: false, user: null};
    }
}

export function AuthProvider({children}) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    );
}

export function useAuthState() {
    return React.useContext(AuthStateContext);
}

export function useAuthDispatch() {
    return React.useContext(AuthDispatchContext);
}

export function useAuth() {
    return [useAuthState(), useAuthDispatch()];
}