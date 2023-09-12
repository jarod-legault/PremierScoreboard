import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type Props = {
  backgroundColor?: string;
  containerStyle?: object;
  fontColor?: string;
  name: string;
  onDecrement: () => void;
  onIncrement: () => void;
  score: number;
  translateX: number;
};

export function TeamScore(props: Props) {
  const translateX = useRef(new Animated.Value(props.translateX)).current;

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: props.translateX,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.translateX]);

  return (
    <Animated.View
      style={{
        ...styles.container,
        ...props.containerStyle,
        backgroundColor: props.backgroundColor,
        transform: [{translateX}],
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
      <View style={styles.touchableContainer}>
        <Pressable onPress={props.onIncrement} style={styles.touchableHalf} />
        <Pressable onPress={props.onDecrement} style={styles.touchableHalf} />
      </View>
    </Animated.View>
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
  touchableContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  touchableHalf: {
    height: '50%',
    width: '100%',
  },
});
