import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import {useFirstRenderIsComplete} from '../hooks/useFirstRenderIsComplete';

const ROTATE_DURATION_90_DEGREES = 130;

interface Props extends ViewProps {
  backgroundColor?: string;
  containerStyle?: object;
  textColor?: string;
  name: string;
  score: number;
  translateX: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function TeamScore(props: Props) {
  const [scoreContainerWidth, setScoreContainerWidth] = useState(0);
  const [currentScore, setCurrentScore] = useState(props.score);

  const nameRef = useRef<Text>(null);
  const scoreRef = useRef<Text>(null);

  const {firstRenderIsComplete} = useFirstRenderIsComplete();

  const translateX = useRef(new Animated.Value(props.translateX)).current;
  const rotateXRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: props.translateX,
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.translateX]);

  useEffect(() => {
    const rotateTo90 = () => {
      Animated.timing(rotateXRef.current, {
        toValue: 90,
        duration: ROTATE_DURATION_90_DEGREES,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        updateScore();
        rotateTo270();
      });
    };

    const updateScore = () => {
      setCurrentScore(props.score);
    };

    const rotateTo270 = () => {
      Animated.timing(rotateXRef.current, {
        toValue: 270,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(rotateTo360);
    };

    const rotateTo360 = () => {
      Animated.timing(rotateXRef.current, {
        toValue: 360,
        duration: ROTATE_DURATION_90_DEGREES,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(resetRotation);
    };

    const rotateToNegative90 = () => {
      Animated.timing(rotateXRef.current, {
        toValue: -90,
        duration: ROTATE_DURATION_90_DEGREES,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(() => {
        updateScore();
        rotateToNegative270();
      });
    };

    const rotateToNegative270 = () => {
      Animated.timing(rotateXRef.current, {
        toValue: -270,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(rotateToNegative360);
    };

    const rotateToNegative360 = () => {
      Animated.timing(rotateXRef.current, {
        toValue: -360,
        duration: ROTATE_DURATION_90_DEGREES,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(resetRotation);
    };

    const resetRotation = () => {
      Animated.timing(rotateXRef.current, {
        toValue: 0,
        duration: 0,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    };

    if (firstRenderIsComplete) {
      props.score > currentScore ? rotateTo90() : rotateToNegative90();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.score]);

  let scoreFontSize: number;
  if (props.score < 100) {
    scoreFontSize = scoreContainerWidth / 1.7;
  } else {
    scoreFontSize = scoreContainerWidth / 1.9;
  }

  return (
    <Animated.View
      style={{
        ...styles.container,
        transform: [{translateX}],
      }}>
      <View style={styles.nameArea}>
        <View
          ref={nameRef}
          style={[
            styles.nameContainer,
            {
              backgroundColor: props.backgroundColor,
              borderColor: props.textColor,
            },
          ]}>
          <Text
            style={{
              ...styles.name,
              color: props.textColor,
            }}
            adjustsFontSizeToFit>
            {props.name}
          </Text>
        </View>
      </View>
      <View style={styles.scoreArea}>
        <Animated.View
          ref={scoreRef}
          style={[
            styles.scoreContainer,
            {
              backgroundColor: props.backgroundColor,
              borderColor: props.textColor,
              transform: [
                {perspective: 900},
                {
                  rotateX: rotateXRef.current.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
            },
          ]}
          onLayout={(event: LayoutChangeEvent) =>
            setScoreContainerWidth(event.nativeEvent.layout.width)
          }>
          {!!scoreContainerWidth && (
            <Text
              style={{
                ...styles.score,
                color: props.textColor,
                fontSize: scoreFontSize,
              }}>
              {currentScore}
            </Text>
          )}
          <View style={styles.touchContainer}>
            <Pressable style={styles.pressable} onPress={props.onIncrement} />
            <Pressable style={styles.pressable} onPress={props.onDecrement} />
          </View>
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: '100%',
    width: '50%',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  nameArea: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameContainer: {
    height: '80%',
    maxWidth: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 20,
    borderWidth: 5,
  },
  name: {
    fontSize: 100,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  scoreArea: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreContainer: {
    height: '90%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 10,
  },
  score: {
    fontWeight: '400',
    includeFontPadding: false,
  },
  touchContainer: {
    justifyContent: 'space-between',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  pressable: {
    height: '42%',
  },
});
