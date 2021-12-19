import React from 'react';
import styled from 'styled-components/native';
import {Icon} from 'components/atoms/Icon';
import {Flex, Wrapper} from 'components/atoms/Wrapper';
import {Text} from 'components/atoms/Text';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import colors from 'variables/colors';
import {useNavigation} from '@react-navigation/native';
import {PressWrapper} from 'components/atoms/PressWrapper';

type Props = {
  withSafe?: boolean;
  isBack?: boolean;
  isWhiteTheme?: boolean;
  rightEle?: React.ReactNode;
  handleRight?: () => void;
  handleLeft?: () => void;
};

type HeadBarSearchProps = {
  value?: string;
  isBack?: boolean;
  dataSuggestion?: string[];
  handleLeft?: () => void;
  handleSearch: (value: string) => void;
  handleLoadMore?: () => void;
};

export const HeadBar: React.FC<Props> = ({
  withSafe,
  isWhiteTheme,
  isBack,
  children,
  rightEle,
  handleRight,
  handleLeft,
  ...props
}) => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleBack = () => {
    if (handleLeft) {
      handleLeft();
    } else {
      navigation.goBack();
    }
  };

  return (
    <Container
      pdTop={withSafe ? insets.top + 16 : 16}
      isWhiteTheme={isWhiteTheme}
      {...props}>
      <BarContainer alignItems="center">
        {isBack ? (
          <Back handlePress={handleBack}>
            <Icon
              iconName={isWhiteTheme ? 'arrowPrevWhite' : 'arrowPrevBlack'}
            />
          </Back>
        ) : null}

        <TitleContainer grow={1} isColumn alignItems="stretch">
          <Wrapper mLeft={isWhiteTheme ? -24 : 12}>
            <Text
              color={isWhiteTheme ? 'white' : 'blueSapphire'}
              fs={21}
              lh={32}
              fw="medium"
              textAlign={
                isWhiteTheme || (!isBack && !rightEle) ? 'center' : 'left'
              }>
              {children}
            </Text>
          </Wrapper>
        </TitleContainer>
        <Flex shrink={0}>
          {rightEle ? (
            <PressWrapper handlePress={handleRight}>
              <Flex alignItems="center" justifyContent="flex-end">
                {rightEle}
              </Flex>
            </PressWrapper>
          ) : null}
        </Flex>
      </BarContainer>
    </Container>
  );
};

const Container = styled.View<{pdTop: number; isWhiteTheme?: boolean}>`
  padding: ${props => props.pdTop}px 16px 8px;
  background-color: ${props =>
    props.isWhiteTheme ? colors.blueSapphire : colors.white};
`;

const BarContainer = styled(Flex)`
  position: relative;
`;

const TitleContainer = styled(Flex)`
  z-index: -1;
`;

const Back = styled(PressWrapper)`
  padding: 5px;
`;
