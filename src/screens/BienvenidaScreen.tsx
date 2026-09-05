import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BienvenidaScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Evaluación Parcial</Text>

      <Text style={styles.nombre}>
        Alejandro Duque
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.navigate('Principal')}
      >
        <Text style={styles.textoBoton}>Ingresar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  titulo: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  nombre: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
  },

  boton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 10,
  },

  textoBoton: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});