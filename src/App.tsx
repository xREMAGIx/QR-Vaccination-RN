import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import routes from 'routes';
import styled from 'styled-components/native';
import colors from 'variables/colors';

const Stack = createStackNavigator();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.white,
  },
};

const App = () => {
  return (
    <Container>
      <NavigationContainer theme={theme}>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: false,
          }}
          initialRouteName="Login">
          {routes.map((route, index) => (
            <Stack.Screen
              key={`route-${route.name}-${index}`}
              name={route.name}
              component={route.page}
            />
          ))}
        </Stack.Navigator>
      </NavigationContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

export default App;
