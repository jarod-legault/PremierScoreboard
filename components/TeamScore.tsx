import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  LayoutChangeEvent,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  ViewProps,
} from 'react-native';
import {useGestureContext} from '../contexts/GestureContext';
import {useTeamsContext} from '../contexts/TeamsContext';
import {useAppContext} from '../contexts/AppContext';

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
  const {appBackgroundColor} = useAppContext();
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

  useEffect(() => {
    Animated.spring(translateX, {
      toValue: newTranslateX,
      useNativeDriver: true,
    }).start(onNameLayout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTranslateX]);

  let scoreFontSize: number;
  if (props.score < 100) {
    scoreFontSize = scoreContainerWidth / 1.5;
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
          style={[
            styles.nameContainer,
            {
              backgroundColor: props.backgroundColor,
              borderColor: props.textColor,
            },
          ]}>
          <Text
            ref={nameRef}
            style={{
              ...styles.name,
              color: props.textColor,
            }}
            adjustsFontSizeToFit
            onLayout={onNameLayout}>
            {props.name}
          </Text>
        </View>
      </View>
      <View style={styles.scoreArea}>
        <View
          style={[
            styles.scoreContainer,
            {
              backgroundColor: props.backgroundColor,
              borderColor: props.textColor,
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
              {props.score}
            </Text>
          )}
        </View>
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
    height: '95%',
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 5,
  },
  score: {
    includeFontPadding: false,
    textAlign: 'center',
    // backgroundColor: 'white',
    // transform: [{rotateX: '45deg'}, {perspective: 400}],
  },
});
