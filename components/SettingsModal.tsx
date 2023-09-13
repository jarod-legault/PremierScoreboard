import React from 'react';
import {Modal, ModalProps, StyleSheet, Text, View} from 'react-native';
import {Button, IconButton, Switch, TextInput} from 'react-native-paper';

interface Props extends ModalProps {
  homeIsOnLeft: boolean;
  homeName: string;
  onChangeHomeName: (text: string) => void;
  onChangeVisitorName: (text: string) => void;
  onCloseButtonPress: () => void;
  // onShouldShowMatchScoreChange: (newValue: boolean) => void;
  // shouldShowMatchScore: boolean;
  visitorName: string;
}

export function SettingsModal(props: Props) {
  const {
    homeIsOnLeft,
    homeName,
    onChangeHomeName,
    onChangeVisitorName,
    onCloseButtonPress,
    // onShouldShowMatchScoreChange,
    // shouldShowMatchScore,
    visitorName,
    ...restOfProps
  } = props;

  return (
    <Modal
      {...restOfProps}
      style={styles.modal}
      transparent
      supportedOrientations={['landscape']}>
      <View style={styles.background}>
        <View style={styles.contentContainer}>
          <IconButton
            style={styles.closeButton}
            icon="close-box"
            onPress={onCloseButtonPress}
          />
          <View style={styles.teamsContainer}>
            <View style={styles.teamContainer}>
              <TextInput
                value={homeIsOnLeft ? homeName : visitorName}
                mode="outlined"
                dense
                onChangeText={
                  homeIsOnLeft ? onChangeHomeName : onChangeVisitorName
                }
              />
            </View>
            <View style={styles.teamContainer}>
              <TextInput
                value={homeIsOnLeft ? visitorName : homeName}
                mode="outlined"
                dense
                onChangeText={
                  homeIsOnLeft ? onChangeVisitorName : onChangeHomeName
                }
              />
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <View style={styles.switchContainer}>
              <Text style={styles.switchLabel}>Show match score?</Text>
              <Switch value={true} onValueChange={() => {}} />
            </View>
            <Button mode="elevated" onPress={() => console.log('reset scores')}>
              Reset team scores
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  contentContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modal: {
    flex: 1,
  },
  switchContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  switchLabel: {
    marginRight: 10,
  },
  teamContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  teamsContainer: {
    flexDirection: 'row',
  },
});
