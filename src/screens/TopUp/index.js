import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardInfo from '../../components/CardInfo';
import LayoutDetail from '../../components/LayoutDetail';
import listTopUp from '../../utils/listTopUp';

const CardTopUp = props => {
  return (
    <View style={styles.wrapHeader}>
      <View style={styles.row}>
        <Text style={styles.number}>{props.number}</Text>
        <Text style={styles.step}>{props.step}</Text>
      </View>
    </View>
  );
};

export class TopUp extends Component {
  render() {
    return (
      <View style={styles.container}>
        <CardInfo title="Virtual Account Number" detail="2389 081393877946">
          <TouchableOpacity style={styles.btn}>
            <Icon name="plus" size={28} color="#6379F4" />
          </TouchableOpacity>
        </CardInfo>
        <Text style={styles.desc}>
          We provide you virtual account number for top up via nearest ATM.
        </Text>
        <LayoutDetail desc="How to Top-Up">
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={listTopUp}
            renderItem={({item}) => (
              <CardTopUp number={item.id} step={item.text} />
            )}
          />
        </LayoutDetail>
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
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEEF2',
    padding: 10,
    borderRadius: 10,
  },
  desc: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    color: '#7A7886',
    textAlign: 'center',
    marginVertical: 10,
  },
  wrapHeader: {
    padding: 10,
    height: 80,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
  number: {
    fontFamily: 'NunitoSans-Bold',
    color: '#6379F4',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 10,
  },
  step: {
    color: '#7A7886',
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    marginLeft: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default TopUp;
