import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useTeamsContext} from '../contexts/TeamsContext';
import {GestureArea} from './GestureArea';
import {SettingsModal} from './SettingsModal';
import {TeamScore} from './TeamScore';

export function Scoreboard() {
  const {
    homeIsOnLeft,
    homeName,
    homeScore,
    setHomeName,
    setVisitorName,
    visitorName,
    visitorScore,
    isInitialized,
  } = useTeamsContext();

  const [modalIsVisible, setModalIsVisible] = useState(false);

  if (!isInitialized) return null;

  return (
    <View style={styles.container}>
      <TeamScore
        isHome={true}
        backgroundColor="black"
        fontColor="gold"
        name={homeName}
        score={homeScore}
      />
      <TeamScore
        isHome={false}
        backgroundColor="blue"
        fontColor="red"
        name={visitorName}
        score={visitorScore}
      />
      <GestureArea onNameTap={() => setModalIsVisible(true)} />
      <SettingsModal
        visible={modalIsVisible}
        homeName={homeName}
        homeIsOnLeft={homeIsOnLeft}
        onChangeHomeName={setHomeName}
        visitorName={visitorName}
        onChangeVisitorName={setVisitorName}
        onCloseButtonPress={() => setModalIsVisible(false)}
        onRequestClose={() => setModalIsVisible(false)}
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
