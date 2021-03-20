import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export class HomePage extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cardBalance}>
          <Text style={styles.desc}>Balance</Text>
          <Text style={styles.balance}>Rp120.000</Text>
          <Text style={styles.desc}>+62 813-9387-7946</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  cardBalance: {
    padding: 20,
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
});

export default HomePage;
