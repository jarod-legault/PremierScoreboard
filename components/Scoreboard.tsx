import React from 'react';
import {StyleSheet, View} from 'react-native';
import {usePersistentState} from '../hooks/usePersistentState';
import {TeamScore} from './TeamScore';

export function Scoreboard() {
  const {homeScore, setHomeScore, isInitialized} = usePersistentState();

  return (
    <View style={styles.container}>
      <TeamScore
        name="Lions"
        score={homeScore}
        fontColor="gold"
        backgroundColor="black"
      />
      <TeamScore
        name="Tigers"
        score={8}
        fontColor="red"
        backgroundColor="blue"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
  },
});
