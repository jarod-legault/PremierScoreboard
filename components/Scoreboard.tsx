import React from 'react';
import {StyleSheet, View} from 'react-native';
import {usePersistentState} from '../hooks/usePersistentState';
import {TeamScore} from './TeamScore';

export function Scoreboard() {
  const {
    homeScore,
    setHomeScore,
    setVisitorScore,
    visitorScore,
    isInitialized,
  } = usePersistentState();

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

  if (!isInitialized) return null;

  return (
    <View style={styles.container}>
      <TeamScore
        backgroundColor="black"
        fontColor="gold"
        onDecrement={decrementHomeScore}
        onIncrement={incrementHomeScore}
        name="Lions"
        score={homeScore}
      />
      <TeamScore
        backgroundColor="blue"
        fontColor="red"
        onDecrement={decrementVisitorScore}
        onIncrement={incrementVisitorScore}
        name="Tigers"
        score={visitorScore}
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
