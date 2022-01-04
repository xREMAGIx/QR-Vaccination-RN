import React from 'react';
import styled, {css} from 'styled-components/native';
import colors, {ColorType} from 'variables/colors';

type Props = {
  fs?: number;
  lh?: number;
  fw?: 'regular' | 'medium' | 'bold';
  color?: ColorType;
  textTransfrom?: 'lowercase' | 'uppercase' | 'capitalize';
  textAlign?: 'left' | 'right' | 'center' | 'justify';
  textDecor?: 'underline' | 'line-through';
  numberOfLines?: number;
  opacity?: number;
  isNotTranslate?: boolean;
};

export const Text: React.FC<Props> = ({numberOfLines, children, ...rest}) => {
  return (
    <CustomText {...rest} numberOfLines={numberOfLines}>
      {children}
    </CustomText>
  );
};

const CustomText = styled.Text<Props>`
  opacity: ${props => (props.opacity ? props.opacity : 1)};
  color: ${props => colors[props.color || 'raisinBlack']};
  text-transform: ${props => props.textTransfrom || 'none'};
  text-align: ${props => props.textAlign || 'left'};
  font-size: ${props => props.fs || 14}px;
  ${props =>
    props.lh &&
    css`
      line-height: ${props.lh}px;
    `};
  font-weight: ${props => {
    switch (props.fw) {
      case 'medium':
        return 500;
      case 'bold':
        return 700;
      default:
        return 400;
    }
  }};
  text-decoration: ${props => props.textDecor || 'none'};
  text-decoration-color: ${props => colors[props.color || 'black']};
  opacity: ${props => props.opacity || 1};
`;
