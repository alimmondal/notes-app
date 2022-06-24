import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Input from '../components/input';
import { SafeAreaView } from 'react-native-safe-area-context';
import RadioInput from '../components/RadioInput';
import Button from '../components/button';
import { AntDesign } from '@expo/vector-icons';
import Text from '../components/text/text';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../App';
import { showMessage } from 'react-native-flash-message';

const noteColorOptions = ['orange', 'blue', 'green'];

const Create = ({ navigation, route, user }) => {
  // console.log('user Uid', user);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [noteColor, setNoteColor] = useState('blue');
  const [loading, setLoading] = useState(false);

  const onPressCreate = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, 'notes'), {
        title: title,
        description: description,
        color: noteColor,
        uid: user.uid,
      });
      setLoading(false);
      showMessage({
        message: 'Note has been created successfully',
        type: 'success',
      });
      navigation.goBack();
    } catch (error) {
      console.log('noteError --->', error);
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ marginHorizontal: 20, flex: 1 }}>
      <View
        style={{
          marginVertical: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AntDesign name="pluscircleo" size={100} color="lightgray" />
        <Text style={{ color: 'gray', fontWeight: 'bold' }}>Create</Text>
      </View>
      <View>
        <Input placeholder="Title" onChangeText={(text) => setTitle(text)} />
        <Input
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
        />
        <View style={{ marginTop: 10 }}>
          <Text style={{ marginBottom: 20 }}>Select your note color</Text>
          {noteColorOptions.map((option, index) => (
            <RadioInput
              key={index}
              label={option}
              value={noteColor}
              setValue={setNoteColor}
            />
          ))}
        </View>

        <View>
          {loading ? (
            <ActivityIndicator color="red" size="large" />
          ) : (
            <Button
              title="Create Note"
              customStyles={{
                alignSelf: 'center',
                marginTop: 30,
                width: '100%',
              }}
              onPress={onPressCreate}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({});
