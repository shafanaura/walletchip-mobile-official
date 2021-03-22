import React, {Component} from 'react';
import {Text, StyleSheet, View, ActivityIndicator} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import {connect} from 'react-redux';
import {updatePin, comparePin} from '../../redux/actions/user';
import {showMessage} from '../../helpers/showMessage';

import Button from '../../components/Button';

class ChangePin extends Component {
  state = {
    code: '',
    confirmPin: false,
    loading: false,
  };
  onSubmit = async () => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    const {id} = this.props.user.results;
    await this.props.comparePin(token, this.state.code, id);
    if (this.props.user.errorMsg === '') {
      showMessage(this.props.user.message, 'success');
      this.setState({confirmPin: true, code: '', loading: false});
    } else {
      this.setState({loading: false});
      showMessage(this.props.user.errorMsg);
    }
  };
  verifyPin = async () => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    await this.props.updatePin(token, this.state.code);
    if (this.props.user.errorMsg === '') {
      this.setState({loading: false});
      showMessage(this.props.user.message, 'success');
      this.props.navigation.navigate('Profile');
    } else {
      this.setState({loading: false});
      showMessage(this.props.user.errorMsg);
    }
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
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : this.state.confirmPin ? (
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

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {comparePin, updatePin};

export default connect(mapStateToProps, mapDispatchToProps)(ChangePin);

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
