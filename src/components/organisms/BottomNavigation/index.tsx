import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from 'variables/colors';
import {Icon} from 'components/atoms/Icon';
import {Text} from 'components/atoms/Text';
import Home from 'screens/Home';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import User from 'screens/User';
import Scanner from 'screens/Scanner';
import {PressWrapper} from 'components/atoms/PressWrapper';
import {StyleSheet, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

export const BottomNavigation: React.FC = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleScanner = () => {
    navigation.navigate('Scanner');
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeNav"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.white,
          paddingTop: 8,
          paddingBottom: Math.max(insets.bottom, 12),
          height: 68 + Math.max(insets.bottom, 12),
        },
      }}>
      <Tab.Screen
        name="HomeNav"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              iconName={focused ? 'homeSpanishBlue' : 'homeOxfordBlue'}
              size={40}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              fs={14}
              fw="regular"
              color={focused ? 'blueSapphire' : 'pastelGray'}
              opacity={focused ? 1 : 0.5}>
              Trang chủ
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Scanner"
        component={Scanner}
        options={{
          tabBarButton: () => (
            <PressWrapper handlePress={handleScanner}>
              <View style={styles.qrButton}>
                <Icon iconName="qr" size={44} />
              </View>
            </PressWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="User"
        component={User}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              iconName={focused ? 'userSpanishBlue' : 'userOxfordBlue'}
              size={40}
            />
          ),
          tabBarLabel: ({focused}) => (
            <Text
              fs={14}
              fw="regular"
              color={focused ? 'blueSapphire' : 'pastelGray'}
              opacity={focused ? 1 : 0.5}>
              Người dùng
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  qrButton: {
    marginTop: -26,
    zIndex: 5,
    backgroundColor: colors.white,
    padding: 16,
    borderStyle: 'solid',
    borderColor: colors.gainsboro,
    borderWidth: 1,
    borderRadius: 20,
  },
});
