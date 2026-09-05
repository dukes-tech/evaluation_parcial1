import React, { useEffect, useState } from 'react';
import {  View,  Text,  FlatList,  Image,  TouchableOpacity,  StyleSheet,  Alert,ActivityIndicator,  Modal,} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'https://jritsqmet.github.io/web-api/musica.json';

export default function Screen4() {

  const [musica, setMusica] = useState<any[]>([]);
  const [cargando, setCargando] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [cancionSeleccionada, setCancionSeleccionada] = useState<any>(null);
  const [favoritos, setFavoritos] = useState<any[]>([]);

  async function cargarMusica() {
    try {
      setCargando(true);

      const respuesta = await fetch(API_URL);
      const datos = await respuesta.json();

      setMusica(datos.musica);

    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'No se pudo cargar la música');
    } finally {
      setCargando(false);
    }
  }

  useEffect(() => {
    cargarMusica();
    cargarFavoritos();
  }, []);

  function abrirModal(cancion: any) {
    setCancionSeleccionada(cancion);
    setModalVisible(true);
  }

  function cerrarModal() {
    setModalVisible(false);
    setCancionSeleccionada(null);
  }

  async function cargarFavoritos() {
  const datos = await AsyncStorage.getItem('favoritos');

  if (datos) {
    setFavoritos(JSON.parse(datos));
  }
}

async function agregarFavorito(cancion: any) {
  const existe = favoritos.some(
    (item) => item.id === cancion.id
  );

  if (existe) {
    Alert.alert('Información', 'Esta canción ya está en favoritos');
    return;
  }

  const nuevosFavoritos = [...favoritos, cancion];

  setFavoritos(nuevosFavoritos);

  await AsyncStorage.setItem(
    'favoritos',
    JSON.stringify(nuevosFavoritos)
  );

  Alert.alert('Favoritos', 'Canción agregada a favoritos');
}

async function eliminarFavorito(cancion: any) {
  const nuevosFavoritos = favoritos.filter(
    (item) => item.id !== cancion.id
  );

  setFavoritos(nuevosFavoritos);

  await AsyncStorage.setItem(
    'favoritos',
    JSON.stringify(nuevosFavoritos)
  );

  Alert.alert('Favoritos', 'Canción eliminada de favoritos');
}

function esFavorito(id: any) {
  return favoritos.some((item) => item.id === id);
}
  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Lista de Música</Text>

      <TouchableOpacity
        style={styles.boton}
        onPress={cargarMusica}
      >
        <Text style={styles.textoBoton}>
          Recargar datos
        </Text>
      </TouchableOpacity>

      {cargando ? (

        <ActivityIndicator size="large" />

      ) : (

        <FlatList
          data={musica}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (

            <TouchableOpacity
              style={styles.tarjeta}
              onPress={() => abrirModal(item)}
            >

              <Image
                source={{ uri: item.media.cover_image }}
                style={styles.imagen}
              />

              <View style={styles.info}>

                <Text style={styles.nombre}>
                  {item.title}
                </Text>

                <Text>{item.artist.name}</Text>

                <Text>Álbum: {item.album}</Text>

                <Text>Año: {item.year}</Text>

              </View>

            </TouchableOpacity>

          )}
        />

      )}

      {/* MODAL */}

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={cerrarModal}
      >

        <View style={styles.fondoModal}>

          <View style={styles.modal}>

            {cancionSeleccionada && (
              <>

                <Image
                  source={{
                    uri: cancionSeleccionada.media.cover_image
                  }}
                  style={styles.imagenModal}
                />

                <Text style={styles.tituloModal}>
                  {cancionSeleccionada.title}
                </Text>

                <Text style={styles.textoModal}>
                  Artista: {cancionSeleccionada.artist.name}
                </Text>

                <Text style={styles.textoModal}>
                  Género: {cancionSeleccionada.artist.genre}
                </Text>

                <Text style={styles.textoModal}>
                  Álbum: {cancionSeleccionada.album}
                </Text>

                <Text style={styles.textoModal}>
                  Año: {cancionSeleccionada.year}
                </Text>

                <Text style={styles.textoModal}>
                  Duración: {cancionSeleccionada.duration}
                </Text>
                <TouchableOpacity
                    style={styles.favorito}
                    onPress={() => {
                      if (esFavorito(cancionSeleccionada.id)) {
                        eliminarFavorito(cancionSeleccionada);
                      } else {
                        agregarFavorito(cancionSeleccionada);
                      }
                    }}
                  >
                  <Text style={styles.textoBoton}>
                    {esFavorito(cancionSeleccionada.id)
                      ? '★ Eliminar de favoritos'
                      : '☆ Agregar a favoritos'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cerrar}
                  onPress={cerrarModal}
                >
                  
                
                  <Text style={styles.textoBoton}>
                    Cerrar
                  </Text>
                </TouchableOpacity>

              </>
            )}

          </View>

        </View>

      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },

  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  boton: {
    backgroundColor: '#2563eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },

  textoBoton: {
    color: '#fff',
    fontWeight: 'bold',
  },

  tarjeta: {
    flexDirection: 'row',
    backgroundColor: '#f1f5f9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
  },

  imagen: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },

  info: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },

  nombre: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 5,
  },

  fondoModal: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },

  modal: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 25,
    alignItems: 'center',
  },

  imagenModal: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },

  tituloModal: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
  },

  textoModal: {
    fontSize: 16,
    marginBottom: 7,
  },

  cerrar: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    marginTop: 20,
  },
favorito: {
  backgroundColor: '#f59e0b',
  paddingVertical: 12,
  paddingHorizontal: 30,
  borderRadius: 8,
  marginTop: 20,
},
});