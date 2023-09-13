import * as React from 'react';
import {useEffect, useState} from 'react';
import {StorageKeys} from '../enums/StorageKeys';
import {usePersistentState} from '../hooks/usePersistentState';

type TeamsProviderProps = {children: React.ReactNode};
type Value = {
  homeIsOnLeft: boolean;
  setHomeIsOnLeft: (newValue: boolean) => void;
  homeName: string;
  setHomeName: (newName: string) => void;
  homeScore: number;
  setHomeScore: (newScore: number) => void;
  visitorName: string;
  setVisitorName: (newName: string) => void;
  visitorScore: number;
  setVisitorScore: (newScore: number) => void;
  isInitialized: boolean;
};

const TeamsContext = React.createContext<Value | undefined>(undefined);

function TeamsProvider({children}: TeamsProviderProps) {
  const [homeIsOnLeft, setHomeIsOnLeft, homeIsOnLeftIsInitialized] =
    usePersistentState<boolean>(true, StorageKeys.HOME_IS_ON_LEFT);
  const [homeName, setHomeName, homeNameIsInitialized] =
    usePersistentState<string>('Lions', StorageKeys.HOME_NAME);
  const [homeScore, setHomeScore, homeScoreIsInitialized] =
    usePersistentState<number>(0, StorageKeys.HOME_SCORE);
  const [visitorName, setVisitorName, visitorNameIsInitialized] =
    usePersistentState<string>('Tigers', StorageKeys.VISITOR_NAME);
  const [visitorScore, setVisitorScore, visitorScoreIsInitialized] =
    usePersistentState<number>(0, StorageKeys.VISITOR_SCORE);

  const [isInitialized, setIsInitialized] = useState(false);

  const value: Value = {
    homeIsOnLeft,
    setHomeIsOnLeft,
    homeName,
    setHomeName,
    homeScore,
    setHomeScore,
    visitorName,
    setVisitorName,
    visitorScore,
    setVisitorScore,
    isInitialized,
  };

  useEffect(() => {
    setIsInitialized(
      homeIsOnLeftIsInitialized &&
        homeNameIsInitialized &&
        homeScoreIsInitialized &&
        visitorNameIsInitialized &&
        visitorScoreIsInitialized,
    );
  }, [
    homeIsOnLeftIsInitialized,
    homeNameIsInitialized,
    homeScoreIsInitialized,
    visitorNameIsInitialized,
    visitorScoreIsInitialized,
  ]);

  return (
    <TeamsContext.Provider value={value}>{children}</TeamsContext.Provider>
  );
}

function useTeamsContext() {
  const context = React.useContext(TeamsContext);
  if (context === undefined) {
    throw new Error('useTeamsContext must be used within a TeamsProvider');
  }
  return context;
}

export {TeamsProvider, useTeamsContext};
