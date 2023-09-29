import * as React from 'react';
import {useState} from 'react';

type AppProviderProps = {children: React.ReactNode};
type Value = {
  touchIsEnabled: boolean;
  setTouchIsEnabled: (newTouchIsEnabled: boolean) => void;
};

const AppContext = React.createContext<Value | undefined>(undefined);

function AppProvider({children}: AppProviderProps) {
  const [touchIsEnabled, setTouchIsEnabled] = useState(true);

  const value: Value = {
    touchIsEnabled,
    setTouchIsEnabled,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

function useAppContext() {
  const context = React.useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within a AppProvider');
  }
  return context;
}

export {AppProvider, useAppContext};
