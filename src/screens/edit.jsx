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

const noteColorOptions = ['red', 'blue', 'green'];

const Edit = ({ navigation, route, user }) => {
  // console.log('user Uid', user);
  const noteItem = route.params.item;
  const [title, setTitle] = useState(noteItem.title);
  const [description, setDescription] = useState(noteItem.description);
  const [noteColor, setNoteColor] = useState(noteItem.color);
  const [loading, setLoading] = useState(false);

  const onPressUpdate = async () => {
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
        <AntDesign name="edit" size={100} color="gray" />
        <Text>Update</Text>
      </View>
      <View>
        <Input
          placeholder="Title"
          onChangeText={(text) => setTitle(text)}
          value={title}
        />
        <Input
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          multiline={true}
          value={description}
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
              title="Update Note"
              customStyles={{
                alignSelf: 'center',
                marginTop: 30,
                width: '100%',
              }}
              onPress={onPressUpdate}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Edit;

const styles = StyleSheet.create({});
