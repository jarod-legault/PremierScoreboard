import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Scoreboard} from './components/Scoreboard';

function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Scoreboard />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
