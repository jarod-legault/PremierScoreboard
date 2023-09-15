import React, {useRef} from 'react';
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
  const {homeIsOnLeft} = useTeamsContext();

  const nameRef = useRef<Text>(null);

  const {setHomeNameCoordinates, setVisitorNameCoordinates} =
    useGestureContext();

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

  const {width: screenWidth} = useWindowDimensions();
  let newTranslateX: number;
  if (props.isHome) {
    newTranslateX = homeIsOnLeft ? 0 : screenWidth / 2;
  } else {
    newTranslateX = homeIsOnLeft ? 0 : screenWidth / -2;
  }
  const translateX = useRef(new Animated.Value(newTranslateX)).current;

  Animated.timing(translateX, {
    toValue: newTranslateX,
    duration: 200,
    easing: Easing.ease,
    useNativeDriver: true,
  }).start(onNameLayout);

  return (
    <Animated.View
      style={{
        ...styles.container,
        backgroundColor: props.backgroundColor,
        transform: [{translateX}],
      }}>
      <View style={styles.nameContainer}>
        <Text
          ref={nameRef}
          style={{...styles.name, color: props.textColor}}
          onLayout={onNameLayout}>
          {props.name}
        </Text>
      </View>
      <View style={styles.scoreContainer}>
        <Text style={{...styles.score, color: props.textColor}}>
          {props.score}
        </Text>
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
