import React from 'react';
import styled from 'styled-components/native';
import qr from 'assets/icons/ic_qr.png';
import arrowDown from 'assets/icons/ic_arrow_down.png';
import disabled from 'assets/icons/ic_disabled.png';

export const IconList = {
  qr,
  arrowDown,
  disabled,
};

export type IconName = keyof typeof IconList;

type Props = {iconName: IconName; size?: number};

type IconStylesProps = Omit<Props, 'iconName'>;

export const Icon: React.FC<Props> = ({iconName, size = 24, ...rest}) => {
  return (
    <CustomIcon
      source={IconList[iconName]}
      size={size}
      resizeMode="contain"
      {...rest}
    />
  );
};

const CustomIcon = styled.Image<IconStylesProps>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;
