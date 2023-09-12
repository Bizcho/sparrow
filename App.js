import * as React from 'react';
import { 
  Button, 
  Text, 
  TextInput, 
  View, 
  TouchableOpacity, 
  Platform, 
  StyleSheet,
  SafeAreaView,
  Image,
  ImageBackground
} from 'react-native';
//import { AuthContext } from '../App';
//import { styles } from '../styles/styleLogin.tsx'


//const app = require('../app.json');
export default function SignInScreen() {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  //const { signIn } = React.useContext(AuthContext);

  const image = { uri: "https://reactjs.org/logo-og.png" };

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground 
        style={styles.image}
        source={image} 
        //source={require('../assets/images/design/plop.png')}
        resizeMode="cover"
      >
        <View style={styles.logo}>
          <Image 
            style={styles.headerImageImg} 
            source={require('./assets/images/design/logo-transparencias-full-color-.png')}
          ></Image>
        </View>

        <View style={styles.form}>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Name"
              value={username}
              onChangeText={setUsername}
              //placeholderTextColor={app.expo.mainColors.secondaryColor}
            />
          </View>
     
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Password"
              //placeholderTextColor={app.expo.mainColors.secondaryColor}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
     
          {/*<TouchableOpacity>
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>*/}

          <TouchableOpacity style={styles.loginBtn} onPress={() => signIn({ username, password })}>
            <Text style={styles.loginText}>LOGIN</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo:{
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ee8fef",
  },
  form:{
    flex: 3,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8fbe1",
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "center"
  },
  headerImageImg:{
    height: 150,
    width: 405,
  },
  inputView: {
    backgroundColor: "#fff",
    borderWidth: 3,
    borderColor: "#EAEAEA",
    borderRadius: 5,
    width: "70%",
    height: 45,
    marginBottom: 20,
 
    alignItems: "center",
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
 
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
 
  loginBtn: {
    width: "80%",
    borderRadius: 5,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: "#FF8F1F",
  },
  loginText: {
    color: "#a31d20"
  },
  button: {
    borderRadius: 5,
    padding: 10,
    margin: 5,
    elevation: 2
  },
  buttonLogout: {
    backgroundColor: "#18093d",
  },
  buttonOpen: {
    backgroundColor: "#f194ff",
  },
  buttonClose: {
    backgroundColor: "#2196f3",
  },

  headerContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'space-between',
    height:80,
  },

  headerConfigButton:{
    marginRight:10
  },
  headerConfigButtonFake: {
    opacity:0.0,
    width:50,
  },
  headerImageImg:{
    height: 100,
    width: 270,
  },
  headerConfigButtonImg:{
    width:30,
    height:30
  },

  textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center"
  },

  menuConfigContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    flexDirection: 'column',
    alignSelf: 'flex-end',
    marginTop: 100,
    width: 160,
    height: 80,
    borderRadius: 5
  },
  itemMenu: {
    alignContent: 'space-between'
  }
});