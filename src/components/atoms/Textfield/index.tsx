import React, {forwardRef, useEffect, useState} from 'react';
import styled, {css} from 'styled-components/native';
import {
  NativeSyntheticEvent,
  Platform,
  ReturnKeyTypeOptions,
  TextInputKeyPressEventData,
} from 'react-native';
import {Text} from 'components/atoms/Text';
import colors, {colorsAlpha} from 'variables/colors';
import {Icon, IconName} from 'components/atoms/Icon';
import {PressWrapper} from 'components/atoms/PressWrapper';

type KeyboardType =
  | 'default'
  | 'numeric'
  | 'email-address'
  | 'phone-pad'
  | 'number-pad'
  | 'name-phone-pad';

type Colors = keyof typeof colors;

export type TextFieldContentProps = {
  label?: string;
  colorLabel?: keyof typeof colors;
  fwLabel?: 'regular' | 'medium' | 'bold';
  description?: string;
  placeholder?: string;
  height?: number;
  fs?: number;
  required?: boolean;
  borderColor?: Colors;
  borderWidth?: number;
  color?: Colors;
  bgColor?: Colors;
  bgOpacity?: number;
  borderRadius?: number;
};

export type TextFieldExecuteBtnProps = {
  title?: string;
  handleExecute?: () => void;
};

type WrapperProps = Pick<
  TextFieldProps,
  | 'bgColor'
  | 'borderColor'
  | 'borderWidth'
  | 'fs'
  | 'height'
  | 'bgOpacity'
  | 'borderRadius'
>;

type InputTextFieldProps = Pick<
  TextFieldProps,
  'color' | 'height' | 'postionMaxLenghth' | 'hideDisplayLength' | 'textAlign'
>;

type OTPProps = Pick<TextfieldOtpProps, 'error'> & {
  active?: boolean;
};

type TextFieldProps = TextFieldContentProps & {
  keyboardType?: KeyboardType;
  isSecurity?: boolean;
  defaultValue?: string;
  value?: string;
  editable?: boolean;
  maxDigit?: number;
  error?: string;
  focused?: boolean;
  multiline?: boolean;
  iconSearch?: IconName;
  iconRight?: IconName;
  returnKey?: ReturnKeyTypeOptions;
  postionMaxLenghth?: 'top' | 'bottom' | 'default';
  hideDisplayLength?: boolean;
  textAlign?: 'left' | 'center' | 'right';
  handleChange?: (value: string) => void;
  handleFocus?: () => void;
  handleBlur?: () => void;
  handleSubmit?: () => void;
  handleKeyPress?: (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => void;
  handleIconRight?: () => void;
  handleClick?: () => void;
};

type TextFieldUserInfo = {
  defaultValue?: string;
  value?: string;
  editable?: boolean;
  multiline?: boolean;
  keyboardType?: KeyboardType;
  isSecurity?: boolean;
  focused?: boolean;
  placeholder?: string;
  textColor?: typeof colors;
  maxDigit?: 1 | 2;
  handleChange?: (value: string) => void;
};

type TextfieldOtpProps = {
  defaultValue?: string;
  value: string;
  maxDigit?: 1 | 2;
  focused?: boolean;
  error?: boolean;
  handleChange?: (value: string) => void;
  handleKeyPress?: (
    e: NativeSyntheticEvent<TextInputKeyPressEventData>,
  ) => void;
};

const TextfieldRef: React.ForwardRefRenderFunction<any, TextFieldProps> = (
  {
    label,
    colorLabel = 'black',
    fwLabel = 'regular',
    description,
    required,
    bgColor,
    bgOpacity,
    color,
    returnKey,
    height,
    placeholder,
    borderColor,
    borderWidth,
    borderRadius,
    multiline,
    defaultValue,
    value,
    isSecurity,
    editable,
    focused,
    keyboardType,
    maxDigit,
    postionMaxLenghth = 'top',
    iconSearch,
    iconRight,
    hideDisplayLength,
    textAlign = 'left',
    handleChange,
    handleBlur,
    handleFocus,
    handleKeyPress,
    handleSubmit,
    handleIconRight,
    handleClick,
    error,
    ...props
  },
  ref,
) => {
  const [length, setLength] = useState(0);
  return (
    <Container {...props}>
      {label && (
        <Label fs={14} fw={fwLabel} color={colorLabel}>
          {label}
          {required && '*'}
          {description && (
            <Label fs={14} fw={fwLabel} color={colorLabel}>
              {' '}
              ({description})
            </Label>
          )}
        </Label>
      )}
      <Wrapper
        bgColor={bgColor}
        bgOpacity={bgOpacity}
        borderColor={borderColor}
        borderWidth={borderWidth}
        borderRadius={borderRadius}>
        {iconSearch && (
          <SearchIconView>
            <Icon iconName={iconSearch} size={20} />
          </SearchIconView>
        )}
        <Input
          ref={ref}
          onPressIn={handleClick}
          keyboardType={keyboardType}
          returnKeyType={returnKey || 'done'}
          placeholderTextColor={colors.gainsboro}
          maxLength={maxDigit}
          hideDisplayLength={hideDisplayLength}
          textAlign={textAlign}
          editable={editable}
          placeholder={placeholder}
          multiline={multiline}
          defaultValue={defaultValue}
          value={value}
          color={color}
          height={height}
          secureTextEntry={isSecurity}
          autoFocus={focused}
          onChangeText={e => {
            if (handleChange) {
              handleChange(e);
            }
            if (maxDigit) {
              setLength(e.length);
            }
          }}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyPress={handleKeyPress}
          onSubmitEditing={handleSubmit}
          textContentType={isSecurity ? 'oneTimeCode' : 'none'}
          textAlignVertical={multiline ? 'top' : 'center'}
        />
        {!!maxDigit && !hideDisplayLength && (
          <Length position={postionMaxLenghth}>
            <Text color="blueSapphire" fs={16}>
              {length}/{maxDigit}
            </Text>
          </Length>
        )}
        {iconRight && (
          <IconRight handlePress={handleIconRight}>
            <Icon iconName={iconRight} size={20} />
          </IconRight>
        )}
      </Wrapper>
      {error && (
        <ErrorWrapper>
          <Text fs={10} color="engineering">
            {error}
          </Text>
        </ErrorWrapper>
      )}
    </Container>
  );
};

const TextfieldOtpRef: React.ForwardRefRenderFunction<
  any,
  TextfieldOtpProps
> = ({value, focused, error, handleChange, handleKeyPress, ...props}, ref) => {
  const [active, setActive] = useState(focused || false);
  useEffect(() => {
    if (value.length) {
      setActive(true);
    }
  }, [value]);
  return (
    <Container {...props}>
      <ContentExtend active={active} error={error}>
        <OTP
          ref={ref}
          keyboardType="numeric"
          returnKeyType="done"
          error={error}
          active={active}
          onChangeText={e => {
            if (handleChange) {
              handleChange(e);
            }
          }}
          onFocus={() => setActive(true)}
          onBlur={() => {
            if (!value.length) {
              setActive(false);
            }
          }}
          onKeyPress={handleKeyPress}
          maxLength={1}
        />
        {!active ? <Divider error={error} /> : null}
      </ContentExtend>
    </Container>
  );
};
const TextfieldUserInfo: React.FC<TextFieldUserInfo> = ({
  defaultValue,
  value,
  editable,
  multiline,
  handleChange,
  keyboardType,
  isSecurity,
  focused,
  maxDigit,
  placeholder,
  ...props
}) => {
  return (
    <Container {...props}>
      <InputUserInfo
        placeholderTextColor={colors.gainsboro}
        placeholder={placeholder}
        defaultValue={defaultValue}
        keyboardType={keyboardType}
        editable={editable}
        value={value}
        multiline={multiline}
        autoFocus={focused}
        maxLength={maxDigit}
        secureTextEntry={isSecurity}
        onChangeText={e => {
          if (handleChange) {
            handleChange(e);
          }
        }}
      />
    </Container>
  );
};

const Textfield = forwardRef(TextfieldRef);
const TextfieldOTP = forwardRef(TextfieldOtpRef);

export {Textfield, TextfieldOTP, TextfieldUserInfo};

/* --- Textfield --- */
const Container = styled.View``;

const Label = styled(Text)`
  margin-bottom: 8px;
`;

const Wrapper = styled.View<WrapperProps>`
  position: relative;
  flex-direction: row;
  align-items: center;
  background-color: ${props =>
    props.bgColor
      ? colorsAlpha(props.bgColor, props.bgOpacity || 1)
      : 'transparent'};
  ${props =>
    props.borderColor &&
    ` border: ${props.borderWidth || 1}px solid ${colors[props.borderColor]}`};
  border-radius: ${props => props.borderRadius || 4}px;
  flex-grow: 1;
`;

const ErrorWrapper = styled.View`
  margin-top: 4px;
`;

const Input = styled.TextInput<InputTextFieldProps>`
  height: ${props =>
    props.height ? props.height : Platform.OS === 'ios' ? 36 : 40}px;
  text-align: ${props => props.textAlign};
  font-style: normal;
  font-weight: normal;
  margin-left: 12px;
  flex-grow: 1;
  margin-right: ${props =>
    props.maxLength && !props.hideDisplayLength ? 62 : 12}px;
  color: ${props => colors[props.color || 'black']};
  ${props =>
    Platform.OS === 'android' &&
    css`
      padding: ${props.multiline ? '4px 0 0' : 0};
    `}
`;

const InputUserInfo = styled.TextInput`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${colors.blueSapphire};
  text-align: right;
  ${props =>
    Platform.OS === 'android' &&
    css`
      padding: ${props.multiline ? '4px 0 0' : 0};
    `}
`;

const Length = styled.View<{position?: 'top' | 'bottom' | 'default'}>`
  position: absolute;
  right: 0;
  ${props => {
    switch (props.position) {
      case 'top':
        return css`
          top: -38px;
        `;
      case 'bottom':
        return css`
          bottom: -40px;
        `;
      default:
        return css`
          right: 10px;
          top: 0;
          bottom: 0;
          justify-content: center;
        `;
    }
  }}
`;
const ContentExtend = styled.View<OTPProps>`
  width: 36px;
  height: 36px;
  border-radius: 4px;
  position: relative;
  border: 1px solid
    ${props =>
      props.error
        ? colors.engineering
        : props.active
        ? `${colorsAlpha('blueSapphire', 0.7)}`
        : colors.blueSapphire};
  align-items: center;
`;

const Divider = styled.View<OTPProps>`
  position: absolute;
  width: 12px;
  height: 1px;
  background-color: ${props =>
    props.error ? colors.engineering : colors.blueSapphire};
  bottom: 8px;
`;

const OTP = styled.TextInput<OTPProps>`
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 0;
  margin: 0;
  color: ${props => (props.error ? colors.engineering : colors.blueSapphire)};
`;
const SearchIconView = styled.View`
  margin-left: 12px;
`;

const IconRight = styled(PressWrapper)`
  margin-left: 8px;
  margin-right: 8px;
`;
