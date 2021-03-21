import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const CardContact = props => {
  return (
    <TouchableOpacity style={styles.wrapHeader}>
      <View style={styles.row}>
        <Image source={{uri: props.picture}} style={styles.avatar} />
        <View style={styles.descAvatar}>
          <Text style={styles.textName}>
            {props.firstName} {props.lastName}
          </Text>
          <Text style={styles.category}>{props.detail}</Text>
        </View>
      </View>
      {props.children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrapHeader: {
    padding: 10,
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
  descAvatar: {
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  textName: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 16,
  },
  category: {
    fontFamily: 'NunitoSans-Regular',
    color: '#646464',
  },
  total: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  textDanger: {
    color: '#FF5B37',
  },
  textPrimary: {
    color: '#1EC15F',
  },
});

export default CardContact;
