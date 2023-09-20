import React, {useRef} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import {useGestureContext} from '../contexts/GestureContext';
import {useTeamsContext} from '../contexts/TeamsContext';

const MINIMUM_SWIPE_LENGTH = 50;
const CENTER_WIDTH = 50;

type TouchInfo = {
  isTap: boolean;
  startsWithinTeamName: boolean;
  startsNearCenterLine: boolean;
  isHorizontal: boolean;
  isUp: boolean;
  isDown: boolean;
  staysOnLeft: boolean;
  staysOnRight: boolean;
  staysOnTop: boolean;
  staysOnBottom: boolean;
};

type Props = {
  onNameTap: () => void;
};

export function GestureArea(props: Props) {
  const {
    decrementHomeScore,
    incrementHomeScore,
    decrementVisitorScore,
    incrementVisitorScore,
    homeIsOnLeft,
    setHomeIsOnLeft,
  } = useTeamsContext();

  const {getHomeNameCoordinates, getVisitorNameCoordinates} =
    useGestureContext();

  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const endXRef = useRef(0);
  const endYRef = useRef(0);

  const {width: screenWidth, height: screenHeight} = useWindowDimensions();

  const handlePressIn = (event: GestureResponderEvent) => {
    const {locationX, locationY} = event.nativeEvent;
    startXRef.current = locationX;
    startYRef.current = locationY;
  };

  const handleScoreTap = (touchInfo: TouchInfo) => {
    if (touchInfo.staysOnTop && touchInfo.staysOnLeft) {
      homeIsOnLeft ? incrementHomeScore() : incrementVisitorScore();
    } else if (touchInfo.staysOnTop && touchInfo.staysOnRight) {
      homeIsOnLeft ? incrementVisitorScore() : incrementHomeScore();
    } else if (touchInfo.staysOnBottom && touchInfo.staysOnRight) {
      homeIsOnLeft ? decrementVisitorScore() : decrementHomeScore();
    } else if (touchInfo.staysOnBottom && touchInfo.staysOnLeft) {
      homeIsOnLeft ? decrementHomeScore() : decrementVisitorScore();
    }
  };

  const handleTap = (touchInfo: TouchInfo) => {
    if (touchInfo.startsWithinTeamName) {
      props.onNameTap();
    } else if (!touchInfo.startsNearCenterLine) {
      handleScoreTap(touchInfo);
    }
  };

  const handleSwipe = (touchInfo: TouchInfo) => {
    if (touchInfo.isHorizontal) {
      setHomeIsOnLeft(!homeIsOnLeft);
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

  const handlePressOut = (event: GestureResponderEvent) => {
    const {locationX, locationY} = event.nativeEvent;
    endXRef.current = locationX;
    endYRef.current = locationY;

    const touchInfo = getTouchInfo();

    touchInfo.isTap ? handleTap(touchInfo) : handleSwipe(touchInfo);
  };

  const getTouchInfo = (): TouchInfo => {
    const startX = startXRef.current;
    const endX = endXRef.current;
    const startY = startYRef.current;
    const endY = endYRef.current;

    const deltaX = Math.abs(startX - endX);
    const deltaY = Math.abs(startY - endY);

    const isTap =
      deltaX < MINIMUM_SWIPE_LENGTH && deltaY < MINIMUM_SWIPE_LENGTH;

    const homeNameCoordinates = getHomeNameCoordinates();
    const startsWithinHomeTeamName =
      startX > homeNameCoordinates.x1 &&
      startX < homeNameCoordinates.x2 &&
      startY > homeNameCoordinates.y1 &&
      startY < homeNameCoordinates.y2;
    const visitorNameCoordinates = getVisitorNameCoordinates();
    const startsWithinVisitorTeamName =
      startX > visitorNameCoordinates.x1 &&
      startX < visitorNameCoordinates.x2 &&
      startY > visitorNameCoordinates.y1 &&
      startY < visitorNameCoordinates.y2;
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

  return (
    <Pressable
      style={styles.pressable}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
    />
  );
}

const styles = StyleSheet.create({
  pressable: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    top: 0,
  },
});
