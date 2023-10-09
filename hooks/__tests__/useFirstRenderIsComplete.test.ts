import {renderHook, waitFor} from '@testing-library/react-native';
import {useFirstRenderIsComplete} from '../useFirstRenderIsComplete';

it('is false after first render and true after second', async () => {
  const {result, rerender} = renderHook(() => useFirstRenderIsComplete());

  expect(result.current.firstRenderIsComplete).toBe(false);

  rerender(undefined);

  await waitFor(() => expect(result.current.firstRenderIsComplete).toBe(true));
});
