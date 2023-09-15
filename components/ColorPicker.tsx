import React from 'react';
import {Pressable, StyleSheet, View, ViewProps} from 'react-native';
import {Surface} from 'react-native-paper';

const MIN_COLOR_WIDTH = 34;

const COLOR_VARIATION_COUNT = 3;
const colorLevels: Array<number> = [];
colorLevels[COLOR_VARIATION_COUNT - 1] = 255;
const increment = Math.round(255 / COLOR_VARIATION_COUNT);
colorLevels[0] = increment;
for (let i = 1; i < COLOR_VARIATION_COUNT - 1; i++) {
  colorLevels[i] = colorLevels[i - 1] + increment;
}

const reds: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  reds.push(`rgb(${colorLevels[i]}, 0, 0)`);
}
const oranges: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  oranges.push(`rgb(${colorLevels[i]}, ${Math.round(colorLevels[i] / 2)}, 0)`);
}
const yellows: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  yellows.push(`rgb(${colorLevels[i]}, ${colorLevels[i]}, 0)`);
}
const yellowGreens: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  yellowGreens.push(
    `rgb(${Math.round(colorLevels[i] / 2)}, ${colorLevels[i]}, 0)`,
  );
}
const greens: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  greens.push(`rgb(0, ${colorLevels[i]}, 0)`);
}
const greenCyans: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  greenCyans.push(
    `rgb(0, ${colorLevels[i]}, ${Math.round(colorLevels[i] / 2)})`,
  );
}
const cyans: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  cyans.push(`rgb(0, ${colorLevels[i]}, ${colorLevels[i]})`);
}
const cyanBlues: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  cyanBlues.push(
    `rgb(0, ${Math.round(colorLevels[i] / 2)}, ${colorLevels[i]})`,
  );
}
const blues: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  blues.push(`rgb(0, 0, ${colorLevels[i]})`);
}
const blueMagentas: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  blueMagentas.push(
    `rgb(${Math.round(colorLevels[i] / 2)}, 0, ${colorLevels[i]})`,
  );
}
const magentas: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  magentas.push(`rgb(${colorLevels[i]}, 0, ${colorLevels[i]})`);
}
const magentaReds: Array<string> = [];
for (let i = 0; i < COLOR_VARIATION_COUNT; i++) {
  magentaReds.push(
    `rgb(${colorLevels[i]}, 0, ${Math.round(colorLevels[i] / 2)})`,
  );
}

const BLACK_COLOR_VARIATION_COUNT = 6;
const blackIncrement = Math.round(255 / (BLACK_COLOR_VARIATION_COUNT - 1));
const blackColorLevels: Array<number> = [];
blackColorLevels[0] = 0;
for (let i = 1; i < BLACK_COLOR_VARIATION_COUNT; i++) {
  blackColorLevels[i] = blackColorLevels[i - 1] + blackIncrement;
}
const blacks: Array<string> = [];
for (let i = 0; i < BLACK_COLOR_VARIATION_COUNT; i++) {
  blacks.push(
    `rgb(${blackColorLevels[i]}, ${blackColorLevels[i]}, ${blackColorLevels[i]})`,
  );
}

const allColors = [
  [...reds, ...oranges.reverse()],
  [...yellows, ...yellowGreens.reverse()],
  [...greens, ...greenCyans.reverse()],
  [...cyans, ...cyanBlues.reverse()],
  [...blues, ...blueMagentas.reverse()],
  [...magentas, ...magentaReds.reverse()],
  blacks,
];
console.log(allColors);

interface Props extends ViewProps {
  currentColor: string;
  onColorPress: (color: string) => void;
}

export function ColorPicker(props: Props) {
  const {currentColor, style, ...restOfProps} = props;

  return (
    <View style={style}>
      <Surface style={styles.containerSurface} elevation={5}>
        <View {...restOfProps} style={styles.container}>
          {allColors.map((colorRow, i) => {
            let translateX = i % 2 !== 0 ? MIN_COLOR_WIDTH / 2 : 0;
            let translateY = (i * MIN_COLOR_WIDTH) / -9;
            return (
              <View
                style={[
                  styles.colorRow,
                  {transform: [{translateX}, {translateY}]},
                ]}
                key={colorRow[0]}>
                {colorRow.map(color => (
                  <Surface
                    key={color}
                    style={styles.colorSurface}
                    elevation={2}>
                    <Pressable
                      style={[
                        styles.colorContainer,
                        // eslint-disable-next-line react-native/no-inline-styles
                        {
                          backgroundColor: color,
                          borderWidth: currentColor === color ? 4 : 0,
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
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 20,
    paddingRight: MIN_COLOR_WIDTH,
    paddingBottom: 0,
  },
  containerSurface: {
    borderRadius: 5,
  },
});
