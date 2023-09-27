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
  decrementHomeScore: () => void;
  incrementHomeScore: () => void;
  setHomeScore: (newScore: number) => void;
  homeBackgroundColor: string;
  setHomeBackgroundColor: (newColor: string) => void;
  homeTextColor: string;
  setHomeTextColor: (newColor: string) => void;
  visitorName: string;
  setVisitorName: (newName: string) => void;
  visitorScore: number;
  decrementVisitorScore: () => void;
  incrementVisitorScore: () => void;
  setVisitorScore: (newScore: number) => void;
  visitorBackgroundColor: string;
  setVisitorBackgroundColor: (newColor: string) => void;
  visitorTextColor: string;
  setVisitorTextColor: (newColor: string) => void;
  isInitialized: boolean;
};

const TeamsContext = React.createContext<Value | undefined>(undefined);

function TeamsProvider({children}: TeamsProviderProps) {
  const [homeIsOnLeft, setHomeIsOnLeft, homeIsOnLeftIsInitialized] =
    usePersistentState<boolean>(true, StorageKeys.HOME_IS_ON_LEFT);
  const [homeName, setHomeName, homeNameIsInitialized] =
    usePersistentState<string>('Vikings', StorageKeys.HOME_NAME);
  const [homeScore, setHomeScore, homeScoreIsInitialized] =
    usePersistentState<number>(0, StorageKeys.HOME_SCORE);
  const [
    homeBackgroundColor,
    setHomeBackgroundColor,
    homeBackgroundColorIsInitialized,
  ] = usePersistentState<string>(
    'hsl(270 100% 33%)',
    StorageKeys.HOME_BACKGROUND_COLOR,
  );
  const [homeTextColor, setHomeTextColor, homeTextColorIsInitialized] =
    usePersistentState<string>('hsl(60 80% 50%)', StorageKeys.HOME_TEXT_COLOR);
  const [visitorName, setVisitorName, visitorNameIsInitialized] =
    usePersistentState<string>('Jets', StorageKeys.VISITOR_NAME);
  const [visitorScore, setVisitorScore, visitorScoreIsInitialized] =
    usePersistentState<number>(0, StorageKeys.VISITOR_SCORE);
  const [
    visitorBackgroundColor,
    setVisitorBackgroundColor,
    visitorBackgroundColorIsInitialized,
  ] = usePersistentState<string>(
    'hsl(90 100% 17%)',
    StorageKeys.VISITOR_BACKGROUND_COLOR,
  );
  const [visitorTextColor, setVisitorTextColor, visitorTextColorIsInitialized] =
    usePersistentState<string>(
      'hsl(0 0% 100%)',
      StorageKeys.VISITOR_TEXT_COLOR,
    );

  const decrementHomeScore = () => {
    const prevScore = homeScore;
    setHomeScore(prevScore - 1);
  };

  const incrementHomeScore = () => {
    const prevScore = homeScore;
    setHomeScore(prevScore + 1);
  };

  const decrementVisitorScore = () => {
    const prevScore = visitorScore;
    setVisitorScore(prevScore - 1);
  };

  const incrementVisitorScore = () => {
    const prevScore = visitorScore;
    setVisitorScore(prevScore + 1);
  };

  const [isInitialized, setIsInitialized] = useState(false);

  const value: Value = {
    homeIsOnLeft,
    setHomeIsOnLeft,
    homeName,
    setHomeName,
    homeScore,
    homeBackgroundColor,
    setHomeBackgroundColor,
    decrementHomeScore,
    incrementHomeScore,
    setHomeScore,
    homeTextColor,
    setHomeTextColor,
    visitorName,
    setVisitorName,
    visitorScore,
    visitorBackgroundColor,
    setVisitorBackgroundColor,
    decrementVisitorScore,
    incrementVisitorScore,
    setVisitorScore,
    visitorTextColor,
    setVisitorTextColor,
    isInitialized,
  };

  useEffect(() => {
    setIsInitialized(
      homeIsOnLeftIsInitialized &&
        homeNameIsInitialized &&
        homeScoreIsInitialized &&
        homeBackgroundColorIsInitialized &&
        homeTextColorIsInitialized &&
        visitorNameIsInitialized &&
        visitorScoreIsInitialized &&
        visitorBackgroundColorIsInitialized &&
        visitorTextColorIsInitialized,
    );
  }, [
    homeBackgroundColorIsInitialized,
    homeIsOnLeftIsInitialized,
    homeNameIsInitialized,
    homeScoreIsInitialized,
    homeTextColorIsInitialized,
    visitorBackgroundColorIsInitialized,
    visitorNameIsInitialized,
    visitorScoreIsInitialized,
    visitorTextColorIsInitialized,
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
