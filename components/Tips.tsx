import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {Button, Surface, Text} from 'react-native-paper';
import {BulletPoint} from './BulletPoint';

type Props = {
  onRequestClose: () => void;
  style: ViewStyle;
};

export function Tips(props: Props) {
  return (
    <View style={[props.style, styles.container]}>
      <Surface style={styles.surface}>
        <Text style={styles.header}>Tips</Text>
        <View style={styles.tipsContainer}>
          <BulletPoint text="Tap on either team name to go to the settings screen." />
          <BulletPoint text="Tap on the top half or bottom half of a score to ⬆️ or ⬇️ the score." />
          <BulletPoint text="Long press on the top half or bottom half of a score to ⬆️ or ⬇️ the score by an amount greater than 1." />
        </View>
        <Button onPress={props.onRequestClose}>Got it!</Button>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    maxWidth: '90%',
    borderRadius: 5,
  },
  surface: {
    flex: 1,
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  tipsContainer: {
    alignItems: 'stretch',
  },
});
