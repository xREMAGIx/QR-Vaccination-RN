import React from 'react';
import styled from 'styled-components/native';
import qr from 'assets/icons/ic_qr.png';
import arrowDown from 'assets/icons/ic_arrow_down.png';
import disabled from 'assets/icons/ic_disabled.png';
import homeOxfordBlue from 'assets/icons/ic_home-oxfordBlue.png';
import homeSpanishBlue from 'assets/icons/ic_home-spanishBlue.png';
import userSpanishBlue from 'assets/icons/ic_user-spanishBlue.png';
import userOxfordBlue from 'assets/icons/ic_user-oxfordBlue.png';
import arrowPrevBlack from 'assets/icons/ic_arrow_prev-black.png';
import arrowPrevWhite from 'assets/icons/ic_arrow_prev-white.png';
import lockDavysGrey from 'assets/icons/ic_lock-davysGrey.png';
import scanner from 'assets/icons/ic_scanner.png';

export const IconList = {
  qr,
  arrowDown,
  disabled,
  homeOxfordBlue,
  homeSpanishBlue,
  userSpanishBlue,
  userOxfordBlue,
  arrowPrevBlack,
  arrowPrevWhite,
  lockDavysGrey,
  scanner,
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
