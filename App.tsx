import React from 'react';
import {Scoreboard} from './components/Scoreboard';
import {PaperProvider} from 'react-native-paper';
import {TeamsProvider} from './contexts/TeamsContext';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <TeamsProvider>
        <Scoreboard />
      </TeamsProvider>
    </PaperProvider>
  );
}

export default App;
