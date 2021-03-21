import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

export default function InputPersonal({
  label,
  keyboardType,
  placeholder,
  onChange,
  value,
  onBlur,
}) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        keyboardType={keyboardType}
        placeholder={placeholder}
        onChangeText={onChange}
        defaultValue={value}
        onBlur={onBlur}
        style={styles.input}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: 'white',
    elevation: 1,
    padding: 15,
    paddingBottom: 5,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
  },
  input: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
    color: '#514F5B',
  },
});
