import React, {useRef, useState} from 'react';
import {Modal, ModalProps, StyleSheet, View} from 'react-native';
import {Button, IconButton, TextInput} from 'react-native-paper';
import {useTeamsContext} from '../contexts/TeamsContext';
import {ColorPicker} from './ColorPicker';
import {ColorPickerButton} from './ColorPickerButton';

interface Props extends ModalProps {
  onRequestCloseModal: () => void;
  onRequestOpenModal: () => void;
}

export function SettingsModal(props: Props) {
  const {onRequestCloseModal, ...restOfProps} = props;

  const [colorPickerIsVisible, setColorPickerIsVisible] = useState(false);

  const {
    homeIsOnLeft,
    homeName,
    setHomeName,
    homeBackgroundColor,
    setHomeBackgroundColor,
    homeTextColor,
    setHomeTextColor,
    visitorName,
    setVisitorName,
    visitorBackgroundColor,
    setVisitorBackgroundColor,
    visitorTextColor,
    setVisitorTextColor,
  } = useTeamsContext();

  const setColorRef = useRef(setHomeBackgroundColor);

  const handleHomeBackgroundColorButtonPress = () => {
    console.log('Home background color button pressed.');
    setColorPickerIsVisible(true);
    setColorRef.current = setHomeBackgroundColor;
  };

  const handleHomeTextColorButtonPress = () => {
    console.log('Home text color button pressed.');
    setColorPickerIsVisible(true);
    setColorRef.current = setHomeTextColor;
  };

  const handleVisitorBackgroundColorButtonPress = () => {
    console.log('Visitor background color button pressed.');
    setColorPickerIsVisible(true);
    setColorRef.current = setVisitorBackgroundColor;
  };

  const handleVisitorTextColorButtonPress = () => {
    console.log('Visitor text color button pressed.');
    setColorPickerIsVisible(true);
    setColorRef.current = setVisitorTextColor;
  };

  const handleColorPress = (newColor: string) => {
    console.log('color selected: ', newColor);
    setColorPickerIsVisible(false);
    setColorRef.current(newColor);
  };

  return (
    <Modal
      {...restOfProps}
      style={styles.modal}
      transparent
      supportedOrientations={['landscape']}>
      <View style={styles.background}>
        <View style={styles.settingsContainer}>
          <IconButton
            style={styles.closeButton}
            icon="close-box"
            onPress={onRequestCloseModal}
          />
          <View style={styles.teamsContainer}>
            <View style={styles.teamContainer}>
              <TextInput
                value={homeIsOnLeft ? homeName : visitorName}
                mode="outlined"
                dense
                onChangeText={homeIsOnLeft ? setHomeName : setVisitorName}
              />
              <View style={styles.colorsContainer}>
                <ColorPickerButton
                  label="Background"
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
                value={homeIsOnLeft ? visitorName : homeName}
                mode="outlined"
                dense
                onChangeText={homeIsOnLeft ? setVisitorName : setHomeName}
              />
              <View style={styles.colorsContainer}>
                <ColorPickerButton
                  label="Background"
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
            <Button mode="elevated" onPress={() => console.log('reset scores')}>
              Reset scores
            </Button>
          </View>
        </View>
        {colorPickerIsVisible && (
          <ColorPicker
            onColorPress={handleColorPress}
            style={styles.colorPicker}
          />
        )}
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
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modal: {
    flex: 1,
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  colorsContainer: {
    alignItems: 'flex-end',
  },
  colorPicker: {
    position: 'absolute',
  },
  teamContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    margin: 5,
    padding: 8,
    backgroundColor: 'rgb(230,230,230)',
  },
  teamsContainer: {
    flexDirection: 'row',
  },
});