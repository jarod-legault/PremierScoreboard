import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import {useGestureContext} from '../contexts/GestureContext';
import {useTeamsContext} from '../contexts/TeamsContext';
import {useAppContext} from '../contexts/AppContext';

const ROTATE_DURATION_90_DEGREES = 130;

export type Measurements = {
  width: number;
  height: number;
  pageX: number;
  pageY: number;
};

interface Props extends ViewProps {
  backgroundColor?: string;
  containerStyle?: object;
  textColor?: string;
  isHome: boolean;
  name: string;
  score: number;
}

export function TeamScore(props: Props) {
  const [scoreContainerWidth, setScoreContainerWidth] = useState(0);
  const [currentScore, setCurrentScore] = useState(props.score);
  const {appBackgroundColor} = useAppContext();
  const {homeIsOnLeft} = useTeamsContext();

  const nameRef = useRef<Text>(null);
  const scoreRef = useRef<Text>(null);

  const {
    setHomeNameCoordinates,
    setHomeScoreCoordinates,
    setVisitorNameCoordinates,
    setVisitorScoreCoordinates,
  } = useGestureContext();

  const handleNameMeasurement = (measurements: Measurements) => {
    const coordinates = {
      x1: measurements.pageX,
      x2: measurements.pageX + measurements.width,
      y1: measurements.pageY,
      y2: measurements.pageY + measurements.height,
    };

    props.isHome
      ? setHomeNameCoordinates(coordinates)
      : setVisitorNameCoordinates(coordinates);
  };

  const onNameLayout = () => {
    if (nameRef.current) {
      nameRef.current.measure((x, y, width, height, pageX, pageY) => {
        handleNameMeasurement({width, height, pageX, pageY});
      });
    }
  };

  const handleScoreMeasurement = (measurements: Measurements) => {
    const coordinates = {
      x1: measurements.pageX,
      x2: measurements.pageX + measurements.width,
      y1: measurements.pageY,
      y2: measurements.pageY + measurements.height,
    };

    props.isHome
      ? setHomeScoreCoordinates(coordinates)
      : setVisitorScoreCoordinates(coordinates);
  };

  const onScoreLayout = () => {
    if (scoreRef.current) {
      scoreRef.current.measure((x, y, width, height, pageX, pageY) => {
        setScoreContainerWidth(width);
        handleScoreMeasurement({width, height, pageX, pageY});
      });
    }
  };

  const {width: screenWidth} = useWindowDimensions();
  let newTranslateX: number;
  if (props.isHome) {
    newTranslateX = homeIsOnLeft ? 0 : screenWidth / 2;
  } else {
    newTranslateX = homeIsOnLeft ? 0 : screenWidth / -2;
  }

  const isFirstRenderRef = useRef(true);
  const translateX = useRef(new Animated.Value(newTranslateX)).current;
  const rotateXRef = useRef(new Animated.Value(0));

  const updateCoordinates = () => {
    onNameLayout();
    onScoreLayout();
  };

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: newTranslateX,
      useNativeDriver: true,
    }).start(updateCoordinates);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTranslateX]);

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

    if (!isFirstRenderRef.current) {
      props.score > currentScore ? rotateTo90() : rotateToNegative90();
    }

    isFirstRenderRef.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.score]);

  let scoreFontSize: number;
  if (props.score < 100) {
    scoreFontSize = scoreContainerWidth / 1.6;
  } else {
    scoreFontSize = scoreContainerWidth / 1.9;
  }

  return (
    <Animated.View
      style={{
        ...styles.container,
        backgroundColor: appBackgroundColor,
        transform: [{translateX}],
      }}>
      <View style={styles.nameArea}>
        <View
          ref={nameRef}
          onLayout={onNameLayout}
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
                {
                  rotateX: rotateXRef.current.interpolate({
                    inputRange: [0, 360],
                    outputRange: ['0deg', '350deg'],
                  }),
                },
              ],
            },
          ]}
          onLayout={onScoreLayout}>
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
    borderWidth: 5,
  },
  score: {
    includeFontPadding: false,
    // backgroundColor: 'white',
    // transform: [{rotateX: '45deg'}, {perspective: 400}],
  },
});
