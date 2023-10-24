import * as React from 'react';
import {useEffect, useState} from 'react';
import {StorageKeys} from '../enums/StorageKeys';
import {usePersistentState} from '../hooks/usePersistentState';

export const INITIAL_HOME_IS_ON_LEFT = true;
export const INITIAL_HOME_NAME = 'Vikings';
export const INITIAL_HOME_SCORE = 0;
export const INITIAL_HOME_BACKGROUND_COLOR = 'hsl(270 100% 33%)';
export const INITIAL_HOME_TEXT_COLOR = 'hsl(60 80% 50%)';
export const INITIAL_HOME_NAME_FONT_SIZE = 20;
export const INITIAL_VISITOR_NAME = 'Jets';
export const INITIAL_VISITOR_SCORE = 0;
export const INITIAL_VISITOR_BACKGROUND_COLOR = 'hsl(90 100% 17%)';
export const INITIAL_VISITOR_TEXT_COLOR = 'hsl(0 0% 100%)';
export const INITIAL_VISITOR_NAME_FONT_SIZE = 20;

type TeamsProviderProps = {children: React.ReactNode};
export type Value = {
  homeIsOnLeft: boolean;
  setHomeIsOnLeft: (newValue: boolean) => void;
  homeName: string;
  setHomeName: (newName: string) => void;
  homeNameFontSize: number;
  setHomeNameFontSize: (newFontSize: number) => void;
  homeScore: number;
  decrementHomeScore: (pointValue?: number) => void;
  incrementHomeScore: (pointValue?: number) => void;
  setHomeScore: (newScore: number) => void;
  homeBackgroundColor: string;
  setHomeBackgroundColor: (newColor: string) => void;
  homeTextColor: string;
  setHomeTextColor: (newColor: string) => void;
  visitorName: string;
  setVisitorName: (newName: string) => void;
  visitorNameFontSize: number;
  setVisitorNameFontSize: (newFontSize: number) => void;
  visitorScore: number;
  decrementVisitorScore: (pointValue?: number) => void;
  incrementVisitorScore: (pointValue?: number) => void;
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
    usePersistentState<boolean>(
      INITIAL_HOME_IS_ON_LEFT,
      StorageKeys.HOME_IS_ON_LEFT,
    );

  const [homeScore, setHomeScore, homeScoreIsInitialized] =
    usePersistentState<number>(INITIAL_HOME_SCORE, StorageKeys.HOME_SCORE);
  const [homeName, setHomeName, homeNameIsInitialized] =
    usePersistentState<string>(INITIAL_HOME_NAME, StorageKeys.HOME_NAME);
  const [homeNameFontSize, setHomeNameFontSize, homeNameFontSizeIsInitialized] =
    usePersistentState<number>(
      INITIAL_HOME_NAME_FONT_SIZE,
      StorageKeys.HOME_NAME_FONT_SIZE,
    );
  const [
    homeBackgroundColor,
    setHomeBackgroundColor,
    homeBackgroundColorIsInitialized,
  ] = usePersistentState<string>(
    INITIAL_HOME_BACKGROUND_COLOR,
    StorageKeys.HOME_BACKGROUND_COLOR,
  );
  const [homeTextColor, setHomeTextColor, homeTextColorIsInitialized] =
    usePersistentState<string>(
      INITIAL_HOME_TEXT_COLOR,
      StorageKeys.HOME_TEXT_COLOR,
    );

  const [visitorScore, setVisitorScore, visitorScoreIsInitialized] =
    usePersistentState<number>(
      INITIAL_VISITOR_SCORE,
      StorageKeys.VISITOR_SCORE,
    );
  const [visitorName, setVisitorName, visitorNameIsInitialized] =
    usePersistentState<string>(INITIAL_VISITOR_NAME, StorageKeys.VISITOR_NAME);
  const [
    visitorNameFontSize,
    setVisitorNameFontSize,
    visitorNameFontSizeIsInitialized,
  ] = usePersistentState<number>(
    INITIAL_VISITOR_NAME_FONT_SIZE,
    StorageKeys.VISITOR_NAME_FONT_SIZE,
  );
  const [
    visitorBackgroundColor,
    setVisitorBackgroundColor,
    visitorBackgroundColorIsInitialized,
  ] = usePersistentState<string>(
    INITIAL_VISITOR_BACKGROUND_COLOR,
    StorageKeys.VISITOR_BACKGROUND_COLOR,
  );
  const [visitorTextColor, setVisitorTextColor, visitorTextColorIsInitialized] =
    usePersistentState<string>(
      INITIAL_VISITOR_TEXT_COLOR,
      StorageKeys.VISITOR_TEXT_COLOR,
    );

  const decrementHomeScore = (pointValue = 1) => {
    const prevScore = homeScore;
    setHomeScore(prevScore - pointValue);
  };

  const incrementHomeScore = (pointValue = 1) => {
    const prevScore = homeScore;
    setHomeScore(prevScore + pointValue);
  };

  const decrementVisitorScore = (pointValue = 1) => {
    const prevScore = visitorScore;
    setVisitorScore(prevScore - pointValue);
  };

  const incrementVisitorScore = (pointValue = 1) => {
    const prevScore = visitorScore;
    setVisitorScore(prevScore + pointValue);
  };

  const [isInitialized, setIsInitialized] = useState(false);

  const value: Value = {
    homeIsOnLeft,
    setHomeIsOnLeft,
    homeName,
    setHomeName,
    homeNameFontSize,
    setHomeNameFontSize,
    homeScore,
    decrementHomeScore,
    incrementHomeScore,
    setHomeScore,
    homeBackgroundColor,
    setHomeBackgroundColor,
    homeTextColor,
    setHomeTextColor,
    visitorName,
    setVisitorName,
    visitorNameFontSize,
    setVisitorNameFontSize,
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
        homeNameFontSizeIsInitialized &&
        homeScoreIsInitialized &&
        homeBackgroundColorIsInitialized &&
        homeTextColorIsInitialized &&
        visitorNameIsInitialized &&
        visitorNameFontSizeIsInitialized &&
        visitorScoreIsInitialized &&
        visitorBackgroundColorIsInitialized &&
        visitorTextColorIsInitialized,
    );
  }, [
    homeBackgroundColorIsInitialized,
    homeIsOnLeftIsInitialized,
    homeNameIsInitialized,
    homeNameFontSizeIsInitialized,
    homeScoreIsInitialized,
    homeTextColorIsInitialized,
    visitorBackgroundColorIsInitialized,
    visitorNameIsInitialized,
    visitorNameFontSizeIsInitialized,
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
