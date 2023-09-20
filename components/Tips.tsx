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
    <Surface style={[props.style, styles.container]}>
      <Text style={styles.header}>Tips</Text>
      <View style={styles.tipsContainer}>
        <BulletPoint text="Tap on either team name to get to the settings screen." />
        <BulletPoint text="Swipe ➡️ or ⬅️ to swap sides." />
        <BulletPoint text="Tap on the top half or bottom half of a score to ⬆️ or ⬇️ the score." />
        <Text style={styles.or}>OR</Text>
        <BulletPoint text="Swipe ⬆️ or ⬇️ on a team score to ⬆️ or ⬇️ the score." />
      </View>
      <Button onPress={props.onRequestClose}>Got it!</Button>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  or: {
    marginLeft: 50,
  },
  tipsContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
});
