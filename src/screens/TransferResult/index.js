import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import Status from '../../assets/image/success.png';
import Button from '../../components/Button';
import CardContact from '../../components/CardContact';
import CardDetailTrans from '../../components/CardDetailTrans';
import LayoutDetail from '../../components/LayoutDetail';
import {getContact, getUser} from '../../redux/actions/user';
import {
  getReceiverData,
  createTransferData,
} from '../../redux/actions/transaction';
import moment from 'moment';
import {transactionToday} from '../../redux/actions/transaction';

export class TransferResult extends Component {
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  goHome = () => {
    this.props.navigation.replace('HomePage');
  };
  render() {
    const {
      picture,
      first_name,
      last_name,
      username,
      phone,
    } = this.props.transaction.receiverData;
    const {balance} = this.props.user.results;
    const {amount, note, date} = this.props.transaction.data;
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <Image source={Status} style={styles.img} />
          <Text style={styles.status}>Transfer Success</Text>
        </View>
        <LayoutDetail desc="Details">
          <CardDetailTrans
            title="Amount"
            detail={`Rp${this.onChangeRupiah(amount)}`}
          />
          <CardDetailTrans
            title="Balance Left"
            detail={`Rp${this.onChangeRupiah(balance)}`}
          />
          <CardDetailTrans
            title="Date & Time"
            detail={moment(date).format('MMM D, YYYY HH:mm')}
          />
          <CardDetailTrans title="Notes" detail={note} />
        </LayoutDetail>
        <LayoutDetail desc="Transfer to">
          <CardContact
            picture={picture}
            firstName={first_name === null ? username : first_name}
            lastName={last_name !== null && last_name}
            detail={phone ? `+62 ${phone}` : 'No phone number'}
          />
        </LayoutDetail>
        <View style={styles.gap}>
          <Button
            onPress={this.goHome}
            text="Back to Home"
            color="#6379F4"
            textColor="white"
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  status: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#4D4B57',
    paddingBottom: 20,
  },
  img: {
    height: 60,
    width: 60,
    resizeMode: 'cover',
    marginVertical: 20,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  gap: {
    marginVertical: 20,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  getContact,
  getUser,
  getReceiverData,
  createTransferData,
  transactionToday,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransferResult);
