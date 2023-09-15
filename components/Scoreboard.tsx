import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTeamsContext} from '../contexts/TeamsContext';
import {GestureArea} from './GestureArea';
import {SettingsModal} from './SettingsModal';
import {TeamScore} from './TeamScore';

export function Scoreboard() {
  const {
    homeName,
    homeScore,
    homeBackgroundColor,
    homeTextColor,
    visitorName,
    visitorScore,
    visitorBackgroundColor,
    visitorTextColor,
    isInitialized,
  } = useTeamsContext();

  const [modalIsVisible, setModalIsVisible] = useState(false);

  if (!isInitialized) return null;

  return (
    <View style={styles.container}>
      <TeamScore
        isHome={true}
        backgroundColor={homeBackgroundColor}
        textColor={homeTextColor}
        name={homeName}
        score={homeScore}
      />
      <TeamScore
        isHome={false}
        backgroundColor={visitorBackgroundColor}
        textColor={visitorTextColor}
        name={visitorName}
        score={visitorScore}
      />
      <GestureArea onNameTap={() => setModalIsVisible(true)} />
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
