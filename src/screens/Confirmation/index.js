import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Button from '../../components/Button';
import CardContact from '../../components/CardContact';
import CardDetailTrans from '../../components/CardDetailTrans';
import LayoutDetail from '../../components/LayoutDetail';

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
    return (
      <ScrollView style={styles.container}>
        <LayoutDetail desc="Transfer To">
          <CardContact
            picture="https://pyxis.nymag.com/v1/imgs/9c2/109/b1abeb4d0264c4d40d03ece07e540c1ba4-09-hailee-steinfeld.rsocial.w1200.jpg"
            firstName="Hailee"
            lastName="Stainfeld"
            detail="08565465884"
          />
        </LayoutDetail>
        <LayoutDetail desc="Details">
          <CardDetailTrans
            title="Amount"
            detail={`Rp${this.onChangeRupiah(14500000)}`}
          />
          <CardDetailTrans
            title="Balance Left"
            detail={`Rp${this.onChangeRupiah(22500)}`}
          />
          <CardDetailTrans title="Date & Time" detail="May 11, 2020 - 12.20" />
          <CardDetailTrans title="Notes" detail="For buying some socks" />
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

export default Confirmation;
