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
const SCREEN_EDGE_WIDTH = 20;

type TouchInfo = {
  isTap: boolean;
  startsWithinTeamName: boolean;
  isHorizontal: boolean;
  isUp: boolean;
  isDown: boolean;
  staysOnLeft: boolean;
  staysOnRight: boolean;
  startsInHomeScoreTopHalf: boolean;
  startsInHomeScoreBottomHalf: boolean;
  startsInVisitorScoreTopHalf: boolean;
  startsInVisitorScoreBottomHalf: boolean;
  startsNearScreenEdge: boolean;
  startsInHomeScore: boolean;
  startsInVisitorScore: boolean;
  endsInHomeHalf: boolean;
  endsInVisitorHalf: boolean;
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

  const {
    getHomeNameCoordinates,
    getHomeScoreCoordinates,
    getVisitorNameCoordinates,
    getVisitorScoreCoordinates,
  } = useGestureContext();

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

  const handleTap = (touchInfo: TouchInfo) => {
    if (touchInfo.startsWithinTeamName) {
      props.onNameTap();
    } else if (touchInfo.startsInHomeScoreTopHalf) {
      incrementHomeScore();
    } else if (touchInfo.startsInHomeScoreBottomHalf) {
      decrementHomeScore();
    } else if (touchInfo.startsInVisitorScoreTopHalf) {
      incrementVisitorScore();
    } else if (touchInfo.startsInVisitorScoreBottomHalf) {
      decrementVisitorScore();
    }
  };

  const handleSwipe = (touchInfo: TouchInfo) => {
    const {
      startsNearScreenEdge,
      isHorizontal,
      isUp,
      isDown,
      startsInHomeScore,
      endsInHomeHalf,
      startsInVisitorScore,
      endsInVisitorHalf,
    } = touchInfo;

    if (startsNearScreenEdge) return;

    if (isHorizontal) {
      setHomeIsOnLeft(!homeIsOnLeft);
    } else if (isUp && startsInHomeScore && endsInHomeHalf) {
      incrementHomeScore();
    } else if (isDown && startsInHomeScore && endsInHomeHalf) {
      decrementHomeScore();
    } else if (isUp && startsInVisitorScore && endsInVisitorHalf) {
      incrementVisitorScore();
    } else if (isDown && startsInVisitorScore && endsInVisitorHalf) {
      decrementVisitorScore();
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
    const isSwipe = !isTap;

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

    const {
      x1: homeScoreX1,
      x2: homeScoreX2,
      y1: homeScoreY1,
      y2: homeScoreY2,
    } = getHomeScoreCoordinates();
    const {
      x1: visitorScoreX1,
      x2: visitorScoreX2,
      y1: visitorScoreY1,
      y2: visitorScoreY2,
    } = getVisitorScoreCoordinates();
    const scoreMidHeight = Math.round((homeScoreY2 + homeScoreY1) / 2);
    const screenMidWidth = screenWidth / 2;

    const isHorizontal = isSwipe && deltaX > deltaY;
    const isVertical = isSwipe && deltaY > deltaX;
    const isUp = isVertical && startY > endY;
    const isDown = isVertical && startY < endY;

    const staysOnLeft = startX < screenMidWidth && endX < screenMidWidth;
    const staysOnRight = startX > screenMidWidth && endX > screenMidWidth;

    const startsInHomeScoreTopHalf =
      startX > homeScoreX1 &&
      startX < homeScoreX2 &&
      startY > homeScoreY1 &&
      startY < scoreMidHeight - CENTER_WIDTH / 2;
    const startsInHomeScoreBottomHalf =
      startX > homeScoreX1 &&
      startX < homeScoreX2 &&
      startY > scoreMidHeight + CENTER_WIDTH / 2 &&
      startY < homeScoreY2;
    const startsInVisitorScoreTopHalf =
      startX > visitorScoreX1 &&
      startX < visitorScoreX2 &&
      startY > visitorScoreY1 &&
      startY < scoreMidHeight - CENTER_WIDTH / 2;
    const startsInVisitorScoreBottomHalf =
      startX > visitorScoreX1 &&
      startX < visitorScoreX2 &&
      startY > scoreMidHeight + CENTER_WIDTH / 2 &&
      startY < visitorScoreY2;

    const startsNearScreenEdge =
      startX < SCREEN_EDGE_WIDTH ||
      startX > screenWidth - SCREEN_EDGE_WIDTH ||
      startY < SCREEN_EDGE_WIDTH ||
      startY > screenHeight - SCREEN_EDGE_WIDTH;

    const startsInHomeScore =
      startX > homeScoreX1 &&
      startX < homeScoreX2 &&
      startY > homeScoreY1 &&
      startY < homeScoreY2;
    const startsInVisitorScore =
      startX > visitorScoreX1 &&
      startX < visitorScoreX2 &&
      startY > visitorScoreY1 &&
      startY < visitorScoreY2;

    const endsInLeftHalf = endX < screenMidWidth;
    const endsInHomeHalf =
      (homeIsOnLeft && endsInLeftHalf) || (!homeIsOnLeft && !endsInLeftHalf);
    const endsInVisitorHalf = !endsInHomeHalf;

    return {
      isTap,
      startsWithinTeamName,
      isHorizontal,
      isUp,
      isDown,
      staysOnLeft,
      staysOnRight,
      startsInHomeScoreTopHalf,
      startsInHomeScoreBottomHalf,
      startsInVisitorScoreTopHalf,
      startsInVisitorScoreBottomHalf,
      startsNearScreenEdge,
      startsInHomeScore,
      startsInVisitorScore,
      endsInHomeHalf,
      endsInVisitorHalf,
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
