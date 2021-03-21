import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

export default function Button({
  onPress,
  text,
  color,
  textColor,
  disabled,
  style,
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View style={[styles.button(color), style]}>
        <Text style={styles.textButton(textColor)}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: color => ({
    paddingVertical: 16,
    backgroundColor: color,
    borderRadius: 12,
  }),
  textButton: textColor => ({
    fontSize: 18,
    fontFamily: 'NunitoSans-ExtraBold',
    color: textColor,
    textAlign: 'center',
  }),
});
