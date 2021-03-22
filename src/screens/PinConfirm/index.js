import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';
import Button from '../../components/Button';
import {connect} from 'react-redux';
import {
  getContact,
  getUser,
  getReceiverData,
  createTransferData,
  createTransfer,
  transferData,
} from '../../redux/actions/user';
export class PinConfirm extends Component {
  state = {
    code: '',
  };
  componentDidMount() {
    this.props.createTransferData({
      receiverId: this.props.user.transferData.receiverId,
    });
  }
  onSubmit = () => {
    this.props.navigation.navigate('TransferResult');
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
        <Button
          text="Confirm"
          textColor={this.state.code.length === 6 ? 'white' : '#88888F'}
          color={this.state.code.length === 6 ? '#6379F4' : '#DADADA'}
          onPress={() => this.onSubmit()}
        />
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
});

const mapDispatchToProps = {
  getContact,
  getUser,
  getReceiverData,
  createTransferData,
  createTransfer,
  transferData,
};

export default connect(mapStateToProps, mapDispatchToProps)(PinConfirm);
