import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from './Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../Colors';

type Props = {
  text: string;
};

export function BulletPoint(props: Props) {
  return (
    <View style={styles.row}>
      <Icon
        testID="bulletIcon"
        name="check-circle-outline"
        color={Colors.text}
        size={22}
        style={styles.icon}
      />
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
    marginTop: 20,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 18,
    flexShrink: 1,
    marginHorizontal: 6,
  },
  icon: {
    marginTop: 1,
  },
});
