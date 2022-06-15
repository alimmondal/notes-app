import {
  ActivityIndicator,
  ActivityIndicatorBase,
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Text from '../components/text/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../themes/colors';
import Button from '../components/button';
import Input from '../components/input';
import { auth, db } from '../../App';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { showMessage } from 'react-native-flash-message';

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const navigationToSignup = () => {
  //   navigation.navigate('SignUp');
  // };

  const login = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log('signin successfully', res);
      })
      .catch((err) => {
        console.log('error in login', err);
        showMessage({
          message: 'ERROR! Email & password do not match',
          type: 'danger',
        });
      });
  };

  //google Login
  // const googleLogin = () => {
  //   var provider = new GoogleAuthProvider();

  //   signInWithPopup(auth, provider)
  //     .then((res) => {
  //       const { displayName, photoURL, email } = res.user;
  //       const signedInUser = {
  //         isSignedIn: true,
  //         name: displayName,
  //         email: email,
  //         photo: photoURL,
  //       };
  //       setUser(signedInUser);
  //       setLoggedInUser(signedInUser);
  //       history.replace(from);
  //       console.log(displayName, photoURL, email);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       console.log(err.message);
  //     });
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require('../../assets/img/emptyState.png')}
        style={{ alignSelf: 'center', height: 300, width: '100%' }}
      />
      <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
        Never forget your notes
      </Text>

      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email address"
          onChangeText={(text) => setEmail(text)}
          autoCapitalize="none"
        />
        <Input
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />

        {error && <Text style={{ color: 'red', marginTop: 10 }}>{error}</Text>}

        {loading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <Button
            title="Login"
            onPress={login}
            customStyles={{ alignSelf: 'center', marginBottom: 60 }}
          />
        )}

        {/* <View style={{ alignSelf: 'center' }}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <TouchableOpacity style={styles.button} onPress={googleLogin}>
              <Text style={styles.title}>Sign in with Google</Text>
            </TouchableOpacity>
          )}
        </View> */}
      </View>
      <View>
        <Pressable
          onPress={() => {
            navigation.navigate('SignUp');
          }}
        >
          <Text style={{ textAlign: 'center' }}>
            Don't have an account?{' '}
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Sign up</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default Signin;

const styles = StyleSheet.create({
  button: {
    // flex: 1,
    borderRadius: 30,
    width: 265,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.white,
    backgroundColor: colors.darkOrange,
  },
});
