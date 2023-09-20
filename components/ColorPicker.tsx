import React, {useEffect, useRef} from 'react';
import {Animated, Pressable, StyleSheet, View, ViewProps} from 'react-native';
import {Surface} from 'react-native-paper';

const MIN_COLOR_WIDTH = 34;

const allColors = [
  ['rgb(255, 0, 0)', 'rgb(255, 85, 0)', 'rgb(255, 170, 0)', 'rgb(255, 255, 0)'],
  [
    'rgb(255, 0, 85)',
    'rgb(213, 43, 43)',
    'rgb(213, 128, 43)',
    'rgb(213, 213, 43)',
    'rgb(170, 255, 0)',
  ],
  [
    'rgb(255, 0, 170)',
    'rgb(213, 43, 128)',
    'rgb(171, 85, 85)',
    'rgb(171, 171, 85)',
    'rgb(128, 213, 43)',
    'rgb(85, 255, 0)',
  ],
  [
    'rgb(255, 0, 255)',
    'rgb(213, 43, 213)',
    'rgb(171, 85, 171)',
    'rgb(127, 127, 127)',
    'rgb(85, 171, 85)',
    'rgb(43, 213, 43)',
    'rgb(0, 255, 0)',
  ],
  [
    'rgb(170, 0, 255)',
    'rgb(128, 43, 213)',
    'rgb(85, 85, 171)',
    'rgb(85, 171, 171)',
    'rgb(43, 213, 128)',
    'rgb(0, 255, 85)',
  ],
  [
    'rgb(85, 0, 255)',
    'rgb(43, 43, 213)',
    'rgb(43, 128, 213)',
    'rgb(43, 213, 213)',
    'rgb(0, 255, 170)',
  ],
  ['rgb(0, 0, 255)', 'rgb(0, 85, 255)', 'rgb(0, 170, 255)', 'rgb(0, 255, 255)'],
];

const greys = [
  'rgb(255,255,255)',
  'rgb(192, 192, 192)',
  'rgb(64, 64, 64)',
  'rgb(0,0,0)',
];

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends ViewProps {
  currentColor: string;
  onColorPress: (color: string) => void;
}

export function ColorPicker(props: Props) {
  const {currentColor, style, ...restOfProps} = props;

  const colorValue = useRef(new Animated.Value(0)).current;

  const changeToBlack = () => {
    Animated.timing(colorValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(changeToWhite);
  };

  const changeToWhite = () => {
    Animated.timing(colorValue, {
      toValue: 255,
      duration: 500,
      useNativeDriver: true,
    }).start(changeToBlack);
  };

  useEffect(() => {
    changeToWhite();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style}>
      <Surface style={styles.containerSurface} elevation={5}>
        <View {...restOfProps} style={styles.container}>
          <View style={styles.colorsContainer}>
            {allColors.map((colorRow, i) => {
              let translateY = (i * MIN_COLOR_WIDTH) / -9;
              return (
                <View
                  style={[styles.colorRow, {transform: [{translateY}]}]}
                  key={colorRow[0]}>
                  {colorRow.map(color => (
                    <Surface
                      key={color}
                      style={styles.colorSurface}
                      elevation={2}>
                      <AnimatedPressable
                        style={[
                          styles.colorContainer,
                          // eslint-disable-next-line react-native/no-inline-styles
                          {
                            backgroundColor: color,
                            borderWidth: currentColor === color ? 4 : 0,
                            borderColor: colorValue.interpolate({
                              inputRange: [0, 255],
                              outputRange: [
                                'rgb(0, 0, 0)',
                                'rgb(255, 255, 255)',
                              ],
                            }),
                          },
                        ]}
                        onPress={() => props.onColorPress(color)}
                      />
                    </Surface>
                  ))}
                </View>
              );
            })}
          </View>
          <View style={styles.greysContainer}>
            {greys.map(color => (
              <View key={color} style={styles.greySurfaceContainer}>
                <Surface style={[styles.colorSurface]} elevation={2}>
                  <AnimatedPressable
                    style={[
                      styles.colorContainer,
                      // eslint-disable-next-line react-native/no-inline-styles
                      {
                        backgroundColor: color,
                        borderWidth: currentColor === color ? 4 : 0,
                        borderColor: colorValue.interpolate({
                          inputRange: [0, 255],
                          outputRange: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
                        }),
                      },
                    ]}
                    onPress={() => props.onColorPress(color)}
                  />
                </Surface>
              </View>
            ))}
          </View>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  colorRow: {
    flexDirection: 'row',
  },
  colorContainer: {
    borderRadius: MIN_COLOR_WIDTH / 2,
    aspectRatio: 1,
  },
  colorSurface: {
    aspectRatio: 1,
    minWidth: MIN_COLOR_WIDTH,
    borderRadius: MIN_COLOR_WIDTH / 2,
    margin: 2,
  },
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    paddingBottom: 0,
  },
  containerSurface: {
    borderRadius: 5,
  },
  colorsContainer: {
    alignItems: 'center',
  },
  greysContainer: {
    alignSelf: 'center',
    marginLeft: 10,
    paddingBottom: MIN_COLOR_WIDTH,
  },
  greySurfaceContainer: {
    marginVertical: 2,
  },
});
