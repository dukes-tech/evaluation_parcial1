import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import TabNavigator from './TabNavigator';
import Screen1 from '../screens/Screen1';
import Screen4 from '../screens/Screen4';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Inicio"
        component={TabNavigator}
        options={{ title: 'Evaluación Parcial' }}
      />

      <Drawer.Screen
        name="RegistrarProducto"
        component={Screen1}
        options={{ title: 'Registrar producto' }}
      />

      <Drawer.Screen
        name="Musica"
        component={Screen4}
        options={{ title: 'Música' }}
      />
    </Drawer.Navigator>
  );
}