import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardContact from '../../components/CardContact';
import {connect} from 'react-redux';
import {
  transactionHistory,
  pagingGetTransaction,
} from '../../redux/actions/transaction';

export class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      show: false,
      value: '',
    };
  }
  async componentDidMount() {
    await this.props.transactionHistory(this.props.auth.token);
  }
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  next = async () => {
    if (
      this.props.transaction.pageInfoTransaction.currentPage <
      this.props.transaction.pageInfoTransaction.totalPage
    ) {
      await this.props.pagingGetTransaction(
        this.props.auth.token,
        this.props.transaction.pageInfoTransaction.currentPage + 1,
      );
    }
  };
  render() {
    const {date, show} = this.state;
    const {allTransaction} = this.props.transaction;
    return (
      <View style={styles.container}>
        <Text style={styles.desc}>Today</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={allTransaction}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <CardContact
                picture={item.picture}
                firstName={item.another_user}
                detail="Transfer">
                <Text
                  style={[
                    styles.total,
                    item.did_user_transfer === 1
                      ? styles.textDanger
                      : styles.textPrimary,
                  ]}>
                  {item.did_user_transfer === 1 ? '-' : '+'}Rp
                  {this.onChangeRupiah(item.amount)}
                </Text>
              </CardContact>
            );
          }}
          onEndReached={this.next}
          onEndReachedThreshold={0.5}
        />
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

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transaction: state.transaction,
});

const mapDispatchToProps = {transactionHistory, pagingGetTransaction};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
