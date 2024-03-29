import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import {useAppContext} from '../contexts/AppContext';
import {useFirstRenderIsComplete} from '../hooks/useFirstRenderIsComplete';

const ROTATE_DURATION_90_DEGREES = 130;
const NAME_WIDTH_RATIO_UPPER_LIMIT = 0.7;
const NAME_WIDTH_RATIO_LOWER_LIMIT = 0.6;
const NAME_HEIGHT_RATIO_UPPER_LIMIT = 0.83;
const NAME_HEIGHT_RATIO_LOWER_LIMIT = 0.73;
const RENDER_DELAY_IN_MS = 10;

type DimensionsType = {
  width: number;
  height: number;
};

interface Props extends ViewProps {
  backgroundColor?: string;
  containerStyle?: object;
  textColor?: string;
  name: string;
  nameFontSize: number;
  score: number;
  translateX: number;
  onIncrement: () => void;
  onDecrement: () => void;
  onPressName: () => void;
  onLongPressTop: () => void;
  onLongPressBottom: () => void;
  onIncreaseNameFontSize: () => void;
  onDecreaseNameFontSize: () => void;
}

export function TeamScore(props: Props) {
  const [scoreContainerWidth, setScoreContainerWidth] = useState(0);
  const [currentScore, setCurrentScore] = useState(props.score);

  const {touchIsEnabled, setTouchIsEnabled} = useAppContext();

  const nameRef = useRef<Text>(null);
  const nameAreaDimensionsRef = useRef<DimensionsType>();
  const nameContainerDimensionsRef = useRef<DimensionsType>();
  const nameTextDimensionsRef = useRef<DimensionsType>();
  const scoreRef = useRef<Text>(null);

  const {firstRenderIsComplete} = useFirstRenderIsComplete();

  const translateX = useRef(new Animated.Value(props.translateX)).current;
  const rotateXRef = useRef(new Animated.Value(0));

  useEffect(() => {
    setTouchIsEnabled(false);

    Animated.spring(translateX, {
      toValue: props.translateX,
      useNativeDriver: true,
    }).start(() => setTouchIsEnabled(true));
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
      }).start(() => setTouchIsEnabled(true));
    };

    if (firstRenderIsComplete) {
      setTouchIsEnabled(false);
      props.score > currentScore ? rotateTo90() : rotateToNegative90();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.score]);

  function handleIncrementScore() {
    touchIsEnabled && props.onIncrement();
  }

  function handleDecrementScore() {
    touchIsEnabled && props.onDecrement();
  }

  useEffect(() => {
    function adjustNameFontSize() {
      if (
        !nameAreaDimensionsRef.current ||
        !nameContainerDimensionsRef.current ||
        !nameTextDimensionsRef.current
      ) {
        setTimeout(() => {
          adjustNameFontSize();
        }, RENDER_DELAY_IN_MS); // Allow time for content to render before adjusting font size.
        return;
      }

      const nameTextWidth = nameTextDimensionsRef.current.width;
      const nameTextHeight = nameTextDimensionsRef.current.height;
      const nameContainerHeight = nameContainerDimensionsRef.current.height;
      const nameAreaWidth = nameAreaDimensionsRef.current.width;

      if (
        nameTextHeight >
        nameContainerHeight * NAME_HEIGHT_RATIO_UPPER_LIMIT
      ) {
        props.onDecreaseNameFontSize();
      } else if (nameTextWidth > nameAreaWidth * NAME_WIDTH_RATIO_UPPER_LIMIT) {
        props.onDecreaseNameFontSize();
      } else if (
        nameTextHeight < nameContainerHeight * NAME_HEIGHT_RATIO_LOWER_LIMIT &&
        nameTextWidth < nameAreaWidth * NAME_WIDTH_RATIO_LOWER_LIMIT
      ) {
        props.onIncreaseNameFontSize();
      }
    }

    setTimeout(() => {
      adjustNameFontSize();
    }, RENDER_DELAY_IN_MS); // Allow time for content to render before adjusting font size.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.name, props.nameFontSize]);

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
      <View
        onLayout={(event: LayoutChangeEvent) => {
          nameAreaDimensionsRef.current = {
            width: event.nativeEvent.layout.width,
            height: event.nativeEvent.layout.height,
          };
        }}
        style={styles.nameArea}>
        <Pressable
          ref={nameRef}
          onPress={props.onPressName}
          onLayout={(event: LayoutChangeEvent) => {
            nameContainerDimensionsRef.current = {
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            };
          }}
          style={[
            styles.nameContainer,
            {
              backgroundColor: props.backgroundColor,
              borderColor: props.textColor,
            },
          ]}>
          <Text
            onLayout={(event: LayoutChangeEvent) => {
              nameTextDimensionsRef.current = {
                width: event.nativeEvent.layout.width,
                height: event.nativeEvent.layout.height,
              };
            }}
            numberOfLines={1}
            style={{
              ...styles.name,
              fontSize: props.nameFontSize,
              color: props.textColor,
            }}>
            {props.name}
          </Text>
        </Pressable>
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
            <Pressable
              style={styles.pressable}
              onPress={handleIncrementScore}
              onLongPress={props.onLongPressTop}
            />
            <Pressable
              style={styles.pressable}
              onPress={handleDecrementScore}
              onLongPress={props.onLongPressBottom}
            />
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
    alignSelf: 'stretch',
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
    fontFamily: Platform.OS === 'ios' ? 'Arvo' : 'Arvo-Regular',
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
    fontFamily: 'Arvo-Bold',
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
