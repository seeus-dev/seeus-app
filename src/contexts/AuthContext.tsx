import React, { ReactChild } from 'react';

export enum AuthActionType {
  Login = 'login',
  Logout = 'logout',
  UpdateAuthUser = 'update auth user',
}

export type UserInfo = {
  username: string;
  name?: string;
  eid?: string;
  imageUrl?: string;
};

// all fields optional because this is a "diff"; it's merged with existing user object in UpdateAuthUser action
type UserInfoDiff = {
  username?: string;
  name?: string;
  eid?: string;
  imageUrl?: string;
};

type Action = {
  type: AuthActionType;
  user?: UserInfoDiff;
};
type Dispatch = (action: Action) => void;
type State = {
  isLoggedIn: boolean;
  user: UserInfo;
};
const initialState: State = {
  isLoggedIn: false,
  user: null,
};

const AuthStateContext = React.createContext<State | undefined>(undefined);
const AuthDispatchContext = React.createContext<Dispatch | undefined>(
  undefined
);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case AuthActionType.Login:
      return { ...state, isLoggedIn: true, user: action.user as UserInfo };
    case AuthActionType.Logout:
      return { ...state, isLoggedIn: false, user: null };
    case AuthActionType.UpdateAuthUser:
      return { ...state, user: { ...state.user, ...action.user } };
  }
}

export function AuthProvider({ children }: { children: ReactChild }) {
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
