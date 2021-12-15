import React from 'react';
import styled, {css} from 'styled-components/native';
import colors, {colorsAlpha} from 'variables/colors';
import {Text} from 'components/atoms/Text';
import {Wrapper} from 'components/atoms/Wrapper';
import {Icon, IconName} from 'components/atoms/Icon';

type Props = {
  iconName: IconName;
  size?: number;
  noshadow?: boolean;
  handlePress: () => void;
};

export const MenuItem: React.FC<Props> = ({
  iconName,
  children,
  size = 40,
  noshadow,
  handlePress,
}) => {
  return (
    <Container noshadow={noshadow} onPress={handlePress}>
      {({pressed}) => (
        <Content pressed={pressed}>
          <Background>
            <Icon iconName={iconName} size={size} />
          </Background>
          <Wrapper mTop={4}>
            <Text lh={18} fs={13} color="black" textAlign="center">
              {children}
            </Text>
          </Wrapper>
        </Content>
      )}
    </Container>
  );
};

const Container = styled.Pressable<{noshadow?: boolean}>`
  background: ${colors.white};

  border-radius: 4px;
  align-items: center;
  padding: 13px;
  flex: 1;
  ${props =>
    !props.noshadow &&
    css`
      box-shadow: 0px 1px 4px ${colorsAlpha('black', 0.05)};
    `}
`;
const Background = styled.View`
  width: 60px;
  height: 60px;
  background-color: ${colorsAlpha('blueSapphire', 0.05)};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const Content = styled.View<{pressed?: boolean}>`
  align-items: center;
  ${props =>
    props.pressed &&
    css`
      opacity: 0.8;
    `};
`;
