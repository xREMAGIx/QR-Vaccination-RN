import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Scanner from 'screens/Scanner';
import InfoRegister from 'screens/InfoRegister';
import VaccineRegister from 'screens/VaccineRegister';

const RegisterInfoStack = createStackNavigator();

export const RegisterInfoNav: React.FC = () => {
  return (
    <RegisterInfoStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Scanner">
      <RegisterInfoStack.Screen name="Scanner" component={Scanner} />
      <RegisterInfoStack.Screen name="InfoRegister" component={InfoRegister} />
      <RegisterInfoStack.Screen
        name="VaccineRegister"
        component={VaccineRegister}
      />
    </RegisterInfoStack.Navigator>
  );
};
