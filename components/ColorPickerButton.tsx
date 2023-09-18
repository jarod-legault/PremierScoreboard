import React from 'react';
import {Pressable, StyleSheet, View, ViewStyle} from 'react-native';
import {Text} from 'react-native-paper';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
  style?: ViewStyle;
};

export function ColorPickerButton(props: Props) {
  return (
    <View style={[props.style, styles.colorRow]}>
      <Text>{props.label}</Text>
      <Pressable
        style={[styles.color, {backgroundColor: props.color}]}
        onPress={props.onPress}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    borderWidth: 1,
    width: 30,
    aspectRatio: 2,
    marginLeft: 5,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
});
