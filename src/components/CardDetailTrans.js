import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const CardDetailTrans = props => {
  return (
    <View style={styles.wrapHeader}>
      <Text style={styles.title}>{props.title}</Text>
      <Text style={styles.category}>{props.detail}</Text>
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
    justifyContent: 'space-around',
  },
  title: {
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
  },
  category: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
    color: '#514F5B',
  },
});

export default CardDetailTrans;
