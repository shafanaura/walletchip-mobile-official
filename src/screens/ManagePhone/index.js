import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Components

const ManagePhone = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Text style={styles.subtitle}>
        You can only delete the phone number and then you must add another phone
        number.
      </Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={{
            width: '90%',
          }}>
          <Text style={styles.btnTitle}>Primary</Text>
          <Text style={styles.btnPhone}>+62-813-9387-7946</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: '10%',
          }}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../../assets/icons/trash.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ManagePhone;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
  subtitle: {
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 16,
    lineHeight: 25,
  },
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnTitle: {
    color: 'gray',
    fontFamily: 'NunitoSans-SemiBold',
    marginBottom: 8,
    fontSize: 15,
  },
  btnPhone: {
    fontFamily: 'NunitoSans-Bold',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
