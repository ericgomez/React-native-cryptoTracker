import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
  // Creamos una sola instancia
  static instance = new Storage();

  //Metodo generico store, unicamente almacena String, los demas datos los tenemos que convertir a Strings
  store = async (key, value) => {
    try {
      // En value solo podemos recibir un string
      await AsyncStorage.setItem(key, value);
      return true;
    } catch (e) {
      console.log('Storage Error', e);
      return false;
    }
  };

  get = async key => {
    try {
      return await AsyncStorage.getItem(key);
    } catch (e) {
      console.log('Storage get Error', e);
      throw Error(e);
    }
  };

  remove = async key => {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (e) {
      console.log('Storage remove Error', e);
      return false;
    }
  };

  //Metodo para obtener toda la lista de lo que queramos
  multiGet = async keys => {
    try {
      //Enviamos un array de llavez
      return await AsyncStorage.multiGet(keys);
    } catch (e) {
      console.log('Storage  multiGet Error', e);
      throw Error(e);
    }
  };

  //Metofo para obtener todas las Keys
  getAllKeys = async () => {
    try {
      return await AsyncStorage.getAllKeys();
    } catch (e) {
      console.log('Storage getAllKeys err', e);
      throw Error(e);
    }
  };
}

export default Storage;
