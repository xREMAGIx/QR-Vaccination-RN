import React from 'react';
import {Pressable} from 'react-native';
import styled, {css} from 'styled-components/native';

type Props = {
  disabled?: boolean;
  handlePress?: () => void;
};

export const PressWrapper: React.FC<Props> = ({
  disabled,
  handlePress,
  children,
  ...props
}) => {
  return (
    <Pressable
      onPress={() => {
        if (!disabled && handlePress) {
          handlePress();
        }
      }}>
      {({pressed}) => (
        <Container {...props} pressed={pressed}>
          {children}
        </Container>
      )}
    </Pressable>
  );
};

const Container = styled.View<{pressed?: boolean}>`
  ${props =>
    props.pressed &&
    css`
      opacity: 0.8;
    `};
`;
