import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

type Props = {
  containerStyle?: object;
  name: string;
  fontColor?: string;
  score: number;
  backgroundColor?: string;
};

export function TeamScore(props: Props) {
  return (
    <View
      style={{
        ...styles.container,
        ...props.containerStyle,
        backgroundColor: props.backgroundColor,
      }}>
      <View style={styles.nameContainer}>
        <Text style={{...styles.name, color: props.fontColor}}>
          {props.name}
        </Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={{...styles.score, color: props.fontColor}}>
          {props.score}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: '50%',
  },
  name: {
    fontSize: 40,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  nameContainer: {
    paddingTop: 5,
  },
  score: {
    fontSize: 270,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});
