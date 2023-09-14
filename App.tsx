import React from 'react';
import {Scoreboard} from './components/Scoreboard';
import {PaperProvider} from 'react-native-paper';
import {TeamsProvider} from './contexts/TeamsContext';
import {GestureProvider} from './contexts/GestureContext';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <TeamsProvider>
        <GestureProvider>
          <Scoreboard />
        </GestureProvider>
      </TeamsProvider>
    </PaperProvider>
  );
}

export default App;
