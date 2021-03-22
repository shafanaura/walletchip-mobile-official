import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

import Button from '../../components/Button';

export default class ChangePin extends Component {
  state = {
    code: '',
    confirmPin: false,
  };
  onSubmit = () => {
    this.setState({confirmPin: true, code: ''});
  };
  verifyPin = () => {
    console.log(this.state.code);
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.text}>
            {this.state.confirmPin
              ? 'Type your new 6 digits security PIN to use in Walletchip.'
              : 'Enter your current 6 digits Walletchip PIN below to continue to the next steps.'}
          </Text>
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
        {this.state.confirmPin ? (
          <Button
            onPress={() => this.verifyPin()}
            disabled={this.state.code.length < 6}
            textColor={this.state.code.length === 6 ? 'white' : '#88888F'}
            color={this.state.code.length === 6 ? '#6379F4' : '#DADADA'}
            text="Change Pin"
          />
        ) : (
          <Button
            onPress={() => this.onSubmit()}
            disabled={this.state.code.length < 6}
            textColor={this.state.code.length === 6 ? 'white' : '#88888F'}
            color={this.state.code.length === 6 ? '#6379F4' : '#DADADA'}
            text="Continue"
          />
        )}
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
  text: {
    fontSize: 15,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
    marginBottom: 40,
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
