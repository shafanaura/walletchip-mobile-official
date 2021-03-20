import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardDetailTrans from '../../components/CardDetailTrans';

export class DetailTransaction extends Component {
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
          <TouchableOpacity>
            <Text style={styles.textLink}>See all</Text>
          </TouchableOpacity>
        </View>
        <CardDetailTrans />
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
});

export default DetailTransaction;
