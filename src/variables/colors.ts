import {rgb, rgba} from 'polished';

const colors = {
  white: rgb(255, 255, 255),
  black: rgb(0, 0, 0),
  blueSapphire: rgb(27, 97, 140), //#1b618c
  pastelGray: rgb(205, 205, 205), //#cdcdcd,
  gainsboro: rgb(220, 220, 220), //##dcdcdc
  engineering: rgb(196, 18, 15), //#C4120F
  aliceBlue: rgb(241, 248, 252), //#f1f8fc
  raisinBlack: rgb(38, 38, 38), //#262626
};

export type ColorType = keyof typeof colors;

export const colorsAlpha = (
  color: keyof typeof colors,
  alpha: number,
): string => {
  if (alpha > 1) {
    return colors[color];
  }
  return rgba(colors[color], alpha);
};

export default colors;
