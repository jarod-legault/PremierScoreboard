import {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const keys = {
  HOME_SCORE: 'homeScore',
  VISITOR_SCORE: 'visitorScore',
} as const;

export function usePersistentState() {
  const [homeScore, setHomeScore] = useState(0);
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

  const updateVisitorScore = async (newVisitorScore: number) => {
    setVisitorScore(newVisitorScore);
    storeData(keys.VISITOR_SCORE, newVisitorScore);
  };

  return {
    homeScore,
    isInitialized,
    setHomeScore: updateHomeScore,
    visitorScore,
    setVisitorScore: updateVisitorScore,
  };
}
