import React from 'react';
import {StatusBar} from 'react-native';
import {Scoreboard} from './components/Scoreboard';
import {PaperProvider} from 'react-native-paper';
import {TeamsProvider} from './contexts/TeamsContext';
import {GestureProvider} from './contexts/GestureContext';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <TeamsProvider>
        <GestureProvider>
          <StatusBar hidden translucent />
          <Scoreboard />
        </GestureProvider>
      </TeamsProvider>
    </PaperProvider>
  );
}

export default App;
