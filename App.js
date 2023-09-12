import * as React from 'react';
import { Button, Text, TextInput, View, TouchableOpacity, Platform } from 'react-native';

import * as SecureStore from 'expo-secure-store';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { getToken } from './tools.ts';
 import SignInScreen from './screens/SignInScreen.tsx'
// import LogedIn from './screens/LogedIn.ts'
// import { styles } from './styles/styleLogin.ts'

export const AuthContext = React.createContext(null);

function SplashScreen() {
  return (
    <View>
      <Text>Loading...</Text>
    </View>
  );
}

const Stack = createStackNavigator();

export default function App({ navigation }) {


  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
    }
  );

  React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // obtener token
        userToken = await getToken()
        // revisar que token esta es vigente aun
        // testToken(userToken);
      } catch (e) {
        // Restoring token failed
        dispatch({ type: 'SIGN_OUT' });
      }
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        try {
          const response = await fetch('https://sparrowapi20230904203428.azurewebsites.net/Authentication/SignIn', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              "userName": "Bizcho",
              "password": "Plop.2023"
            })
          });
          const jsonResponse = await response.json();
          if (jsonResponse.authToken){
            // guardar y actualizar la pantalla
          	console.log("plop!")
            Platform.select({
              native: async () => {
                // usar secure storage
                //https://docs.expo.dev/versions/latest/sdk/securestore/
                await SecureStore.setItemAsync('userToken', jsonResponse.authToken);
              },
              default: async () => {
                // usuar local storage
                //https://react-native-async-storage.github.io/async-storage/docs/usage
                await AsyncStorage.setItem('@userToken', jsonResponse.authToken);
              }
            })();
            dispatch({ type: 'SIGN_IN', token: jsonResponse.authToken });
          }
        } catch(error) {
          console.error(error);
        }

        //dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
      signOut: () => {
        Platform.select({
              native: async () => {
                // usar secure storage
                //https://docs.expo.dev/versions/latest/sdk/securestore/
                await SecureStore.setItemAsync('userToken', '');
              },
              default: async () => {
                // usuar local storage
                //https://react-native-async-storage.github.io/async-storage/docs/usage
                await AsyncStorage.setItem('@userToken', '');
              }
            })();
        dispatch({ type: 'SIGN_OUT' })
      },
      signUp: async (data) => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore` or any other encrypted storage
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer independent={true} >
        <Stack.Navigator>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false,
                animationTypeForReplace: state.isSignout ? 'pop' : 'push',
              }}
            />
          ) : ( 
            // User is signed in
          	<view />
            // <Stack.Screen 
            //   options= {{headerShown: false}} 
            //   name="Home" 
            //   component={LogedIn} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}