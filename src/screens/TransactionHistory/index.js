import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardDetailTrans from '../../components/CardDetailTrans';
import DateTimePicker from '@react-native-community/datetimepicker';

export class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      show: false,
      value: '',
    };
  }
  render() {
    const {date, show} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.desc}>This Week</Text>
        <CardDetailTrans />
        <View style={styles.footer}>
          <TouchableOpacity style={styles.btnFilter}>
            <Icon name="arrow-up" color="#FF5B37" size={26} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnFilter}>
            <Icon name="arrow-down" color="#1EC15F" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnFilter, styles.btnFlex]}
            onPress={() =>
              this.setState({
                show: !show,
              })
            }>
            <Text style={styles.btnText}>Filter by Date</Text>
          </TouchableOpacity>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              // onChange={this.onChangeDate}
            />
          )}
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
  desc: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    color: '#7A7886',
    paddingBottom: 20,
  },
  btnFilter: {
    backgroundColor: 'white',
    elevation: 3,
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
  },
  footer: {
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  btnFlex: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
  },
  btnText: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
    color: '#6379F4',
    paddingHorizontal: 30,
  },
});

export default TransactionHistory;
