import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useFonts } from 'expo-font';
import Text from './src/components/text/text';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FlashMessage from 'react-native-flash-message';
import Home from './src/screens/home';
import Signin from './src/screens/signin';
import SignUp from './src/screens/signup';
import Edit from './src/screens/edit';
import Create from './src/screens/create';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAX7YmHa-h3WY4XRoHmzzBZhpyodMSJWjw',
  authDomain: 'aac-note-app-4575f.firebaseapp.com',
  projectId: 'aac-note-app-4575f',
  storageBucket: 'aac-note-app-4575f.appspot.com',
  messagingSenderId: '652321900144',
  appId: '1:652321900144:web:52eaea0c9c14a6f70bd6b5',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#fff',
  },
};

const Stack = createNativeStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   signOut(auth);
  // });

  useEffect(() => {
    const authSubscription = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return authSubscription;
  }, []);

  const [loaded] = useFonts({
    'Antonio-Medium': require('./assets/fonts/Antonio-Medium.ttf'),
    'LeagueSpartan-Bold': require('./assets/fonts/LeagueSpartan-Bold.ttf'),
    'LeagueSpartan-Regular': require('./assets/fonts/LeagueSpartan-Regular.ttf'),
  });

  if (!loaded) {
    return <Text>Font is loading...</Text>;
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer theme={AppTheme}>
        <Stack.Navigator>
          {user ? (
            <>
              <Stack.Screen name="Home" options={{ headerShown: false }}>
                {(props) => <Home {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Create">
                {(props) => <Create {...props} user={user} />}
              </Stack.Screen>
              <Stack.Screen name="Edit" component={Edit} />
            </>
          ) : (
            <>
              <Stack.Screen
                name="Signin"
                component={Signin}
                options={{ headerShown: false }}
              />
              <Stack.Screen name="SignUp" component={SignUp} />
            </>
          )}
        </Stack.Navigator>
        {/* GLOBAL FLASH MESSAGE COMPONENT INSTANCE */}
        <FlashMessage position="top" />
      </NavigationContainer>
      <StatusBar style="light" />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
