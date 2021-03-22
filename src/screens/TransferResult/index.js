import React, {Component} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Status from '../../assets/image/success.png';
import Button from '../../components/Button';
import CardContact from '../../components/CardContact';
import CardDetailTrans from '../../components/CardDetailTrans';
import LayoutDetail from '../../components/LayoutDetail';

export class TicketResult extends Component {
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  goHome = () => {
    this.props.navigation.navigate('HomePage');
  };
  render() {
    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.center}>
          <Image source={Status} style={styles.img} />
          <Text style={styles.status}>Transfer Success</Text>
        </View>
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
        </LayoutDetail>
        <LayoutDetail desc="Transfer to">
          <CardContact
            picture="https://pyxis.nymag.com/v1/imgs/9c2/109/b1abeb4d0264c4d40d03ece07e540c1ba4-09-hailee-steinfeld.rsocial.w1200.jpg"
            firstName="Hailee"
            lastName="Stainfeld"
            detail="08565465884"
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
export default TicketResult;
