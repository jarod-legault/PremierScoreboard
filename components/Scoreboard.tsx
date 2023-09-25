import React, {useState} from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {useAppContext} from '../contexts/AppContext';
import {useTeamsContext} from '../contexts/TeamsContext';
import {SettingsModal} from './SettingsModal';
import {TeamScore} from './TeamScore';

export function Scoreboard() {
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

  const [modalIsVisible, setModalIsVisible] = useState(false);

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
        onPressName={() => setModalIsVisible(true)}
      />
      <TeamScore
        backgroundColor={visitorBackgroundColor}
        textColor={visitorTextColor}
        name={visitorName}
        score={visitorScore}
        translateX={visitorTranslateX}
        onIncrement={incrementVisitorScore}
        onDecrement={decrementVisitorScore}
        onPressName={() => setModalIsVisible(true)}
      />
      <SettingsModal
        visible={modalIsVisible}
        onRequestCloseModal={() => setModalIsVisible(false)}
        onRequestOpenModal={() => setModalIsVisible(true)}
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
