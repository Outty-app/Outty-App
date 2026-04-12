import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import IndexScreen from './screens/IndexScreen';
import MessagingScreen from './screens/MessagingScreen';

export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Index: undefined;
  Messaging: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Signup" component={SignupScreen} />
        <Stack.Screen name='Index' component={IndexScreen}/>
        <Stack.Screen name='Messaging' component={MessagingScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
