import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/Button';
import CardContact from '../../components/CardContact';
import CardDetailTrans from '../../components/CardDetailTrans';
import LayoutDetail from '../../components/LayoutDetail';
import {connect} from 'react-redux';
import {getContact, getUser} from '../../redux/actions/user';
import {
  getReceiverData,
  createTransferData,
} from '../../redux/actions/transaction';
import moment from 'moment';

export class Confirmation extends Component {
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  gotoEnterPin = () => {
    this.props.navigation.navigate('PinConfirm');
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
        <LayoutDetail desc="Transfer To">
          <CardContact
            picture={picture}
            firstName={first_name === null ? username : first_name}
            lastName={last_name !== null && last_name}
            detail={phone ? `+62 ${phone}` : 'No phone number'}
          />
        </LayoutDetail>
        <LayoutDetail desc="Details">
          <CardDetailTrans
            title="Amount"
            detail={`Rp${this.onChangeRupiah(amount)}`}
          />
          <CardDetailTrans
            title="Balance Left"
            detail={`Rp${this.onChangeRupiah(balance - amount)}`}
          />
          <CardDetailTrans
            title="Date & Time"
            detail={moment(date).format('MMM D, YYYY HH:mm')}
          />
          <CardDetailTrans title="Notes" detail={note} />
          <View style={styles.gap}>
            <Button
              onPress={this.gotoEnterPin}
              text="Continue"
              color="#6379F4"
              textColor="white"
            />
          </View>
        </LayoutDetail>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
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
};

export default connect(mapStateToProps, mapDispatchToProps)(Confirmation);
