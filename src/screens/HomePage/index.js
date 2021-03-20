import React, {Component} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ButtonTrans = props => {
  return (
    <TouchableOpacity style={styles.btn}>
      <Icon name={props.icon} size={28} color="#6379F4" />
      <Text style={styles.descBtn}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardBalance}>
          <Text style={styles.desc}>Balance</Text>
          <Text style={styles.balance}>Rp120.000</Text>
          <Text style={styles.desc}>+62 813-9387-7946</Text>
        </View>
        <View style={styles.row}>
          <ButtonTrans icon="arrow-up" title="Transfer" />
          <ButtonTrans icon="plus" title="Top Up" />
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
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  descBtn: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
    color: '#514F5B',
  },
});

export default HomePage;
