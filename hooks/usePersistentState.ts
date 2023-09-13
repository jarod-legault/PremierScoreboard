import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {StorageKeys} from '../enums/StorageKeys';

export function usePersistentState<Type>(
  defaultValue: Type,
  key: StorageKeys,
): [Type, (newValue: Type) => void, boolean] {
  const [value, setValue] = useState(defaultValue);
  const [isInitialized, setIsInitialized] = useState(false);

  const storeValue = async (newValue: Type) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (e) {
      console.error(e);
    }
  };

  const updateValue = (newValue: Type) => {
    setValue(newValue);
    storeValue(newValue);
  };

  useEffect(() => {
    const initialize = async () => {
      let storedValue: Type;

      try {
        const jsonValue = await AsyncStorage.getItem(key);
        storedValue = jsonValue != null ? JSON.parse(jsonValue) : defaultValue;
      } catch (e) {
        console.error(e);
        storedValue = defaultValue;
      }

      setValue(storedValue);
      setIsInitialized(true);
    };

    initialize();
  }, [defaultValue, key]);

  return [value, updateValue, isInitialized];
}
