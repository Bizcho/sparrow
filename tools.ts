import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getToken(){
    let userToken = await Platform.select({
      native: async () => {
        // usar secure storage
        //https://docs.expo.dev/versions/latest/sdk/securestore/
        return await SecureStore.getItemAsync('userToken');
      },
      default: async () => {
        // usuar local storage
        //https://react-native-async-storage.github.io/async-storage/docs/usage
        return await AsyncStorage.getItem('@userToken');
      }
    })();
    if (!userToken){
    	throw new Error("Token no valido"); 
    }
    return userToken;
}