import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardContact from '../../components/CardContact';
import listTransaction from '../../utils/listTransaction';

export class DetailTransaction extends Component {
  gotoHistory() {
    this.props.navigation.navigate('TransactionHistory');
  }
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
            <View style={styles.cardContent}>
              <Icon name="arrow-down" size={28} color="#1EC15F" />
              <Text style={styles.textDesc}>Income</Text>
              <Text style={styles.textTotal}>Rp2.120.000</Text>
            </View>
            <View style={styles.cardContent}>
              <Icon name="arrow-up" size={28} color="#FF5B37" />
              <Text style={styles.textDesc}>Expense</Text>
              <Text style={styles.textTotal}>Rp1.450.000</Text>
            </View>
          </View>
        </View>
        <View style={styles.rowCard}>
          <Text style={styles.textBold}>Transaction History</Text>
          <TouchableOpacity onPress={() => this.gotoHistory()}>
            <Text style={styles.textLink}>See all</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          style={{minHeight: 400, maxHeight: 400}}
          inverted={true}
          data={listTransaction}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <CardContact
                picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                detail="Transfer">
                <Text
                  style={[
                    styles.total,
                    item.userAs === 'sender'
                      ? styles.textDanger
                      : styles.textPrimary,
                  ]}>
                  {item.userAs === 'sender' ? '-' : '+'}Rp
                  {this.onChangeRupiah(item.total)}
                </Text>
              </CardContact>
            );
          }}
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
  card: {
    padding: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: '#6379F4',
    height: 130,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textTotal: {
    fontSize: 18,
    fontFamily: 'NunitoSans-SemiBold',
    color: 'white',
  },
  cardContent: {
    justifyContent: 'space-between',
    flex: 1,
  },
  textDesc: {
    fontFamily: 'NunitoSans-Regular',
    color: '#D0D0D0',
    marginVertical: 5,
  },
  textBold: {
    fontFamily: 'NunitoSans-Bold',
    color: '#514F5B',
    fontSize: 18,
  },
  textLink: {
    fontFamily: 'NunitoSans-SemiBold',
    color: '#6379F4',
  },
  rowCard: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textDanger: {
    color: '#FF5B37',
  },
  textPrimary: {
    color: '#1EC15F',
  },
  total: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 16,
  },
});

export default DetailTransaction;
