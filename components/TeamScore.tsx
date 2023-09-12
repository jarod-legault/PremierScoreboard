import React, {useEffect, useRef} from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';

export type Measurements = {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

interface Props extends ViewProps {
  backgroundColor?: string;
  containerStyle?: object;
  fontColor?: string;
  name: string;
  onNameMeasure: (measurements: Measurements) => void;
  onScoreLayout?: (event: LayoutChangeEvent) => void;
  score: number;
  translateX: number;
}

export function TeamScore(props: Props) {
  const {
    backgroundColor,
    containerStyle,
    fontColor,
    name,
    onNameMeasure,
    onScoreLayout,
    score,
    translateX: translateXProp,
    ...restOfProps
  } = props;

  const nameRef = useRef<Text>(null);
  const translateX = useRef(new Animated.Value(translateXProp)).current;

  const onNameLayout = () => {
    if (nameRef.current) {
      nameRef.current.measure((x, y, width, height, pageX, pageY) => {
        onNameMeasure({width, height, pageX, pageY});
      });
    }
  };

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: translateXProp,
      duration: 200,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(onNameLayout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translateXProp]);

  return (
    <Animated.View
      {...restOfProps}
      style={{
        ...styles.container,
        ...containerStyle,
        backgroundColor,
        transform: [{translateX}],
      }}>
      <View style={styles.nameContainer}>
        <Text
          ref={nameRef}
          style={{...styles.name, color: fontColor}}
          onLayout={onNameLayout}>
          {name}
        </Text>
      </View>
      <View style={styles.scoreContainer} onLayout={onScoreLayout}>
        <Text style={{...styles.score, color: fontColor}}>{score}</Text>
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
    marginVertical: 10,
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
