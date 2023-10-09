import {act, renderHook, waitFor} from '@testing-library/react-native';
import {
  AppProvider,
  INITIAL_TOUCH_IS_ENABLED,
  useAppContext,
} from '../AppContext';

it('initializes and updates `touchIsEnabled` correctly', async () => {
  const {result} = renderHook(() => useAppContext(), {
    wrapper: AppProvider,
  });

  await waitFor(() =>
    expect(result.current.touchIsEnabled).toBe(INITIAL_TOUCH_IS_ENABLED),
  );

  const newTouchIsEnabled = false;
  act(() => result.current.setTouchIsEnabled(newTouchIsEnabled));

  expect(result.current.touchIsEnabled).toBe(newTouchIsEnabled);
});
