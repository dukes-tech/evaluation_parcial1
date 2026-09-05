import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BienvenidaScreen from '../screens/BienvenidaScreen';
import DrawerNavigator from './DrawerNavigator';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName="Bienvenida">

      <Stack.Screen
        name="Bienvenida"
        component={BienvenidaScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Principal"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />

    </Stack.Navigator>
  );
}