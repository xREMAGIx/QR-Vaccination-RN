import React from 'react';
import styled, {css} from 'styled-components/native';
import {Pressable, ActivityIndicator, Keyboard} from 'react-native';
import colors, {colorsAlpha} from 'variables/colors';
import {Icon, IconName} from 'components/atoms/Icon';
import {Text} from 'components/atoms/Text';

type StyleProps = {
  variant?: 'primary' | 'secondary';
  size?: 'large' | 'medium' | 'small' | 'extra small';
  disabled?: boolean;
  pressed?: boolean;
  iconNameRight?: IconName;
  iconNameLeft?: IconName;
};

type TextProps = {
  color?: keyof typeof colors;
} & StyleProps;

type Props = {
  loading?: boolean;
  loadingColor?: keyof typeof colors;
  handlePress?: () => void;
} & TextProps &
  StyleProps;

export const Button: React.FC<Props> = ({
  variant,
  disabled,
  loading,
  handlePress,
  loadingColor,
  size,
  children,
  iconNameRight,
  iconNameLeft,
  ...props
}) => {
  const sizeIcon = () => {
    switch (size) {
      case 'extra small':
        return 32;
      case 'small':
        return 36;
      default:
        return 40;
    }
  };
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={() => {
        Keyboard.dismiss();
        if (handlePress) {
          handlePress();
        }
      }}>
      {({pressed}) => (
        <Container
          {...props}
          pressed={pressed}
          variant={variant}
          disabled={disabled}
          size={size}>
          {loading ? (
            <ActivityIndicator color={loadingColor || colors.white} />
          ) : (
            <>
              {iconNameLeft && (
                <Icon iconName={iconNameLeft} size={sizeIcon()} />
              )}
              <Label
                size={size}
                fw="bold"
                color={
                  variant === 'secondary' || disabled ? 'blueSapphire' : 'white'
                }>
                {children}
              </Label>
              {iconNameRight && (
                <Icon iconName={iconNameRight} size={sizeIcon()} />
              )}
            </>
          )}
        </Container>
      )}
    </Pressable>
  );
};

Button.defaultProps = {
  size: 'small',
  variant: 'primary',
};

const Container = styled.View<StyleProps>`
  border-radius: 50px;
  opacity: ${props => (props.disabled ? 0.6 : 1)};
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 100%;
  ${props => {
    switch (props.size) {
      case 'extra small':
        return css`
          height: 36px;
        `;
      case 'small':
        return css`
          height: 48px;
        `;
      case 'medium':
        return css`
          height: 56px;
        `;
      default:
        return css`
          height: 66px;
        `;
    }
  }};
  ${props => {
    switch (props.variant) {
      case 'secondary':
        return css`
          border: 1px solid ${colors.blueSapphire};
          background-color: ${props.disabled
            ? colors.pastelGray
            : props.pressed
            ? `${colorsAlpha('blueSapphire', 0.1)}`
            : colors.white};
        `;
      default:
        return css`
          background-color: ${props.disabled
            ? colors.pastelGray
            : props.pressed
            ? `${colorsAlpha('blueSapphire', 0.7)}`
            : colors.blueSapphire};
        `;
    }
  }};
`;

const Label = styled(Text)<TextProps>`
  padding-left: 8px;
  padding-right: 8px;
  ${props => {
    switch (props.size) {
      case 'extra small':
        return css`
          font-size: 14px;
        `;
      case 'small':
        return css`
          font-size: 16px;
        `;
      default:
        return css`
          font-size: 18px;
        `;
    }
  }};
`;
