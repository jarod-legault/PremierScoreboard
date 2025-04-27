import React from 'react';
import {Button, Dialog, Surface} from 'react-native-paper';
import {Text} from './Text';
import {StyleSheet, View} from 'react-native';
import Colors from '../Colors';

type Props = {
  title?: string;
  content?: string;
  onRequestClose: () => void;
  onConfirm: () => void;
  confirmText: string;
  cancelText: string;
  style?: object;
};

export function Confirmation(props: Props) {
  return (
    <Surface style={[props.style, styles.container]}>
      <Dialog.Title style={{color: Colors.text}}>{props.title}</Dialog.Title>
      {props.content && (
        <Dialog.Content>
          <Text>{props.content}</Text>
        </Dialog.Content>
      )}
      <View style={styles.buttonContainer}>
        <Button
          mode="elevated"
          onPress={props.onRequestClose}
          textColor="white"
          buttonColor="red">
          {props.cancelText}
        </Button>
        <Button
          mode="elevated"
          onPress={props.onConfirm}
          textColor="white"
          buttonColor={Colors.logoBlue}>
          {props.confirmText}
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    minWidth: 250,
    borderRadius: 5,
    padding: 20,
  },
  buttonContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
