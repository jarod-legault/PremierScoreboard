import AsyncStorage from '@react-native-async-storage/async-storage';
import {act, renderHook, waitFor} from '@testing-library/react-native';
import {StorageKeys} from '../../enums/StorageKeys';
import {
  INITIAL_HOME_IS_ON_LEFT,
  INITIAL_HOME_NAME,
  INITIAL_HOME_SCORE,
  INITIAL_HOME_BACKGROUND_COLOR,
  INITIAL_HOME_TEXT_COLOR,
  INITIAL_VISITOR_NAME,
  INITIAL_VISITOR_SCORE,
  INITIAL_VISITOR_BACKGROUND_COLOR,
  INITIAL_VISITOR_TEXT_COLOR,
  TeamsProvider,
  useTeamsContext,
} from '../TeamsContext';

it('initializes and updates `homeIsOnLeft` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.homeIsOnLeft).toBe(INITIAL_HOME_IS_ON_LEFT);
  expect(AsyncStorage.getItem).toBeCalledWith(StorageKeys.HOME_IS_ON_LEFT);

  const newHomeIsOnLeft = false;
  act(() => result.current.setHomeIsOnLeft(newHomeIsOnLeft));

  expect(result.current.homeIsOnLeft).toBe(newHomeIsOnLeft);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_IS_ON_LEFT,
    JSON.stringify(newHomeIsOnLeft),
  );
});

it('initializes and updates `homeName` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.homeName).toBe(INITIAL_HOME_NAME);
  expect(AsyncStorage.getItem).toBeCalledWith(StorageKeys.HOME_NAME);

  const newHomeName = 'Colts';
  act(() => result.current.setHomeName(newHomeName));

  expect(result.current.homeName).toBe(newHomeName);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_NAME,
    JSON.stringify(newHomeName),
  );
});

it('initializes and updates `homeScore` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.homeScore).toBe(INITIAL_HOME_SCORE);
  expect(AsyncStorage.getItem).toBeCalledWith(StorageKeys.HOME_SCORE);

  let newHomeScore = 14;
  act(() => result.current.setHomeScore(newHomeScore));

  expect(result.current.homeScore).toBe(newHomeScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_SCORE,
    JSON.stringify(newHomeScore),
  );

  const INCREMENT_VALUE = 3;
  newHomeScore += INCREMENT_VALUE;
  act(() => result.current.incrementHomeScore(INCREMENT_VALUE));

  expect(result.current.homeScore).toBe(newHomeScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_SCORE,
    JSON.stringify(newHomeScore),
  );

  newHomeScore++;
  act(() => result.current.incrementHomeScore());

  expect(result.current.homeScore).toBe(newHomeScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_SCORE,
    JSON.stringify(newHomeScore),
  );

  const DECREMENT_VALUE = 7;
  newHomeScore -= DECREMENT_VALUE;
  act(() => result.current.decrementHomeScore(DECREMENT_VALUE));

  expect(result.current.homeScore).toBe(newHomeScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_SCORE,
    JSON.stringify(newHomeScore),
  );

  newHomeScore--;
  act(() => result.current.decrementHomeScore());

  expect(result.current.homeScore).toBe(newHomeScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_SCORE,
    JSON.stringify(newHomeScore),
  );
});

it('initializes and updates `homeBackgroundColor` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.homeBackgroundColor).toBe(
    INITIAL_HOME_BACKGROUND_COLOR,
  );
  expect(AsyncStorage.getItem).toBeCalledWith(
    StorageKeys.HOME_BACKGROUND_COLOR,
  );

  const newHomeBackgroundColor = 'hsl(280 90% 30%)';
  act(() => result.current.setHomeBackgroundColor(newHomeBackgroundColor));

  expect(result.current.homeBackgroundColor).toBe(newHomeBackgroundColor);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_BACKGROUND_COLOR,
    JSON.stringify(newHomeBackgroundColor),
  );
});

it('initializes and updates `homeTextColor` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.homeTextColor).toBe(INITIAL_HOME_TEXT_COLOR);
  expect(AsyncStorage.getItem).toBeCalledWith(StorageKeys.HOME_TEXT_COLOR);

  const newHomeTextColor = 'hsl(125 90% 30%)';
  act(() => result.current.setHomeTextColor(newHomeTextColor));

  expect(result.current.homeTextColor).toBe(newHomeTextColor);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.HOME_TEXT_COLOR,
    JSON.stringify(newHomeTextColor),
  );
});

it('initializes and updates `visitorName` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.visitorName).toBe(INITIAL_VISITOR_NAME);
  expect(AsyncStorage.getItem).toBeCalledWith(StorageKeys.VISITOR_NAME);

  const newVisitorName = 'Patriots';
  act(() => result.current.setVisitorName(newVisitorName));

  expect(result.current.visitorName).toBe(newVisitorName);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.VISITOR_NAME,
    JSON.stringify(newVisitorName),
  );
});

it('initializes and updates `visitorScore` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.visitorScore).toBe(INITIAL_VISITOR_SCORE);
  expect(AsyncStorage.getItem).toBeCalledWith(StorageKeys.VISITOR_SCORE);

  let newVisitorScore = 14;
  act(() => result.current.setVisitorScore(newVisitorScore));

  expect(result.current.visitorScore).toBe(newVisitorScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.VISITOR_SCORE,
    JSON.stringify(newVisitorScore),
  );

  const INCREMENT_VALUE = 3;
  newVisitorScore += INCREMENT_VALUE;
  act(() => result.current.incrementVisitorScore(INCREMENT_VALUE));

  expect(result.current.visitorScore).toBe(newVisitorScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.VISITOR_SCORE,
    JSON.stringify(newVisitorScore),
  );

  newVisitorScore++;
  act(() => result.current.incrementVisitorScore());

  expect(result.current.visitorScore).toBe(newVisitorScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.VISITOR_SCORE,
    JSON.stringify(newVisitorScore),
  );

  const DECREMENT_VALUE = 7;
  newVisitorScore -= DECREMENT_VALUE;
  act(() => result.current.decrementVisitorScore(DECREMENT_VALUE));

  expect(result.current.visitorScore).toBe(newVisitorScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.VISITOR_SCORE,
    JSON.stringify(newVisitorScore),
  );

  newVisitorScore--;
  act(() => result.current.decrementVisitorScore());

  expect(result.current.visitorScore).toBe(newVisitorScore);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.VISITOR_SCORE,
    JSON.stringify(newVisitorScore),
  );
});

it('initializes and updates `visitorBackgroundColor` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.visitorBackgroundColor).toBe(
    INITIAL_VISITOR_BACKGROUND_COLOR,
  );
  expect(AsyncStorage.getItem).toBeCalledWith(
    StorageKeys.VISITOR_BACKGROUND_COLOR,
  );

  const newVisitorBackgroundColor = 'hsl(280 90% 30%)';
  act(() =>
    result.current.setVisitorBackgroundColor(newVisitorBackgroundColor),
  );

  expect(result.current.visitorBackgroundColor).toBe(newVisitorBackgroundColor);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.VISITOR_BACKGROUND_COLOR,
    JSON.stringify(newVisitorBackgroundColor),
  );
});

it('initializes and updates `visitorTextColor` correctly', async () => {
  const {result} = renderHook(() => useTeamsContext(), {
    wrapper: TeamsProvider,
  });

  await waitFor(() => expect(result.current.isInitialized).toBe(true));

  expect(result.current.visitorTextColor).toBe(INITIAL_VISITOR_TEXT_COLOR);
  expect(AsyncStorage.getItem).toBeCalledWith(StorageKeys.VISITOR_TEXT_COLOR);

  const newVisitorTextColor = 'hsl(75 90% 30%)';
  act(() => result.current.setVisitorTextColor(newVisitorTextColor));

  expect(result.current.visitorTextColor).toBe(newVisitorTextColor);
  expect(AsyncStorage.setItem).toBeCalledWith(
    StorageKeys.VISITOR_TEXT_COLOR,
    JSON.stringify(newVisitorTextColor),
  );
});
