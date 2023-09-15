import React from 'react';
import {Button, Dialog, Surface, Text} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

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
      <Dialog.Title>{props.title}</Dialog.Title>
      {props.content && (
        <Dialog.Content>
          <Text variant="bodyMedium">{props.content}</Text>
        </Dialog.Content>
      )}
      <View style={styles.buttonContainer}>
        <Dialog.Actions>
          <Button onPress={props.onRequestClose}>{props.cancelText}</Button>
        </Dialog.Actions>
        <Dialog.Actions>
          <Button onPress={props.onConfirm}>{props.confirmText}</Button>
        </Dialog.Actions>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
  },
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
});
