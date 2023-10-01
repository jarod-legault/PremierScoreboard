import React from 'react';
import {Modal, ModalProps, Pressable, StyleSheet, View} from 'react-native';
import {IconButton, Surface, Text} from 'react-native-paper';

const topRowPoints = [1, 2, 3, 4, 5];
const bottomRowPoints = [6, 7, 8, 9, 10];

interface Props extends ModalProps {
  onRequestCloseModal: () => void;
  isIncrement: boolean;
  onPointSelect: (pointValue: number) => void;
  visible: boolean;
}

export function PointsModal(props: Props) {
  const sign = props.isIncrement ? '+' : '-';

  return (
    <Modal
      visible={props.visible}
      style={styles.modal}
      transparent
      statusBarTranslucent
      supportedOrientations={['landscape']}>
      <View style={styles.background}>
        <View style={styles.pointsContainer}>
          <IconButton
            style={styles.closeButton}
            size={30}
            icon="close-box"
            onPress={props.onRequestCloseModal}
          />
          <View style={styles.pointsRow}>
            {topRowPoints.map(pointValue => (
              <Surface key={pointValue} style={styles.pointContainer}>
                <Pressable
                  style={styles.pointPressable}
                  onPress={() => props.onPointSelect(pointValue)}>
                  <Text style={styles.text}>{`${sign}${pointValue}`}</Text>
                </Pressable>
              </Surface>
            ))}
          </View>
          <View style={styles.pointsRow}>
            {bottomRowPoints.map(pointValue => (
              <Surface key={pointValue} style={styles.pointContainer}>
                <Pressable
                  key={pointValue}
                  style={styles.pointPressable}
                  onPress={() => props.onPointSelect(pointValue)}>
                  <Text style={styles.text}>{`${sign}${pointValue}`}</Text>
                </Pressable>
              </Surface>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
  background: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  pointsContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 40,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  pointsRow: {
    flexDirection: 'row',
  },
  pointContainer: {
    height: 60,
    aspectRatio: 1,
    backgroundColor: 'white',
    borderColor: 'lightgrey',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  pointPressable: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 25,
  },
});
