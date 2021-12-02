import React from 'react';
import styled from 'styled-components/native';
import qr from 'assets/icons/ic_qr.png';

export const IconList = {
  qr,
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
