import React from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton, Text} from 'react-native-paper';

type Props = {
  text: string;
};

export function BulletPoint(props: Props) {
  return (
    <View style={styles.row}>
      <IconButton icon="circle" size={10} />
      <Text>{props.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
