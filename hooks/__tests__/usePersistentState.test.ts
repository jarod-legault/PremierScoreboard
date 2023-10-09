import {act, renderHook, waitFor} from '@testing-library/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StorageKeys} from '../../enums/StorageKeys';
import {usePersistentState} from '../usePersistentState';

const VALUE_INDEX = 0;
const UPDATE_VALUE_INDEX = 1;
const INITIALIZED_INDEX = 2;
const TEST_STRING_1 = 'test string';
const TEST_STRING_2 = 'test string 2';

describe('initialization', () => {
  it('calls `getItem` with the correct key', async () => {
    renderHook(() =>
      usePersistentState<boolean>(true, StorageKeys.HOME_IS_ON_LEFT),
    );

    await waitFor(() =>
      expect(AsyncStorage.getItem).toBeCalledWith(StorageKeys.HOME_IS_ON_LEFT),
    );
  });

  it('sets `initialized` to `true`', async () => {
    const {result} = renderHook(() =>
      usePersistentState<boolean>(true, StorageKeys.HOME_IS_ON_LEFT),
    );

    await waitFor(() => expect(result.current[INITIALIZED_INDEX]).toBe(true));
  });

  it('sets `value` to the default value', async () => {
    const {result} = renderHook(() =>
      usePersistentState<string>(TEST_STRING_1, StorageKeys.HOME_IS_ON_LEFT),
    );

    await waitFor(() =>
      expect(result.current[VALUE_INDEX]).toBe(TEST_STRING_1),
    );
  });
});

describe('updateValue', () => {
  it('updates the value state correctly', async () => {
    const {result} = renderHook(() =>
      usePersistentState<string>(TEST_STRING_1, StorageKeys.HOME_IS_ON_LEFT),
    );

    let mockUpdateValue = result.current[UPDATE_VALUE_INDEX];
    await waitFor(() => {
      mockUpdateValue = result.current[UPDATE_VALUE_INDEX];
      expect(mockUpdateValue).toBeTruthy();
    });

    act(() => mockUpdateValue(TEST_STRING_2));
    expect(result.current[VALUE_INDEX]).toBe(TEST_STRING_2);
  });

  it('calls `setValue` when `updateValue` is called', async () => {
    const {result} = renderHook(() =>
      usePersistentState<string>(TEST_STRING_1, StorageKeys.HOME_IS_ON_LEFT),
    );

    let mockUpdateValue = result.current[UPDATE_VALUE_INDEX];
    await waitFor(() => {
      mockUpdateValue = result.current[UPDATE_VALUE_INDEX];
      expect(mockUpdateValue).toBeTruthy();
    });

    mockUpdateValue(TEST_STRING_2);
    await waitFor(() => {
      expect(AsyncStorage.setItem).toBeCalledWith(
        StorageKeys.HOME_IS_ON_LEFT,
        JSON.stringify(TEST_STRING_2),
      );
    });
  });
});
