import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

export default class ChangePin extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            Enter your current 6 digits Zwallet PIN below to continue to the
            next steps.
          </Text>
        </View>
        <View style={styles.row}>
          <SmoothPinCodeInput
            codeLength={6}
            cellStyle={styles.cell}
            cellStyleFocused={styles.focus}
            value={this.state.code}
            onTextChange={code => this.setState({code})}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 178,
  },
  cell: {
    borderWidth: 1,
    borderColor: 'rgba(169, 169, 169, 0.6)',
    borderRadius: 10,
  },
  focus: {
    borderColor: '#6379F4',
  },
});
