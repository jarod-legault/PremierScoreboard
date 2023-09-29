import React from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  text: string;
};

export function BulletPoint(props: Props) {
  return (
    <View style={styles.row}>
      <Icon name="check-circle-outline" size={22} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.text}>{props.text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 10,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontFamily: Platform.OS === 'ios' ? 'Arvo' : 'Arvo-Regular',
    fontSize: 16,
    flexShrink: 1,
    marginHorizontal: 6,
  },
  icon: {
    marginTop: 1,
  },
});
