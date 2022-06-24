import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Text from '../components/text/text';
import Button from '../components/button';
import { auth, db } from '../../App';
import { signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';

const Home = ({ user, navigation }) => {
  const [notes, setNotes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  // console.log('home notes--->', notes);
  const onPressCreate = () => {
    navigation.navigate('Create');
  };
  useEffect(() => {
    //create the query
    const q = query(collection(db, 'notes'), where('uid', '==', user.uid));
    //create listener to listen to the query which we just made above.
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setNotes(list);
      setLoading(false);
    });

    return notesListenerSubscription;
  }, []);

  // console.log('NOTEs--->', notes);

  const renderItem = ({ item }) => {
    const { title, description, color } = item;
    return (
      <Pressable
        style={{
          backgroundColor: color,
          marginBottom: 25,
          borderRadius: 16,
          padding: 15,
        }}
        onPress={() => {
          navigation.navigate('Update', { item });
        }}
      >
        <Pressable
          style={{
            position: 'absolute',
            alignSelf: 'flex-end',
            padding: 10,
            zIndex: 4,
          }}
          onPress={() => {
            deleteDoc(doc(db, 'notes', item.id));
          }}
        >
          <AntDesign name="delete" size={24} color="red" />
        </Pressable>
        <View>
          <Text style={{ color: 'white', fontSize: 24 }}>{title}</Text>
          <Text style={{ color: 'white', fontSize: 18, marginTop: 16 }}>
            {description}
          </Text>
        </View>
      </Pressable>
    );
  };

  const logout = () => {
    signOut(auth);
    console.log('first');
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <ActivityIndicator color="blue" size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 25,
        }}
      >
        <Text style={{ fontSize: 24 }}>My Notes</Text>
        <Pressable onPress={onPressCreate}>
          <AntDesign name="pluscircleo" size={30} color="black" />
        </Pressable>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ padding: 20 }}
      />

      <Button
        title="Logout"
        customStyles={{ alignSelf: 'center', marginVertical: 12 }}
        onPress={logout}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'pink',
    // marginHorizontal: 20,
  },
  logoutBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
});
