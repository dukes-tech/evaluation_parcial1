import React, { useEffect, useState } from 'react';
import { View,  Text,  TextInput, TouchableOpacity,  StyleSheet, Alert, FlatList,} from 'react-native';

import { supabase } from '../services/supabase';
import Informacion from '../components/Informacion';

export default function Screen2() {

  const [id, setId] = useState('');
  const [producto, setProducto] = useState<any>(null);
  const [productos, setProductos] = useState<any[]>([]);

  async function buscarPorId() {

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
      Alert.alert('Error', 'No se pudo realizar la búsqueda');
      return;
    }

    if (!data) {
      setProducto(null);
      Alert.alert('Información', 'Producto no encontrado');
      return;
    }

    setProducto(data);
  }

  async function listarProductos() {

    const { data, error } = await supabase
                          .from('productos')
                          .select('*')
                          .order('id', { ascending: true });

    if (error) {
      return;
    }

    setProductos(data || []);
  }

  useEffect(() => {
    listarProductos();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Consultar productos</Text>

      <Text style={styles.subtitulo}>Buscar por ID</Text>

      <TextInput
        style={styles.input}
        placeholder="Ingrese ID"
        keyboardType="numeric"
        value={id}
        onChangeText={setId}
      />

      <TouchableOpacity style={styles.boton} onPress={buscarPorId}>
        <Text style={styles.textoBoton}>Buscar</Text>
      </TouchableOpacity>

      {producto && (
        <View style={styles.resultado}>
          <Text>Nombre: {producto.nombre}</Text>
          <Text>Categoría: {producto.categoria}</Text>
          <Text>Cantidad: {producto.cantidad}</Text>
          <Text>Precio: ${producto.precio}</Text>
        </View>
      )}

      <Text style={styles.subtitulo}>Lista de productos</Text>

      <TouchableOpacity
        style={styles.botonRecargar}
        onPress={listarProductos}
      >
        <Text>Recargar lista</Text>
      </TouchableOpacity>

      <FlatList
        data={productos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Informacion producto={item} />
        )}
      />

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

  subtitulo: {
    fontSize: 19,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },

  boton: {
    backgroundColor: '#2563eb',
    padding: 13,
    borderRadius: 8,
    alignItems: 'center',
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },

  resultado: {
    padding: 15,
    marginTop: 15,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
  },

  botonRecargar: {
    padding: 10,
    backgroundColor: '#e2e8f0',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },

});