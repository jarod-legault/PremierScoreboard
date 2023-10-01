import React from 'react';
import {Platform, StyleSheet, View, ViewStyle} from 'react-native';
import {IconButton, Surface, Text} from 'react-native-paper';
import {BulletPoint} from './BulletPoint';

type Props = {
  onRequestClose: () => void;
  style: ViewStyle;
};

export function Tips(props: Props) {
  return (
    <View style={styles.background}>
      <View style={[props.style, styles.container]}>
        <Surface style={styles.surface}>
          <IconButton
            style={styles.closeButton}
            size={30}
            icon="close-box"
            onPress={props.onRequestClose}
          />
          <Text style={styles.header}>Tips</Text>
          <View style={styles.tipsContainer}>
            <BulletPoint text="Tap on either team name to go to the settings screen." />
            <BulletPoint text="Tap on the top half or bottom half of a score to ⬆️ or ⬇️ the score." />
            <BulletPoint text="Long press on the top half or bottom half of a score to ⬆️ or ⬇️ the score by an amount greater than 1." />
          </View>
        </Surface>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 5,
    maxWidth: 600,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  surface: {
    padding: 20,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'lightgrey',
  },
  header: {
    fontFamily: Platform.OS === 'ios' ? 'Arvo' : 'Arvo-Regular',
    fontSize: 36,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
  },
  tipsContainer: {
    alignItems: 'stretch',
    marginBottom: 10,
    marginHorizontal: 20,
  },
});
