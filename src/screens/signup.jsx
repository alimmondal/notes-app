import {
  Pressable,
  StyleSheet,
  View,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import Text from '../components/text/text';
import { SafeAreaView } from 'react-native-safe-area-context';
import { auth, db } from '../../App';
import Button from '../components/button';
import Input from '../components/input';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { showMessage } from 'react-native-flash-message';
import RadioInput from '../components/RadioInput';

const OPTIONS = ['male', 'female'];

const SignUp = ({ navigation }) => {
  const [gender, setGender] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  // create user with email and password
  const signup = async () => {
    setLoading(true);
    try {
      // 1. create user with email and password
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log('result--->', result);

      // 2. add user profile to database
      await addDoc(collection(db, 'users'), {
        name: name,
        email: email,
        age: age,
        gender: gender,
        uid: result.user.uid,
      });

      setLoading(false);
    } catch (error) {
      console.log('error--->', error);
      showMessage({
        message: 'ERROR! You have an account with this email',
        type: 'danger',
      });
      setLoading(false);
    }
  };

  // const signin = () => {
  //   navigation.navigate('Signin');
  // };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Image
        source={require('../../assets/img/signUp.png')}
        style={{ alignSelf: 'center', height: 200, width: '100%' }}
        resizeMode="contain"
      />
      <View style={{ paddingHorizontal: 16, paddingVertical: 25 }}>
        <Input
          placeholder="Email address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Full Name"
          autoCapitalize="words"
          onChangeText={(text) => setName(text)}
        />
        <Input placeholder="Age" onChangeText={(text) => setAge(text)} />

        <View>
          <Text style={{ marginBottom: 20 }}>Select gender</Text>
          {OPTIONS.map((option, index) => (
            <RadioInput
              key={index}
              label={option}
              value={gender}
              setValue={setGender}
            />
          ))}
        </View>

        {loading ? (
          <ActivityIndicator color="blue" size="large" />
        ) : (
          <>
            <Button
              title="Sign up"
              customStyles={{ alignSelf: 'center', marginBottom: 60 }}
              onPress={signup}
            />
          </>
        )}
        <Pressable
          onPress={() => {
            navigation.navigate('Signin');
          }}
        >
          <Text style={{ justifyContent: 'center', alignSelf: 'center' }}>
            Already have an account?{' '}
            <Text style={{ color: 'green', fontWeight: 'bold' }}>Signin</Text>
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
});
