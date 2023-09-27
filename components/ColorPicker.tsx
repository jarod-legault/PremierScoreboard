import React, {useEffect, useRef, useState} from 'react';
import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {Button, Surface} from 'react-native-paper';
import {ColorTranslator, HSLObject, Harmony} from 'colortranslator';

const MIN_COLOR_WIDTH = 30;
const NUMBER_OF_HUES = 12;
const NUMBER_OF_GREYS = 5;
const PALETTE_DIMENSION = 5;

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface Props extends ViewProps {
  style?: ViewStyle;
  previousColor: string;
  onColorSelect: (color: string) => void;
  onColorReject: () => void;
}

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
    // FIXME: Round the values below
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

  // hsl(360, 100%, 100%)

  // hues:
  // 6: 0, 60, 120, 180, 240, 300
  // 12: 0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330
  // 18: 0, 20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340
  // 24: 0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300, 315, 330, 345

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

  // TODO: Make all borders only 1 pixel wide.

  return (
    <Surface style={[props.style, styles.container]} elevation={5}>
      <View style={styles.greysAndColors}>
        <View style={styles.greys}>
          {greys.map(colorObject => (
            <AnimatedPressable
              key={colorObject.l}
              style={[
                styles.colorContainer,
                // eslint-disable-next-line react-native/no-inline-styles
                {
                  backgroundColor: new ColorTranslator(colorObject, {
                    decimals: 0,
                  }).RGB,
                  borderWidth:
                    new ColorTranslator(currentColorObject).RGB ===
                    new ColorTranslator(colorObject).RGB
                      ? 2
                      : 1,
                  borderColor:
                    new ColorTranslator(currentColorObject).RGB ===
                    new ColorTranslator(colorObject).RGB
                      ? borderColorValue.interpolate({
                          inputRange: [0, 255],
                          outputRange: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
                        })
                      : 'rgb(200, 200, 200)',
                  // borderWidth: currentColor === color ? 4 : 0,
                  // borderColor: borderColorValue.interpolate({
                  //   inputRange: [0, 255],
                  //   outputRange: ['rgb(0, 0, 0)', 'rgb(255, 255, 255)'],
                  // }),
                },
              ]}
              onPress={() =>
                setCurrentColorObject(
                  new ColorTranslator(colorObject).HSLObject,
                )
              }
            />
          ))}
        </View>
        <View>
          <View style={styles.hues}>
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
                    styles.hueColorContainer,
                    // eslint-disable-next-line react-native/no-inline-styles
                    {
                      backgroundColor: new ColorTranslator(colorObject, {
                        decimals: 0,
                      }).RGB,
                      borderWidth: currentHue === colorObject.h ? 4 : 0,
                      borderColor: 'black',
                      transform: [
                        {translateX},
                        {translateY},
                        {rotate: `${degrees}deg`},
                        {perspective: 100},
                        {rotateX: '-40deg'},
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
                          styles.colorContainer,
                          // eslint-disable-next-line react-native/no-inline-styles
                          {
                            backgroundColor: new ColorTranslator(colorObject, {
                              decimals: 0,
                            }).RGB,
                            borderWidth:
                              new ColorTranslator(currentColorObject).RGB ===
                              new ColorTranslator(colorObject).RGB
                                ? 2
                                : 1,
                            borderColor:
                              new ColorTranslator(currentColorObject).RGB ===
                              new ColorTranslator(colorObject).RGB
                                ? borderColorValue.interpolate({
                                    inputRange: [0, 255],
                                    outputRange: [
                                      'rgb(0, 0, 0)',
                                      'rgb(255, 255, 255)',
                                    ],
                                  })
                                : 'rgb(200, 200, 200)',
                          },
                        ]}
                        // onPress={() => props.onColorPress(color)}
                        onPress={() =>
                          setCurrentColorObject(
                            new ColorTranslator(colorObject).HSLObject,
                          )
                        }
                      />
                    ))}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          mode="outlined"
          buttonColor={props.previousColor}
          onPress={props.onColorReject}>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color:
                new ColorTranslator(props.previousColor).HSLObject.l > 50
                  ? 'black'
                  : 'white',
            }}>
            Previous Color
          </Text>
        </Button>
        <Button
          mode="outlined"
          buttonColor={
            new ColorTranslator(currentColorObject, {decimals: 0}).RGB
          }
          onPress={() =>
            props.onColorSelect(
              new ColorTranslator(currentColorObject, {decimals: 0}).RGB,
            )
          }>
          <Text
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              color:
                new ColorTranslator(currentColorObject).HSLObject.l >= 50
                  ? 'black'
                  : 'white',
              //   ColorTranslator.getHarmony(
              //   new ColorTranslator(currentColorObject).RGB,
              //   // Harmony.COMPLEMENTARY,
              // )[1],
            }}>
            New Color
          </Text>
        </Button>
      </View>
    </Surface>
  );
}

const styles = StyleSheet.create({
  colorRow: {
    flexDirection: 'row',
  },
  colorContainer: {
    minWidth: MIN_COLOR_WIDTH,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: 'rgb(200,200,200)',
  },
  container: {
    // flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
  },
  paletteContainer: {
    alignItems: 'center',
  },
  greys: {
    marginRight: 5,
  },
  hues: {
    // flexDirection: 'row',
    // marginBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 280,
    aspectRatio: 1,
    // borderWidth: 1,
    // borderColor: 'red',
  },
  hueColorContainer: {
    height: 36,
    aspectRatio: 1.8,
    borderWidth: 1,
    borderColor: 'rgb(200,200,200)',
    position: 'absolute',
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
  },
  greysAndColors: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
