import React, {useRef, useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {useAppContext} from '../contexts/AppContext';
import {useTeamsContext} from '../contexts/TeamsContext';
import {PointsModal} from './PointsModal';
import {SettingsModal} from './SettingsModal';
import {TeamScore} from './TeamScore';

export function Scoreboard() {
  const [settingsModalIsVisible, setSettingsModalIsVisible] = useState(false);
  const [pointsModalIsVisible, setPointsModalIsVisible] = useState(false);
  const [isIncrement, setIsIncrement] = useState(false);

  const {appBackgroundColor} = useAppContext();
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
    <View style={[styles.container, {backgroundColor: appBackgroundColor}]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});
