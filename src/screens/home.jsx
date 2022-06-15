import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import Text from '../components/text/text';
import Button from '../components/button';
import { auth, db } from '../../App';
import { getAuth, signOut } from 'firebase/auth';
import { AntDesign } from '@expo/vector-icons';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

const Home = ({ user, route, navigation }) => {
  const [notes, setNotes] = React.useState([]);
  // console.log('home user--->', user);

  useEffect(() => {
    //create the query
    const q = query(collection(db, 'notes'), where('uid', '==', user.uid));
    //create listener to listen to the query which we just made above.
    const notesListenerSubscription = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setNotes(list);
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
          navigation.navigate('Edit', { item });
        }}
      >
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 30,
          }}
        >
          <Text>My Notes</Text>
          <Pressable
            onPress={() => {
              navigation.navigate('Create');
            }}
          >
            <AntDesign name="pluscircleo" size={24} color="black" />
          </Pressable>
        </View>
        <FlatList
          data={notes}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          contentContainerStyle={{ padding: 20 }}
        />

        <View style={styles.logoutBtn}>
          <Button
            title="logout"
            customStyles={{ alignSelf: 'center', marginBottom: 60 }}
            onPress={logout}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  logoutBtn: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
});
