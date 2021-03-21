import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const LayoutDetail = props => {
  return (
    <View>
      <Text style={styles.text}>{props.desc}</Text>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    marginVertical: 10,
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
    color: '#514F5B',
  },
});

export default LayoutDetail;
