import React, { useState } from 'react';
import {  View,  Text, TextInput,  TouchableOpacity, StyleSheet,Alert,} from 'react-native';

import { supabase } from '../services/supabase';

export default function Screen1() {

  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  async function registrarProducto() {

    if (!nombre || !categoria || !cantidad || !precio) {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    const { error } = await supabase
                    .from('productos')
                    .insert({
                      nombre: nombre,
                      categoria: categoria,
                      cantidad: Number(cantidad),
                      precio: Number(precio),
                    });

    if (error) {
      Alert.alert('Error', 'No se pudo registrar el producto');
      return;
    }

    Alert.alert('Correcto','El producto se agregó correctamente');

    setNombre('');
    setCategoria('');
    setCantidad('');
    setPrecio('');
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>
        Agregar producto
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={categoria}
        onChangeText={setCategoria}
      />

      <TextInput
        style={styles.input}
        placeholder="Cantidad"
        keyboardType="numeric"
        value={cantidad}
        onChangeText={setCantidad}
      />

      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="decimal-pad"
        value={precio}
        onChangeText={setPrecio}
      />

      <TouchableOpacity
        style={styles.boton}
        onPress={registrarProducto}
      >
        <Text style={styles.textoBoton}>
          Registrar
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 25,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 14,
    marginBottom: 15,
    fontSize: 16,
  },

  boton: {
    backgroundColor: '#2563eb',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});