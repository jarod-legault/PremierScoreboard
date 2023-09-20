import React from 'react';
import {Pressable, StyleSheet, TextStyle, View, ViewStyle} from 'react-native';
import {Surface, Text} from 'react-native-paper';

type Props = {
  label: string;
  color: string;
  onPress: () => void;
  labelStyle?: TextStyle;
  style?: ViewStyle;
};

export function ColorPickerButton(props: Props) {
  return (
    <View style={[props.style, styles.colorRow]}>
      <Text style={[props.labelStyle, styles.label]}>{props.label}</Text>
      <Surface>
        <Pressable
          style={[styles.color, {backgroundColor: props.color}]}
          onPress={props.onPress}
        />
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  color: {
    elevation: 5,
    width: 30,
    aspectRatio: 1.5,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  label: {
    marginRight: 8,
  },
});
