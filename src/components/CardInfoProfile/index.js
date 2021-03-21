import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function CardInfoProfile({
  title,
  children,
  position = 'space-between',
  textColor = '#4D4B57',
  onPress,
}) {
  return (
    <TouchableOpacity style={styles.row(position)} onPress={onPress}>
      <Text style={styles.text(textColor)}>{title}</Text>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  row: position => ({
    flexDirection: 'row',
    justifyContent: position,
    alignItems: 'center',
    backgroundColor: 'white',
    elevation: 3,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 10,
  }),
  text: textColor => ({
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    color: textColor,
  }),
});
