import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Scoreboard} from './components/Scoreboard';
import {PaperProvider} from 'react-native-paper';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <View style={styles.container}>
        <Scoreboard />
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1},
});

export default App;
