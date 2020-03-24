import React, { ReactChild } from 'react';
import locationService from '../services/location';

export enum AppActionType {
  ShowOnboarding = 'show onboarding',
  HideOnboarding = 'hide onboarding',
  RequestedLocationPermission = 'requested location permission',
  ResetRequestedLocationPermission = 'reset requested location permission',
}

type Action = {
  type: AppActionType;
  value?: boolean;
};
type Dispatch = (action: Action) => void;
type State = {
  hasRequestedLocationPerm: boolean;
  showOnboarding: boolean;
};
const initialState: State = {
  hasRequestedLocationPerm: false,
  showOnboarding: true,
};

const AppStateContext = React.createContext<State | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case AppActionType.HideOnboarding:
      return { ...state, showOnboarding: false };
    case AppActionType.ShowOnboarding:
      return { ...state, showOnboarding: true };
    case AppActionType.RequestedLocationPermission:
      return { ...state, hasRequestedLocationPerm: true };
    case AppActionType.ResetRequestedLocationPermission:
      return { ...state, hasRequestedLocationPerm: false };
  }
}

export function useEffectPopulateAppState(dispatch) {
  React.useEffect(() => {
    locationService.haveRequestedPermission().then(requested => {
      if (requested) {
        dispatch({ type: AppActionType.RequestedLocationPermission });
      }
    });
  }, []);
}

export function AppContextProvider({ children }: { children: ReactChild }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  return React.useContext(AppStateContext);
}

export function useAppDispatch() {
  return React.useContext(AppDispatchContext);
}

export function useAuth() {
  return [useAppState(), useAppDispatch()];
}
