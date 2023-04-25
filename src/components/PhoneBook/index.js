import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import PhoneBookItem from '../../components/PhoneBookItem';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {API, Auth} from 'aws-amplify';
import SearchBar from '../../components/SearchBar';
import Colors from "../../constants/Colors";

const PhoneBook = ({inModal, modalClose}) => {
  const [data, setData] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    loadContacts().then(data => {
      setData(data);
    });
  }, []);

  const loadContacts = async () => {
    // const currentUser = await Auth.currentAuthenticatedUser();

  };

  return (
    <View style={styles.container}>
        <View style={styles.modalTop}>
            <TouchableOpacity onPress={modalClose} style={styles.closeButton}>
                <Text style={styles.cancelButton}>
                    Cancel
                </Text>
            </TouchableOpacity>
        </View>
      <SearchBar />
      <FlatList
        data={data}
        renderItem={({item}) => (
          <PhoneBookItem
            item={item}
            onPress={() => {
              if (inModal) {
                modalClose();
              }
              navigation.navigate('NewTipoff', {contact: item});
            }}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    height: '100%',
    backgroundColor: '#ffffff',
  },
    cancelButton:{
        paddingTop: 25,
        margin: 5,
        fontSize: 17,
        color: Colors.light.tint,
    },
    // modalTop:{
    //     height: 100,
    //     backgroundColor: 'white',
    // },
});

export default PhoneBook;
