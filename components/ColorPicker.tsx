import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';
import {Button, IconButton, Surface} from 'react-native-paper';
import {ColorTranslator, HSLObject} from 'colortranslator';

const MIN_COLOR_WIDTH = 30;
const NUMBER_OF_HUES = 12;
const NUMBER_OF_GREYS = 5;
const PALETTE_DIMENSION = 5;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Props = {
  previousColor: string;
  onColorSelect: (color: string) => void;
  onColorReject: () => void;
};

export function ColorPicker(props: Props) {
  const previousColorObject = new ColorTranslator(props.previousColor)
    .HSLObject;
  const [currentHue, setCurrentHue] = useState(previousColorObject.h);
  const [currentColorObject, setCurrentColorObject] =
    useState(previousColorObject);

  function getGreys() {
    const greys: Array<HSLObject> = [];
    const greyLightnessIncrement = 100 / (NUMBER_OF_GREYS - 1);
    let greyLightness = 0;
    for (let i = 0; i < NUMBER_OF_GREYS; i++) {
      greys.push({
        h: 0,
        s: 0,
        l: Math.round(greyLightness),
      });
      greyLightness += greyLightnessIncrement;
    }
    return greys;
  }

  const greys = getGreys();

  function getHues() {
    const hues: Array<HSLObject> = [];
    const hueIncrement = 360 / NUMBER_OF_HUES;
    let hue = 0;
    for (let i = 0; i < NUMBER_OF_HUES; i++) {
      hues.push({
        h: Math.round(hue),
        s: 100,
        l: 50,
      });
      hue += hueIncrement;
    }
    return hues;
  }

  const hues = getHues();

  function getPalette() {
    const pallette: Array<Array<HSLObject>> = [];
    const saturationIncrement = 100 / PALETTE_DIMENSION;
    const lightnessIncrement = 100 / (PALETTE_DIMENSION + 1);
    let lightness = lightnessIncrement;
    for (let i = 0; i < PALETTE_DIMENSION; i++) {
      let saturation = saturationIncrement;
      let saturations = [];
      for (let j = 0; j < PALETTE_DIMENSION; j++) {
        saturations.push({
          h: Math.round(currentHue),
          s: Math.round(saturation),
          l: Math.round(lightness),
        });
        saturation += saturationIncrement;
      }
      pallette.push(saturations);
      lightness += lightnessIncrement;
    }
    return pallette;
  }

  const palette = getPalette();

  // s: we do not want 0
  // increment is 100 / dimension
  // 6: 16.7, 33.3, 50, 66.7, 83.3, 100

  // l: we do not want 0 or 100, but we must have 50
  // increment is 100 / (dimension + 1)
  // 6: 14.3, 28.6, 42.9, 57.2, 71.5, 85.8

  // hsl format: hsl(360, 100%, 100%)

  const borderColorValue = useRef(new Animated.Value(0)).current;

  const changeToBlack = () => {
    Animated.timing(borderColorValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start(changeToWhite);
  };

  const changeToWhite = () => {
    Animated.timing(borderColorValue, {
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
    <View style={styles.background}>
      <Surface style={styles.container} elevation={5}>
        <IconButton
          style={styles.closeButton}
          size={30}
          icon="close-box"
          onPress={props.onColorReject}
        />
        <View style={styles.huesAndPalette}>
          {hues.map((colorObject, i) => {
            const degreeIncrement = 360 / hues.length;
            const degrees = i * degreeIncrement;
            const radians = (degrees / 360) * 2 * Math.PI;
            const RADIUS = 120;
            const translateX = RADIUS * Math.sin(radians);
            const translateY = -1 * RADIUS * Math.cos(radians);
            return (
              <AnimatedPressable
                key={colorObject.h}
                style={[
                  styles.hue,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor: new ColorTranslator(colorObject, {
                      decimals: 0,
                    }).HSL,
                    borderWidth: currentHue === colorObject.h ? 4 : 1,
                    borderColor:
                      currentHue === colorObject.h ? 'black' : 'grey',
                    transform: [
                      {translateX},
                      {translateY},
                      {rotate: `${degrees}deg`},
                    ],
                  },
                ]}
                onPress={() => setCurrentHue(colorObject.h)}
              />
            );
          })}
          <View style={styles.paletteContainer}>
            {palette.map(colorRow => {
              return (
                <View style={styles.colorRow} key={colorRow[0].l}>
                  {colorRow.map(colorObject => (
                    <AnimatedPressable
                      key={colorObject.s}
                      style={[
                        styles.colorBox,
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          backgroundColor: new ColorTranslator(colorObject, {
                            decimals: 0,
                          }).HSL,
                          borderWidth:
                            new ColorTranslator(currentColorObject).HSL ===
                            new ColorTranslator(colorObject).HSL
                              ? 2
                              : 1,
                          borderColor:
                            new ColorTranslator(currentColorObject).HSL ===
                            new ColorTranslator(colorObject).HSL
                              ? borderColorValue.interpolate({
                                  inputRange: [0, 255],
                                  outputRange: [
                                    'rgb(0, 0, 0)',
                                    'rgb(255, 255, 255)',
                                  ],
                                })
                              : 'grey',
                        },
                      ]}
                      onPress={() => {
                        console.log(new ColorTranslator(colorObject).HSL);
                        setCurrentColorObject(colorObject);
                      }}
                    />
                  ))}
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.greysAndButtonsContainer}>
          <View style={styles.greysContainer}>
            {greys.map(colorObject => (
              <AnimatedPressable
                key={colorObject.l}
                style={[
                  styles.colorBox,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    backgroundColor: new ColorTranslator(colorObject, {
                      decimals: 0,
                    }).HSL,
                    borderWidth:
                      new ColorTranslator(currentColorObject).HSL ===
                      new ColorTranslator(colorObject).HSL
                        ? 2
                        : 1,
                    borderColor:
                      new ColorTranslator(currentColorObject).HSL ===
                      new ColorTranslator(colorObject).HSL
                        ? borderColorValue.interpolate({
                            inputRange: [0, 255],
                            outputRange: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
                          })
                        : 'grey',
                  },
                ]}
                onPress={() => {
                  console.log(new ColorTranslator(colorObject).HSL);
                  setCurrentColorObject(colorObject);
                }}
              />
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            <Button
              mode="elevated"
              buttonColor={props.previousColor}
              onPress={props.onColorReject}>
              <Text
                style={[
                  styles.buttonText,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color:
                      new ColorTranslator(props.previousColor).HSLObject.l > 50
                        ? 'black'
                        : 'white',
                  },
                ]}>
                Previous Color
              </Text>
            </Button>
            <Button
              style={styles.bottomButton}
              mode="elevated"
              buttonColor={
                new ColorTranslator(currentColorObject, {decimals: 0}).HSL
              }
              onPress={() =>
                props.onColorSelect(
                  new ColorTranslator(currentColorObject, {decimals: 0}).HSL,
                )
              }>
              <Text
                style={[
                  styles.buttonText,
                  // eslint-disable-next-line react-native/no-inline-styles
                  {
                    color:
                      new ColorTranslator(currentColorObject).HSLObject.l >= 50
                        ? 'black'
                        : 'white',
                  },
                ]}>
                New Color
              </Text>
            </Button>
          </View>
        </View>
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
  colorRow: {
    flexDirection: 'row',
  },
  colorBox: {
    minWidth: MIN_COLOR_WIDTH,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'grey',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  closeButton: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  paletteContainer: {
    alignItems: 'center',
  },
  greysContainer: {
    flexDirection: 'row',
    marginRight: 5,
  },
  huesAndPalette: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    aspectRatio: 1,
  },
  hue: {
    height: MIN_COLOR_WIDTH,
    aspectRatio: 1.9,
    borderWidth: 1,
    borderColor: 'grey',
    position: 'absolute',
  },
  greysAndButtonsContainer: {
    alignSelf: 'stretch',
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  bottomButton: {
    marginTop: 10,
  },
  buttonsContainer: {
    marginTop: 35,
  },
  buttonText: {
    fontFamily: Platform.OS === 'ios' ? 'Arvo' : 'Arvo-Regular',
    fontSize: 16,
  },
});
