import React, {Component} from 'react';
import {Text, View, StyleSheet, ActivityIndicator} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {transfer} from '../../redux/actions/transaction';
import {getUser} from '../../redux/actions/user';
import {showMessage} from '../../helpers/showMessage';

export class PinConfirm extends Component {
  state = {
    code: '',
    loading: false,
  };
  onSubmit = async () => {
    this.setState({loading: true});
    const {receiverId, amount, date, note} = this.props.transaction.data;
    await this.props.transfer(
      this.props.auth.token,
      receiverId,
      amount,
      date,
      note,
      this.state.code,
    );
    if (this.props.transaction.errorMsg === '') {
      this.setState({loading: false});
      this.props.navigation.replace('TransferResult');
      await this.props.getUser(this.props.auth.token);
    } else {
      this.setState({loading: false});
      showMessage(this.props.transaction.errorMsg);
    }
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
          <Text style={styles.bold}>Enter PIN to Transfer</Text>
          <Text style={styles.text}>
            Enter your 6 digits PIN for confirmation to continue transferring
            money.
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
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : (
          <Button
            text="Confirm"
            textColor={this.state.code.length === 6 ? 'white' : '#88888F'}
            color={this.state.code.length === 6 ? '#6379F4' : '#DADADA'}
            onPress={() => this.onSubmit()}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  text: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    color: '#7A7886',
    textAlign: 'center',
    marginVertical: 10,
  },
  row: {
    marginTop: 30,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cell: {
    borderWidth: 1,
    borderColor: 'rgba(169, 169, 169, 0.6)',
    borderRadius: 10,
  },
  focus: {
    borderColor: '#6379F4',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bold: {
    fontFamily: 'NunitoSans-Bold',
    color: '#4D4B57',
    fontSize: 22,
    marginVertical: 10,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  transfer,
  getUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinConfirm);
