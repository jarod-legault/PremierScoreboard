import React from 'react';
import {
  Platform,
  StyleSheet,
  Text as ReactNativeText,
  TextProps,
} from 'react-native';

import colors from '../Colors';

export function Text(props: TextProps) {
  const {style: propsStyle = {}, ...restOfProps} = props;
  return (
    <ReactNativeText style={[styles.text, propsStyle]} {...restOfProps}>
      {props.children}
    </ReactNativeText>
  );
}

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    fontFamily: Platform.OS === 'ios' ? 'Arvo' : 'Arvo-Regular',
  },
});
