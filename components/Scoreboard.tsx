import React, {useRef, useState} from 'react';
import {StyleSheet, useWindowDimensions} from 'react-native';
import {useTeamsContext} from '../contexts/TeamsContext';
import {PointsModal} from './PointsModal';
import {SettingsModal} from './SettingsModal';
import {TeamScore} from './TeamScore';
import LinearGradient from 'react-native-linear-gradient';

const LIGHT_GREY_LEVEL = 210;
const DARK_GREY_LEVEL = 100;

const backgroundGradientColors = [
  `rgb(${DARK_GREY_LEVEL}, ${DARK_GREY_LEVEL}, ${DARK_GREY_LEVEL})`,
  `rgb(${LIGHT_GREY_LEVEL}, ${LIGHT_GREY_LEVEL}, ${LIGHT_GREY_LEVEL})`,
  `rgb(${DARK_GREY_LEVEL}, ${DARK_GREY_LEVEL}, ${DARK_GREY_LEVEL})`,
];

export function Scoreboard() {
  const [settingsModalIsVisible, setSettingsModalIsVisible] = useState(false);
  const [pointsModalIsVisible, setPointsModalIsVisible] = useState(false);
  const [isIncrement, setIsIncrement] = useState(false);

  const {
    homeIsOnLeft,
    homeName,
    homeScore,
    incrementHomeScore,
    decrementHomeScore,
    homeBackgroundColor,
    homeTextColor,
    visitorName,
    visitorScore,
    incrementVisitorScore,
    decrementVisitorScore,
    visitorBackgroundColor,
    visitorTextColor,
    isInitialized,
  } = useTeamsContext();

  const handlePointSelectRef = useRef(incrementHomeScore);

  function showHomePointsIncrementModal() {
    setIsIncrement(true);
    handlePointSelectRef.current = incrementHomeScore;
    setPointsModalIsVisible(true);
  }

  function showHomePointsDecrementModal() {
    setIsIncrement(false);
    handlePointSelectRef.current = decrementHomeScore;
    setPointsModalIsVisible(true);
  }

  function showVisitorPointsIncrementModal() {
    setIsIncrement(true);
    handlePointSelectRef.current = incrementVisitorScore;
    setPointsModalIsVisible(true);
  }

  function showVisitorPointsDecrementModal() {
    setIsIncrement(false);
    handlePointSelectRef.current = decrementVisitorScore;
    setPointsModalIsVisible(true);
  }

  function handlePointSelect(pointValue: number) {
    handlePointSelectRef.current(pointValue);
    setPointsModalIsVisible(false);
  }

  const {width: screenWidth} = useWindowDimensions();
  const homeTranslateX = homeIsOnLeft ? 0 : screenWidth / 2;
  const visitorTranslateX = homeIsOnLeft ? 0 : screenWidth / -2;

  if (!isInitialized) return null;

  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={backgroundGradientColors}
      style={[styles.container]}>
      <TeamScore
        backgroundColor={homeBackgroundColor}
        textColor={homeTextColor}
        name={homeName}
        score={homeScore}
        translateX={homeTranslateX}
        onIncrement={incrementHomeScore}
        onDecrement={decrementHomeScore}
        onPressName={() => setSettingsModalIsVisible(true)}
        onLongPressTop={showHomePointsIncrementModal}
        onLongPressBottom={showHomePointsDecrementModal}
      />
      <TeamScore
        backgroundColor={visitorBackgroundColor}
        textColor={visitorTextColor}
        name={visitorName}
        score={visitorScore}
        translateX={visitorTranslateX}
        onIncrement={incrementVisitorScore}
        onDecrement={decrementVisitorScore}
        onPressName={() => setSettingsModalIsVisible(true)}
        onLongPressTop={showVisitorPointsIncrementModal}
        onLongPressBottom={showVisitorPointsDecrementModal}
      />
      <SettingsModal
        visible={settingsModalIsVisible}
        onRequestCloseModal={() => setSettingsModalIsVisible(false)}
        onRequestOpenModal={() => setSettingsModalIsVisible(true)}
      />
      <PointsModal
        visible={pointsModalIsVisible}
        isIncrement={isIncrement}
        onPointSelect={handlePointSelect}
        onRequestCloseModal={() => setPointsModalIsVisible(false)}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
