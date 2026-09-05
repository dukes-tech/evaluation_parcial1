import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Screen1 from '../screens/Screen1';
import Screen2 from '../screens/Screen2';
import Screen3 from '../screens/Screen3';
import Screen4 from '../screens/Screen4';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Registrar"
        component={Screen1}
      />

      <Tab.Screen
        name="Consultar"
        component={Screen2}
      />

      <Tab.Screen
        name="Editar"
        component={Screen3}
      />

      <Tab.Screen
        name="Música"
        component={Screen4}
      />
    </Tab.Navigator>
  );
}