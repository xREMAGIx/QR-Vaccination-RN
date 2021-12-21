import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import InfoRegister from 'screens/InfoRegister';
import VaccineRegister from 'screens/VaccineRegister';
import CompleteRegister from 'screens/CompleteRegister';

const RegistrationStack = createStackNavigator();

export const RegistrationNav: React.FC = () => {
  return (
    <RegistrationStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="InfoRegister">
      <RegistrationStack.Screen name="InfoRegister" component={InfoRegister} />
      <RegistrationStack.Screen
        name="VaccineRegister"
        component={VaccineRegister}
      />
      <RegistrationStack.Screen
        name="CompleteRegister"
        component={CompleteRegister}
      />
    </RegistrationStack.Navigator>
  );
};
