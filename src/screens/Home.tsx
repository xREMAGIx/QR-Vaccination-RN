import React from 'react';
import styled from 'styled-components/native';
import {HeadBar} from 'components/organisms/HeadBar';
import colors from 'variables/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {Flex} from 'components/atoms/Wrapper';
import {MenuItem} from 'components/molecules/MenuItem';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {IconName} from 'components/atoms/Icon';

type ItemData = {
  iconName: IconName;
  title: string;
  screen: string;
  iconSize?: number;
  nav: string;
  case?: string;
};

const pageData: ItemData[] = [
  {
    iconName: 'qr',
    title: 'Đăng ký tiêm vaccine',
    screen: 'Scanner',
    iconSize: 44,
    nav: 'RegisterInfoNav',
    case: 'register',
  },
];

const menuItemWidth = Dimensions.get('window').width / 3 - 16;

const Home: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <HeadBar isWhiteTheme withSafe>
        Trang chủ
      </HeadBar>
      <ScrollView>
        <ListMenuContainer>
          <Flex isWrap alignItems="stretch" justifyContent="flex-start">
            {pageData.map((item, index) => (
              <MenuItemContainer
                alignItems="stretch"
                justifyContent="space-between"
                basis={`${menuItemWidth}px`}
                key={`${item.title}-${index}`}>
                <MenuItem
                  iconName={item.iconName}
                  size={item.iconSize || 60}
                  handlePress={() => {
                    navigation.navigate(item.nav, {
                      screen: item.screen,
                      params: {case: item.case},
                    });
                  }}>
                  {item.title}
                </MenuItem>
              </MenuItemContainer>
            ))}
          </Flex>
        </ListMenuContainer>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  background: ${colors.aliceBlue};
`;

const ListMenuContainer = styled.View`
  padding: 8px 12px;
`;

const MenuItemContainer = styled(Flex)`
  margin: 4px;
`;

export default Home;
