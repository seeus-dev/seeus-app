import React from 'react';
import locationService from '../services/location';

export enum AppActionType {
  ShowOnboarding = 'show onboarding',
  HideOnboarding = 'hide onboarding',
  SetLocationEnabled = 'set location permission enabled',
  SetLocationDisabled = 'set location permission disabled'
}

type Action = {
  type: AppActionType;
  value?: any;
};
type Dispatch = (action: Action) => void;
type State = {
  hasLocationPermission: boolean;
  hasRequestedLocationPermission: boolean;
  showOnboarding: boolean;
};
const initialState: State = {
  hasLocationPermission: undefined,
  hasRequestedLocationPermission: false,
  showOnboarding: true
};

const AppStateContext = React.createContext<State | undefined>(undefined);
const AppDispatchContext = React.createContext<Dispatch | undefined>(undefined);

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case AppActionType.HideOnboarding:
      return { ...state, showOnboarding: false };
    case AppActionType.ShowOnboarding:
      return { ...state, showOnboarding: true };
    case AppActionType.SetLocationEnabled:
      return {
        ...state,
        hasLocationPermission: true,
        hasRequestedLocationPermission: true
      };
    case AppActionType.SetLocationDisabled:
      return {
        ...state,
        hasLocationPermission: false,
        hasRequestedLocationPermission: true
      };
  }
}

export function usePopulateAppState(dispatch) {
  React.useEffect(() => {
    locationService.hasPermissionCached().then(perm => {
      if (perm) {
        dispatch({ type: AppActionType.SetLocationEnabled });
      }
    });
  }, []);
}

export function AppContextProvider({ children }) {
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
