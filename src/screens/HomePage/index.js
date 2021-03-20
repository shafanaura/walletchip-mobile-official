import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import CardDetailTrans from '../../components/CardDetailTrans';

const ButtonTrans = props => {
  return (
    <TouchableOpacity style={styles.btn} {...props}>
      <Icon name={props.icon} size={28} color="#6379F4" />
      <Text style={styles.descBtn}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export class HomePage extends Component {
  gotoDetail = () => {
    this.props.navigation.navigate('DetailTransaction');
  };
  gotoReceiver = () => {
    this.props.navigation.navigate('SearchReceiver');
  };
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardBalance} onPress={this.gotoDetail}>
          <Text style={styles.desc}>Balance</Text>
          <Text style={styles.balance}>Rp120.000</Text>
          <Text style={styles.desc}>+62 813-9387-7946</Text>
        </TouchableOpacity>
        <View style={styles.rowBtn}>
          <ButtonTrans
            icon="arrow-up"
            title="Transfer"
            onPress={this.gotoReceiver}
          />
          <ButtonTrans icon="plus" title="Top Up" />
        </View>
        <View style={styles.wrapCard}>
          <View style={styles.row}>
            <Text style={styles.textBold}>Transaction History</Text>
            <TouchableOpacity>
              <Text style={styles.textLink}>See all</Text>
            </TouchableOpacity>
          </View>
          <CardDetailTrans />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  cardBalance: {
    padding: 20,
    margin: 10,
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: '#6379F4',
    height: 130,
  },
  balance: {
    fontFamily: 'NunitoSans-Bold',
    color: 'white',
    fontSize: 24,
  },
  desc: {
    fontFamily: 'NunitoSans-SemiBold',
    color: '#D0D0D0',
  },
  btn: {
    height: 57,
    backgroundColor: '#E5E8ED',
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-around',
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
  },
  rowBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  row: {
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  descBtn: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
    color: '#514F5B',
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
  wrapCard: {
    padding: 10,
  },
});

export default HomePage;
