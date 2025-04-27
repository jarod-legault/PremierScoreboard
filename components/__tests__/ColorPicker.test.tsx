import React from 'react';
import {render} from '@testing-library/react-native';
import {ColorPicker} from '../ColorPicker';

it('displays a bullet and text', () => {
  const bulletText = 'test text';
  const {queryByText, queryByTestId} = render(
    <BulletPoint text={bulletText} />,
  );

  expect(queryByTestId('bulletIcon')).toBeTruthy();
  expect(queryByText(bulletText)).toBeTruthy();
});
