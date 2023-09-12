import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const keys = {
  HOME_SCORE: 'homeScore',
  HOME_IS_ON_LEFT: 'homeIsOnLeft',
  VISITOR_SCORE: 'visitorScore',
} as const;

export function usePersistentState() {
  const [homeScore, setHomeScore] = useState(0);
  const [homeIsOnLeft, setHomeIsOnLeft] = useState(true);
  const [visitorScore, setVisitorScore] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const getData = async (key: string, defaultValue: any) => {
      try {
        const jsonValue = await AsyncStorage.getItem(key);
        return jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
      } catch (e) {
        console.error(e);
        return defaultValue;
      }
    };

    const initialize = async () => {
      setHomeScore(await getData(keys.HOME_SCORE, homeScore));
      setHomeIsOnLeft(await getData(keys.HOME_IS_ON_LEFT, homeIsOnLeft));
      setVisitorScore(await getData(keys.VISITOR_SCORE, visitorScore));

      setIsInitialized(true);
    };

    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const storeData = async (key: string, value: any) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const updateHomeScore = async (newHomeScore: number) => {
    setHomeScore(newHomeScore);
    storeData(keys.HOME_SCORE, newHomeScore);
  };

  const updateHomeIsOnLeft = async (newHomeScoreIsOnLeft: boolean) => {
    setHomeIsOnLeft(newHomeScoreIsOnLeft);
    storeData(keys.HOME_IS_ON_LEFT, newHomeScoreIsOnLeft);
  };

  const updateVisitorScore = async (newVisitorScore: number) => {
    setVisitorScore(newVisitorScore);
    storeData(keys.VISITOR_SCORE, newVisitorScore);
  };

  return {
    homeScore,
    homeIsOnLeft,
    isInitialized,
    setHomeScore: updateHomeScore,
    setHomeIsOnLeft: updateHomeIsOnLeft,
    visitorScore,
    setVisitorScore: updateVisitorScore,
  };
}
