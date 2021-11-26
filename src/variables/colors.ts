import {rgb, rgba} from 'polished';

const colors = {
  white: rgb(255, 255, 255),
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
