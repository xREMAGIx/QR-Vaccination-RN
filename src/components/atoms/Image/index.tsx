import React from 'react';
import styled, {css} from 'styled-components/native';
import {ImageResizeMode, ImageSourcePropType} from 'react-native';
import colors from 'variables/colors';

type StyleProps = {
  width?: number;
  height?: number;
  borderRadius?: number;
  borderColor?: keyof typeof colors;
  fullWidth?: boolean;
};

type Props = {
  source: ImageSourcePropType;
  resizeMode?: ImageResizeMode;
} & StyleProps;

export const Image: React.FC<Props> = ({
  source,
  resizeMode = 'cover',
  width = 64,
  height = 64,
  borderRadius = 0,
  ...props
}) => {
  return (
    <CustomImage
      source={source}
      resizeMode={resizeMode}
      width={width}
      height={height}
      borderRadius={borderRadius}
      {...props}
    />
  );
};

const CustomImage = styled.Image<StyleProps>`
  ${props => {
    return css`
      width: ${props.width}px;
      height: ${props.height}px;
      border-radius: ${props.borderRadius}px;
      ${props.borderColor &&
      `
        border-width: 1px;
        border-color: ${colors[props.borderColor]};
      `}
      ${props.fullWidth && 'width: 100%'};
    `;
  }}
`;
