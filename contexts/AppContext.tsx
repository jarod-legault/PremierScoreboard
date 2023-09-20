import * as React from 'react';
import {useEffect, useState} from 'react';
import {StorageKeys} from '../enums/StorageKeys';
import {usePersistentState} from '../hooks/usePersistentState';

type AppProviderProps = {children: React.ReactNode};
type Value = {
  appBackgroundColor: string;
  setAppBackgroundColor: (newColor: string) => void;
  isInitialized: boolean;
};

const AppContext = React.createContext<Value | undefined>(undefined);

function AppProvider({children}: AppProviderProps) {
  const [
    appBackgroundColor,
    setAppBackgroundColor,
    appBackgroundColorIsInitialized,
  ] = usePersistentState<string>(
    'rgb(192, 192, 192)',
    StorageKeys.APP_BACKGROUND_COLOR,
  );

  const [isInitialized, setIsInitialized] = useState(false);

  const value: Value = {
    appBackgroundColor,
    setAppBackgroundColor,
    isInitialized,
  };

  useEffect(() => {
    setIsInitialized(appBackgroundColorIsInitialized);
  }, [appBackgroundColorIsInitialized]);

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
