import React from 'react';
import styled, {css} from 'styled-components/native';

type WrapperProps = {
  mTop?: number;
  mRight?: number;
  mBottom?: number;
  mLeft?: number;
};

type FlexProps = {
  isColumn?: boolean;
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  alignItems?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline';
  flexNum?: number;
  basis?: string;
  grow?: number;
  shrink?: number;
  isWrap?: boolean;
};

export const Wrapper: React.FC<WrapperProps> = ({children, ...props}) => {
  return <Container {...props}>{children}</Container>;
};

export const Flex: React.FC<FlexProps> = ({children, ...props}) => {
  return <FlexContainer {...props}>{children}</FlexContainer>;
};

const Container = styled.View<WrapperProps>`
  margin-top: ${props => (props.mTop ? props.mTop : 0)}px;
  margin-right: ${props => (props.mRight ? props.mRight : 0)}px;
  margin-bottom: ${props => (props.mBottom ? props.mBottom : 0)}px;
  margin-left: ${props => (props.mLeft ? props.mLeft : 0)}px;
`;

const FlexContainer = styled.View<FlexProps>`
  flex-direction: ${props => (props.isColumn ? 'column' : 'row')};
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  align-items: ${props => (props.alignItems ? props.alignItems : 'center')};
  ${props =>
    props.flexNum &&
    css`
      flex: ${props.flexNum};
    `};
  ${props =>
    props.basis &&
    css`
      flex-basis: ${props.basis};
    `};
  ${props =>
    props.grow &&
    css`
      flex-grow: ${props.grow};
    `};
  ${props =>
    props.shrink &&
    css`
      flex-shrink: ${props.shrink};
    `};
  ${props =>
    props.isWrap &&
    css`
      flex-wrap: wrap;
    `};
`;
