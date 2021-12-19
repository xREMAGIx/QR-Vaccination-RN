import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import colors from 'variables/colors';
import {Icon} from 'components/atoms/Icon';
import {Text} from 'components/atoms/Text';
import Home from 'screens/Home';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const BottomNavigation: React.FC = () => {
  const Tab = createBottomTabNavigator();
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      initialRouteName="HomeNav"
      tabBarOptions={{
        style: {
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
              Home
            </Text>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Home}
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
              User
            </Text>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
