import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';

export default function Informacion({ producto }: any) {

  function mostrarInformacion() {
    Alert.alert(
      producto.nombre,
      `ID: ${producto.id}
Categoría: ${producto.categoria}
Cantidad: ${producto.cantidad}
Precio: $${producto.precio}`
    );
  }

  return (
    <TouchableOpacity
      style={styles.item}
      onPress={mostrarInformacion}
    >
      <Text style={styles.nombre}>{producto.nombre}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 15,
    backgroundColor: '#f1f5f9',
    borderRadius: 8,
    marginBottom: 10,
  },

  nombre: {
    fontSize: 17,
    fontWeight: '600',
  },
});