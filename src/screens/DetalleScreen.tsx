import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

export default function DetalleScreen({ route, navigation }: any) {

  const { cancion } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>

      <Image
        source={{ uri: cancion.media.cover_image }}
        style={styles.imagen}
      />

      <Text style={styles.titulo}>
        {cancion.title}
      </Text>

      <Text style={styles.texto}>
        Artista: {cancion.artist.name}
      </Text>

      <Text style={styles.texto}>
        Género: {cancion.artist.genre}
      </Text>

      <Text style={styles.texto}>
        Álbum: {cancion.album}
      </Text>

      <Text style={styles.texto}>
        Año: {cancion.year}
      </Text>

      <Text style={styles.texto}>
        Duración: {cancion.duration}
      </Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.textoBoton}>Cerrar</Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  imagen: {
    width: 280,
    height: 280,
    borderRadius: 15,
    marginBottom: 25,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  texto: {
    fontSize: 18,
    marginBottom: 10,
  },

  boton: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 25,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

});