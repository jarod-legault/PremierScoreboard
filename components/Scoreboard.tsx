import React from 'react';
import {StyleSheet, useWindowDimensions, View} from 'react-native';
import {usePersistentState} from '../hooks/usePersistentState';
import {TeamScore} from './TeamScore';
import {IconButton} from 'react-native-paper';

// HomeMatchCount
// HomeFontColor
// HomeBackgroundColor
// VisitorName
// VisitorMatchCount
// VisitorFontColor
// VisitorBackgroundColor

export function Scoreboard() {
  const {
    homeIsOnLeft,
    homeScore,
    setHomeIsOnLeft,
    setHomeScore,
    setVisitorScore,
    visitorScore,
    isInitialized,
  } = usePersistentState();

  const {width} = useWindowDimensions();

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

  const homeTranslateX = homeIsOnLeft ? 0 : width / 2;
  const visitorTranslateX = homeIsOnLeft ? 0 : width / -2;

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
        translateX={homeTranslateX}
      />
      <TeamScore
        backgroundColor="blue"
        fontColor="red"
        onDecrement={decrementVisitorScore}
        onIncrement={incrementVisitorScore}
        name="Tigers"
        score={visitorScore}
        translateX={visitorTranslateX}
      />
      <View style={styles.swapIconContainer}>
        <IconButton
          icon="swap-horizontal"
          iconColor="black"
          size={20}
          onPress={() => setHomeIsOnLeft(!homeIsOnLeft)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'row',
  },
  swapIconContainer: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 30,
    position: 'absolute',
    bottom: 10,
    left: 330,
  },
});
