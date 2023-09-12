import React, {useRef} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';
import {usePersistentState} from '../hooks/usePersistentState';
import {Measurements, TeamScore} from './TeamScore';

const directions = {
  UP: 'up',
  DOWN: 'down',
  HORIZONTAL: 'horizontal',
} as const;

const MINIMUM_SWIPE_LENGTH = 50;
const CENTER_WIDTH = 50;

type PressInfo = {
  horizontalMidpoint: number;
  verticalMidpoint: number;
  width: number;
  height: number;
  direction: typeof directions;
};

// HomeMatchCount
// HomeFontColor
// HomeBackgroundColor
// VisitorName
// VisitorMatchCount
// VisitorFontColor
// VisitorBackgroundColor

export function Scoreboard() {
  const {
    homeIsOnLeft,
    homeScore,
    setHomeIsOnLeft,
    setHomeScore,
    setVisitorScore,
    visitorScore,
    isInitialized,
  } = usePersistentState();

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const endXRef = useRef(0);
  const endYRef = useRef(0);
  const homeNameX1Ref = useRef(0);
  const homeNameX2Ref = useRef(0);
  const homeNameY1Ref = useRef(0);
  const homeNameY2Ref = useRef(0);
  const visitorNameX1Ref = useRef(0);
  const visitorNameX2Ref = useRef(0);
  const visitorNameY1Ref = useRef(0);
  const visitorNameY2Ref = useRef(0);

  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  const decrementHomeScore = () => {
    const newScore = homeScore - 1;
    setHomeScore(newScore);
  };

  const incrementHomeScore = () => {
    const newScore = homeScore + 1;
    setHomeScore(newScore);
  };

  const decrementVisitorScore = () => {
    const newScore = visitorScore - 1;
    setVisitorScore(newScore);
  };

  const incrementVisitorScore = () => {
    const newScore = visitorScore + 1;
    setVisitorScore(newScore);
  };

  const handleHomeNameMeasurement = (measurements: Measurements) => {
    const {pageX, pageY, width, height} = measurements;
    homeNameX1Ref.current = pageX;
    homeNameX2Ref.current = pageX + width;
    homeNameY1Ref.current = pageY;
    homeNameY2Ref.current = pageY + height;
  };

  const handleVisitorNameMeasurement = (measurements: Measurements) => {
    const {pageX, pageY, width, height} = measurements;
    visitorNameX1Ref.current = pageX;
    visitorNameX2Ref.current = pageX + width;
    visitorNameY1Ref.current = pageY;
    visitorNameY2Ref.current = pageY + height;
  };

  const handlePressIn = (event: GestureResponderEvent) => {
    const {locationX, locationY} = event.nativeEvent;
    startXRef.current = locationX;
    startYRef.current = locationY;
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    const {locationX, locationY} = event.nativeEvent;
    endXRef.current = locationX;
    endYRef.current = locationY;

    const touchInfo = getTouchInfo();

    if (touchInfo.isTap) {
      if (touchInfo.startsWithinTeamName) {
        console.log('Tapped team name. Open settings modal.');
      } else if (!touchInfo.startsNearCenterLine) {
        if (touchInfo.staysOnTop && touchInfo.staysOnLeft) {
          homeIsOnLeft ? incrementHomeScore() : incrementVisitorScore();
        } else if (touchInfo.staysOnTop && touchInfo.staysOnRight) {
          homeIsOnLeft ? incrementVisitorScore() : incrementHomeScore();
        } else if (touchInfo.staysOnBottom && touchInfo.staysOnRight) {
          homeIsOnLeft ? decrementVisitorScore() : decrementHomeScore();
        } else if (touchInfo.staysOnBottom && touchInfo.staysOnLeft) {
          homeIsOnLeft ? decrementHomeScore() : decrementVisitorScore();
        }
      }
    } else if (touchInfo.isHorizontal) {
      setHomeIsOnLeft(!homeIsOnLeft); // Change this to a method called `swapScores`
    } else if (touchInfo.isUp && touchInfo.staysOnLeft) {
      homeIsOnLeft ? incrementHomeScore() : incrementVisitorScore();
    } else if (touchInfo.isDown && touchInfo.staysOnLeft) {
      homeIsOnLeft ? decrementHomeScore() : decrementVisitorScore();
    } else if (touchInfo.isUp && touchInfo.staysOnRight) {
      homeIsOnLeft ? incrementVisitorScore() : incrementHomeScore();
    } else if (touchInfo.isDown && touchInfo.staysOnRight) {
      homeIsOnLeft ? decrementVisitorScore() : decrementHomeScore();
    }
  };

  const getTouchInfo = () => {
    const startX = startXRef.current;
    const endX = endXRef.current;
    const startY = startYRef.current;
    const endY = endYRef.current;
    const homeNameX1 = homeNameX1Ref.current;
    const homeNameX2 = homeNameX2Ref.current;
    const homeNameY1 = homeNameY1Ref.current;
    const homeNameY2 = homeNameY2Ref.current;
    const visitorNameX1 = visitorNameX1Ref.current;
    const visitorNameX2 = visitorNameX2Ref.current;
    const visitorNameY1 = visitorNameY1Ref.current;
    const visitorNameY2 = visitorNameY2Ref.current;

    const deltaX = Math.abs(startX - endX);
    const deltaY = Math.abs(startY - endY);

    const isTap =
      deltaX < MINIMUM_SWIPE_LENGTH && deltaY < MINIMUM_SWIPE_LENGTH;

    const startsWithinHomeTeamName =
      startX > homeNameX1 &&
      startX < homeNameX2 &&
      startY > homeNameY1 &&
      startY < homeNameY2;
    const startsWithinVisitorTeamName =
      startX > visitorNameX1 &&
      startX < visitorNameX2 &&
      startY > visitorNameY1 &&
      startY < visitorNameY2;
    const startsWithinTeamName =
      startsWithinHomeTeamName || startsWithinVisitorTeamName;

    const horizontalCenter = screenHeight / 2;
    const verticalCenter = screenWidth / 2;
    const startsNearHorizontalCenter =
      Math.abs(startY - horizontalCenter) < CENTER_WIDTH / 2;
    const startsNearVerticalCenter =
      Math.abs(startX - verticalCenter) < CENTER_WIDTH / 2;
    const startsNearCenterLine =
      startsNearHorizontalCenter || startsNearVerticalCenter;

    const isHorizontal = deltaX > deltaY;
    const isVertical = deltaY > deltaX;
    const isUp = isVertical && startY > endY;
    const isDown = isVertical && startY < endY;

    const staysOnLeft = startX < verticalCenter && endX < verticalCenter;
    const staysOnRight = startX > verticalCenter && endX > verticalCenter;
    const staysOnTop = startY < horizontalCenter && endY < horizontalCenter;
    const staysOnBottom = startY > horizontalCenter && endY > horizontalCenter;

    return {
      isTap,
      startsWithinTeamName,
      startsNearCenterLine,
      isHorizontal,
      isUp,
      isDown,
      staysOnLeft,
      staysOnRight,
      staysOnTop,
      staysOnBottom,
    };
  };

  const homeTranslateX = homeIsOnLeft ? 0 : screenWidth / 2;
  const visitorTranslateX = homeIsOnLeft ? 0 : screenWidth / -2;

  if (!isInitialized) return null;

  return (
    <View style={styles.container}>
      <TeamScore
        backgroundColor="black"
        fontColor="gold"
        name="Lions"
        onNameMeasure={handleHomeNameMeasurement}
        score={homeScore}
        translateX={homeTranslateX}
      />
      <TeamScore
        backgroundColor="blue"
        fontColor="red"
        onNameMeasure={handleVisitorNameMeasurement}
        name="Tigers"
        score={visitorScore}
        translateX={visitorTranslateX}
      />
      <Pressable
        style={styles.pressable}
        onLayout={handlePressableLayout}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
  },
  pressable: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
