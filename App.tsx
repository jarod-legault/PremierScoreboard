import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Scoreboard} from './components/Scoreboard';

function App(): JSX.Element {
  return (
    <View style={styles.container}>
      <Scoreboard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
