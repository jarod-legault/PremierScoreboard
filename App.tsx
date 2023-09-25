import React from 'react';
import {StatusBar} from 'react-native';
import {Scoreboard} from './components/Scoreboard';
import {PaperProvider} from 'react-native-paper';
import {TeamsProvider} from './contexts/TeamsContext';
import {AppProvider} from './contexts/AppContext';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <AppProvider>
        <TeamsProvider>
          <StatusBar hidden translucent />
          <Scoreboard />
        </TeamsProvider>
      </AppProvider>
    </PaperProvider>
  );
}

export default App;
