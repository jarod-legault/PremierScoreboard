import React, {useRef, useState} from 'react';
import {Modal, ModalProps, StyleSheet, View} from 'react-native';
import {Button, IconButton, Text, TextInput} from 'react-native-paper';
import {useAppContext} from '../contexts/AppContext';
import {useTeamsContext} from '../contexts/TeamsContext';
import {ColorPicker} from './ColorPicker';
import {ColorPickerButton} from './ColorPickerButton';
import {Confirmation} from './Confirmation';

const DEFAULT_FONT_SIZE = 18;

interface Props extends ModalProps {
  onRequestCloseModal: () => void;
  onRequestOpenModal: () => void;
}

export function SettingsModal(props: Props) {
  const {onRequestCloseModal, ...restOfProps} = props;

  const [colorPickerIsVisible, setColorPickerIsVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('white');
  const [resetConfirmationIsVisible, setResetConfirmationIsVisible] =
    useState(false);

  const {appBackgroundColor, setAppBackgroundColor} = useAppContext();
  const {
    homeIsOnLeft,
    homeName,
    setHomeName,
    homeBackgroundColor,
    setHomeBackgroundColor,
    homeTextColor,
    setHomeTextColor,
    setHomeScore,
    visitorName,
    setVisitorName,
    visitorBackgroundColor,
    setVisitorBackgroundColor,
    visitorTextColor,
    setVisitorTextColor,
    setVisitorScore,
  } = useTeamsContext();

  const setColorRef = useRef(setHomeBackgroundColor);

  const handleHomeBackgroundColorButtonPress = () => {
    setColorPickerIsVisible(true);
    setCurrentColor(homeBackgroundColor);
    setColorRef.current = setHomeBackgroundColor;
  };

  const handleHomeTextColorButtonPress = () => {
    setColorPickerIsVisible(true);
    setCurrentColor(homeTextColor);
    setColorRef.current = setHomeTextColor;
  };

  const handleVisitorBackgroundColorButtonPress = () => {
    setColorPickerIsVisible(true);
    setCurrentColor(visitorBackgroundColor);
    setColorRef.current = setVisitorBackgroundColor;
  };

  const handleVisitorTextColorButtonPress = () => {
    setColorPickerIsVisible(true);
    setCurrentColor(visitorTextColor);
    setColorRef.current = setVisitorTextColor;
  };

  const handleAppBackgroundColorPress = () => {
    setColorPickerIsVisible(true);
    setCurrentColor(appBackgroundColor);
    setColorRef.current = setAppBackgroundColor;
  };

  const handleColorPress = (newColor: string) => {
    setColorPickerIsVisible(false);
    setColorRef.current(newColor);
  };

  const resetScores = () => {
    setHomeScore(0);
    setVisitorScore(0);
    setResetConfirmationIsVisible(false);
  };

  return (
    <Modal
      {...restOfProps}
      style={styles.modal}
      transparent
      statusBarTranslucent
      supportedOrientations={['landscape']}>
      <View style={styles.background}>
        <View style={styles.settingsContainer}>
          <Text style={styles.title}>Settings</Text>
          <IconButton
            style={styles.closeButton}
            size={30}
            icon="close-box"
            onPress={onRequestCloseModal}
          />
          <View style={styles.teamsContainer}>
            <View style={styles.teamContainer}>
              <TextInput
                textColor={homeIsOnLeft ? homeTextColor : visitorTextColor}
                outlineColor={homeIsOnLeft ? homeTextColor : visitorTextColor}
                style={{
                  backgroundColor: homeIsOnLeft
                    ? homeBackgroundColor
                    : visitorBackgroundColor,
                }}
                value={homeIsOnLeft ? homeName : visitorName}
                mode="outlined"
                dense
                onChangeText={homeIsOnLeft ? setHomeName : setVisitorName}
              />
              <View style={styles.colorsContainer}>
                <ColorPickerButton
                  label="Background"
                  labelStyle={styles.labelStyle}
                  color={
                    homeIsOnLeft ? homeBackgroundColor : visitorBackgroundColor
                  }
                  onPress={
                    homeIsOnLeft
                      ? handleHomeBackgroundColorButtonPress
                      : handleVisitorBackgroundColorButtonPress
                  }
                />
                <ColorPickerButton
                  label="Text"
                  labelStyle={styles.labelStyle}
                  color={homeIsOnLeft ? homeTextColor : visitorTextColor}
                  onPress={
                    homeIsOnLeft
                      ? handleHomeTextColorButtonPress
                      : handleVisitorTextColorButtonPress
                  }
                />
              </View>
            </View>
            <View style={styles.teamContainer}>
              <TextInput
                textColor={homeIsOnLeft ? visitorTextColor : homeTextColor}
                outlineColor={homeIsOnLeft ? visitorTextColor : homeTextColor}
                style={{
                  backgroundColor: homeIsOnLeft
                    ? visitorBackgroundColor
                    : homeBackgroundColor,
                }}
                value={homeIsOnLeft ? visitorName : homeName}
                mode="outlined"
                dense
                onChangeText={homeIsOnLeft ? setVisitorName : setHomeName}
              />
              <View style={styles.colorsContainer}>
                <ColorPickerButton
                  label="Background"
                  labelStyle={styles.labelStyle}
                  color={
                    homeIsOnLeft ? visitorBackgroundColor : homeBackgroundColor
                  }
                  onPress={
                    homeIsOnLeft
                      ? handleVisitorBackgroundColorButtonPress
                      : handleHomeBackgroundColorButtonPress
                  }
                />
                <ColorPickerButton
                  label="Text"
                  labelStyle={styles.labelStyle}
                  color={homeIsOnLeft ? visitorTextColor : homeTextColor}
                  onPress={
                    homeIsOnLeft
                      ? handleVisitorTextColorButtonPress
                      : handleHomeTextColorButtonPress
                  }
                />
              </View>
            </View>
          </View>
          <View style={styles.bottomContainer}>
            <ColorPickerButton
              label="App background"
              labelStyle={styles.labelStyle}
              style={styles.appBackgroundColorPicker}
              color={appBackgroundColor}
              onPress={handleAppBackgroundColorPress}
            />
            <Button
              mode="elevated"
              onPress={() => setResetConfirmationIsVisible(true)}>
              <Text style={styles.resetButtonText}>Reset scores</Text>
            </Button>
          </View>
        </View>
        {resetConfirmationIsVisible && (
          <Confirmation
            style={styles.resetConfirmation}
            title="Reset scores?"
            onRequestClose={() => setResetConfirmationIsVisible(false)}
            onConfirm={resetScores}
            confirmText="Reset"
            cancelText="Cancel"
          />
        )}
        {colorPickerIsVisible && (
          <ColorPicker
            onColorPress={handleColorPress}
            style={styles.colorPicker}
            currentColor={currentColor}
          />
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  appBackgroundColorPicker: {
    marginBottom: 20,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  settingsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  labelStyle: {
    fontSize: DEFAULT_FONT_SIZE,
  },
  modal: {
    flex: 1,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  colorsContainer: {
    alignItems: 'flex-end',
  },
  colorPicker: {
    position: 'absolute',
  },
  resetButtonText: {
    fontSize: DEFAULT_FONT_SIZE,
  },
  resetConfirmation: {
    position: 'absolute',
  },
  teamContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 12,
    backgroundColor: 'rgb(230,230,230)',
  },
  teamsContainer: {
    flexDirection: 'row',
  },
  title: {
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 40,
  },
});
