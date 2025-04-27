import React, {useRef, useState} from 'react';
import {Modal, ModalProps, Platform, StyleSheet, View} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {Text} from './Text';
import {useTeamsContext} from '../contexts/TeamsContext';
import {ColorPicker} from './ColorPicker';
import {ColorPickerButton} from './ColorPickerButton';
import {Confirmation} from './Confirmation';
import {Tips} from './Tips';
import colors from '../Colors';

const DEFAULT_FONT_SIZE = 18;

interface Props extends ModalProps {
  onRequestCloseModal: () => void;
  onRequestOpenModal: () => void;
}

export function SettingsModal(props: Props) {
  const {onRequestCloseModal, ...restOfProps} = props;

  const [colorPickerIsVisible, setColorPickerIsVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState('white');
  const [tipsAreVisible, setTipsAreVisible] = useState(false);
  const [resetConfirmationIsVisible, setResetConfirmationIsVisible] =
    useState(false);

  const {
    homeIsOnLeft,
    setHomeIsOnLeft,
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

  const showTips = () => setTipsAreVisible(true);
  const hideTips = () => setTipsAreVisible(false);

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

  const handleColorPress = (newColor: string) => {
    setColorPickerIsVisible(false);
    setColorRef.current(newColor);
  };

  const resetScores = () => {
    setResetConfirmationIsVisible(false);
    onRequestCloseModal();
    setHomeScore(0);
    setVisitorScore(0);
  };

  const swapSides = () => {
    setHomeIsOnLeft(!homeIsOnLeft);
    onRequestCloseModal();
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
          <View style={styles.teamsContainer}>
            <View style={styles.teamContainer}>
              <TextInput
                textColor={homeIsOnLeft ? homeTextColor : visitorTextColor}
                outlineColor={homeIsOnLeft ? homeTextColor : visitorTextColor}
                style={[
                  styles.textInput,
                  {
                    backgroundColor: homeIsOnLeft
                      ? homeBackgroundColor
                      : visitorBackgroundColor,
                  },
                ]}
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
            <IconButton
              icon="swap-horizontal-circle-outline"
              size={40}
              iconColor={colors.text}
              style={styles.swapButton}
              onPress={swapSides}
            />
            <View style={styles.teamContainer}>
              <TextInput
                textColor={homeIsOnLeft ? visitorTextColor : homeTextColor}
                outlineColor={homeIsOnLeft ? visitorTextColor : homeTextColor}
                style={[
                  styles.textInput,
                  {
                    backgroundColor: homeIsOnLeft
                      ? visitorBackgroundColor
                      : homeBackgroundColor,
                  },
                ]}
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
            <Button
              mode="elevated"
              buttonColor={colors.logoBlue}
              onPress={() => setResetConfirmationIsVisible(true)}>
              <Text style={styles.resetButtonText}>Reset scores</Text>
            </Button>
          </View>
          <IconButton
            style={styles.tipsButton}
            iconColor={colors.text}
            size={30}
            icon="help-box"
            onPress={showTips}
          />
          <IconButton
            style={styles.closeButton}
            iconColor={colors.text}
            size={30}
            icon="close-box"
            onPress={onRequestCloseModal}
          />
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
            onColorSelect={handleColorPress}
            onColorReject={() => setColorPickerIsVisible(false)}
            previousColor={currentColor}
          />
        )}
        {tipsAreVisible && <Tips onRequestClose={hideTips} />}
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
  settingsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  labelStyle: {
    fontFamily: Platform.OS === 'ios' ? 'Arvo' : 'Arvo-Regular',
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
  tipsButton: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  colorsContainer: {
    alignItems: 'flex-end',
  },
  resetButtonText: {
    color: 'white',
    fontFamily: Platform.OS === 'ios' ? 'Arvo' : 'Arvo-Regular',
    fontSize: DEFAULT_FONT_SIZE,
  },
  resetConfirmation: {
    position: 'absolute',
  },
  teamContainer: {
    backgroundColor: 'rgb(220, 220, 220)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'lightgrey',
    borderRadius: 5,
    marginHorizontal: 10,
    padding: 12,
  },
  teamsContainer: {
    flexDirection: 'row',
  },
  title: {
    fontFamily: Platform.OS === 'ios' ? 'Arvo' : 'Arvo-Regular',
    alignSelf: 'center',
    marginVertical: 10,
    fontSize: 40,
  },
  swapButton: {
    alignSelf: 'center',
    margin: -10,
  },
  textInput: {
    fontSize: 20,
  },
});
