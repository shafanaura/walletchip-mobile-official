import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

const CardContact = props => {
  return (
    <View style={styles.wrapHeader}>
      <Image source={{uri: props.picture}} style={styles.avatar} />
      <View style={styles.descAvatar}>
        <Text style={styles.textName}>{props.name}</Text>
        <Text style={styles.category}>{props.detail}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapHeader: {
    padding: 10,
    height: 80,
    backgroundColor: 'white',
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
  descAvatar: {
    marginLeft: 10,
  },
  textName: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 18,
    marginBottom: 3,
  },
  category: {
    fontFamily: 'NunitoSans-Regular',
    color: '#646464',
    marginTop: 3,
  },
});

export default CardContact;
