import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TeamScore} from './TeamScore';

export function Scoreboard() {
  return (
    <View style={styles.container}>
      <TeamScore
        name="Lions"
        score={12}
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
