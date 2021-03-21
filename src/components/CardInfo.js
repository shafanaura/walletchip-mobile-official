import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CardInfo = props => {
  return (
    <View style={styles.wrapHeader}>
      <View style={styles.row}>
        {props.children}
        <View style={styles.descAvatar}>
          <Text style={styles.title}>{props.title}</Text>
          <Text style={styles.category}>{props.detail}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapHeader: {
    padding: 10,
    height: 80,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
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
    justifyContent: 'space-evenly',
    marginLeft: 10,
  },
  title: {
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
  },
  category: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 16,
    color: '#646464',
  },
});

export default CardInfo;
