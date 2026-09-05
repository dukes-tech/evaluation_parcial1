import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert} from 'react-native';

import { supabase } from '../services/supabase';

export default function Screen3() {
  const [id, setId] = useState('');
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [precio, setPrecio] = useState('');

  async function buscarProducto() {
    if (!id) {
      Alert.alert('Error', 'Ingrese un ID');
      return;
    }

    const { data, error } = await supabase
                          .from('productos')
                          .select('*')
                          .eq('id', Number(id))
                          .maybeSingle();

    if (error) {
      Alert.alert('Error', 'Error al buscar el producto');
      return;
    }

    if (!data) {
      Alert.alert('Información', 'Producto no encontrado');
      limpiarCampos();
      return;
    }

    setNombre(data.nombre);
    setCategoria(data.categoria);
    setCantidad(data.cantidad.toString());
    setPrecio(data.precio.toString());
  }

  async function editarProducto() {
    if (!id || !nombre || !categoria || !cantidad || !precio) {
      Alert.alert('Error', 'Complete todos los campos');
      return;
    }

    const { error } = await supabase
                    .from('productos')
                    .update({
                      nombre,
                      categoria,
                      cantidad: Number(cantidad),
                      precio: Number(precio),
                    })
                    .eq('id', Number(id));

    if (error) {
      Alert.alert('Error', 'No se pudo editar el producto');
      return;
    }

    Alert.alert('Correcto', 'El producto se ha editado correctamente');
    limpiarTodo();
  }

  function confirmarEliminar() {
    if (!id) {
      Alert.alert('Error', 'Primero busque un producto');
      return;
    }

    Alert.alert(
      'Confirmar eliminación',
      '¿Está seguro de eliminar este producto?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: eliminarProducto,
        },
      ]
    );
  }

  async function eliminarProducto() {
    const { error } = await supabase
                    .from('productos')
                    .delete()
                    .eq('id', Number(id));

    if (error) {
      Alert.alert('Error', 'No se pudo eliminar el producto');
      return;
    }

    Alert.alert('Correcto', 'Producto eliminado correctamente');
    limpiarTodo();
  }

  function limpiarCampos() {
    setNombre('');
    setCategoria('');
    setCantidad('');
    setPrecio('');
  }

  function limpiarTodo() {
    setId('');
    limpiarCampos();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar / Eliminar</Text>

      <TextInput
        style={styles.input}
        placeholder="ID del producto"
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
      />

      <TouchableOpacity style={styles.buscar} onPress={buscarProducto}>
        <Text style={styles.textoBoton}>Buscar producto</Text>
      </TouchableOpacity>

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

      <TouchableOpacity style={styles.editar} onPress={editarProducto}>
        <Text style={styles.textoBoton}>Editar producto</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.eliminar} onPress={confirmarEliminar}>
        <Text style={styles.textoBoton}>Eliminar producto</Text>
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
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 13,
    marginBottom: 12,
  },

  buscar: {
    backgroundColor: '#2563eb',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },

  editar: {
    backgroundColor: '#16a34a',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },

  eliminar: {
    backgroundColor: '#dc2626',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 12,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },
});