import AsyncStorage from '@react-native-async-storage/async-storage';
import { Producto } from '../types/Producto';

const KEY = 'productos';

export async function obtenerProductos(): Promise<Producto[]> {
  const datos = await AsyncStorage.getItem(KEY);

  if (datos) {
    return JSON.parse(datos);
  }

  return [];
}

export async function guardarProducto(producto: Producto) {
  const productos = await obtenerProductos();

  productos.push(producto);

  await AsyncStorage.setItem(KEY, JSON.stringify(productos));
}