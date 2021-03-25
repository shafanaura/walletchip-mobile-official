import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
// import {TouchableOpacity} from 'react-native-gesture-handler';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import CardContact from '../../components/CardContact';
import {connect} from 'react-redux';
import {
  transactionToday,
  pagingGetTransactionToday,
  transactionWeek,
  pagingGetTransactionWeek,
  transactionMonth,
  pagingGetTransactionMonth,
} from '../../redux/actions/transaction';
import Button from '../../components/Button';
import http from '../../helpers/http';

export class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      show: false,
      value: '',
      modalVisible: false,
      sortUp: false,
      showDateFromPicker: false,
      showDateToPicker: false,
      dateFromPicker: new Date(),
      dateToPicker: new Date(),
      dateFrom: false,
      dateTo: false,
      transactionsByDate: [],
    };
  }
  async componentDidMount() {
    await this.props.transactionToday(this.props.auth.token);
    this.props.transactionWeek(this.props.auth.token);
    this.props.transactionMonth(this.props.auth.token);
  }
  // async componentDidUpdate() {
  //   if (this.state.dateFromPicker && this.state.dateToPicker) {
  // try {
  //   const {data} = await http(this.props.auth.token).get(
  //     '/transaction-history',
  //     {
  //       from: moment(this.state.dateFromPicker).format('YYYY-MM-DD'),
  //       to: moment(this.state.dateToPicker).format('YYYY-MM-DD'),
  //     },
  //   );
  //   this.setState({
  //     transactionsByDate: data.results,
  //   });
  //   console.log('BY_DATE', transactionsByDate);
  // } catch (error) {
  //   console.log(error.response.data.message);
  // }
  //   }
  // }
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible, dateFrom: false, dateTo: false});
  };
  nextDay = async () => {
    if (
      this.props.transaction.pageInfoTransactionToday.currentPage <
      this.props.transaction.pageInfoTransactionToday.totalPage
    ) {
      await this.props.pagingGetTransactionToday(
        this.props.auth.token,
        this.props.transaction.pageInfoTransactionToday.currentPage + 1,
      );
    }
  };
  nextWeek = async () => {
    if (
      this.props.transaction.pageInfoTransactionWeek.currentPage <
      this.props.transaction.pageInfoTransactionWeek.totalPage
    ) {
      await this.props.pagingGetTransactionWeek(
        this.props.auth.token,
        this.props.transaction.pageInfoTransactionWeek.currentPage + 1,
      );
    }
  };
  nextMonth = async () => {
    if (
      this.props.transaction.pageInfoTransactionMonth.currentPage <
      this.props.transaction.pageInfoTransactionMonth.totalPage
    ) {
      await this.props.pagingGetTransactionMonth(
        this.props.auth.token,
        this.props.transaction.pageInfoTransactionMonth.currentPage + 1,
      );
    }
  };
  onChangeFrom = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.dateFromPicker;
    this.setState({showDateFromPicker: Platform.OS === 'ios'});
    this.setState({dateFrom: true, dateFromPicker: currentDate});
  };
  onChangeTo = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.dateToPicker;
    this.setState({showDateToPicker: Platform.OS === 'ios'});
    this.setState({dateTo: true, dateToPicker: currentDate});
  };
  filterByDate = async () => {
    this.setState({loading: true});
    try {
      const {data} = await http(this.props.auth.token).get(
        `/api/transaction-history?from=${moment(
          this.state.dateFromPicker,
        ).format('YYYY-MM-DD')}&to=${moment(this.state.dateToPicker).format(
          'YYYY-MM-DD',
        )}`,
      );
      this.setState({
        loading: false,
        transactionsByDate: data.results,
      });
      this.setModalVisible(false);
      console.log('BY_DATE', this.state.transactionsByDate);
    } catch (error) {
      this.setState({loading: false});
      console.log(error.response.data.message);
    }
  };
  render() {
    const {modalVisible} = this.state;
    const {date, show, sortUp} = this.state;
    const {
      todayTransaction,
      weekTransaction,
      monthTransaction,
    } = this.props.transaction;
    console.log(this.state.transactionsByDate);
    return (
      <View style={styles.container}>
        {/* Transaction Today */}
        {this.state.transactionsByDate.length > 0 ? (
          <FlatList
            // style={{height: 250, flexGrow: 0}}
            showsVerticalScrollIndicator={false}
            data={todayTransaction}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return sortUp === 'red'
                ? item.did_user_transfer === 1 && (
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
                  )
                : sortUp === 'green'
                ? item.did_user_transfer === 0 && (
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
                  )
                : sortUp === false && (
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
          />
        ) : (
          <>
            <Text style={styles.desc}>Today</Text>
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : todayTransaction !== undefined ? (
              <FlatList
                style={{height: 250, flexGrow: 0}}
                showsVerticalScrollIndicator={false}
                data={todayTransaction}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return sortUp === 'red'
                    ? item.did_user_transfer === 1 && (
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
                      )
                    : sortUp === 'green'
                    ? item.did_user_transfer === 0 && (
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
                      )
                    : sortUp === false && (
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
                onEndReached={this.nextDay}
                onEndReachedThreshold={0.5}
              />
            ) : (
              <Text style={styles.textMessage}>No transaction...</Text>
            )}
            {/* Transaction Week */}
            <Text style={styles.desc}>This Week</Text>
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : weekTransaction !== undefined ? (
              <FlatList
                style={{height: 250, flexGrow: 0}}
                showsVerticalScrollIndicator={false}
                data={weekTransaction}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return sortUp === 'red'
                    ? item.did_user_transfer === 1 && (
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
                      )
                    : sortUp === 'green'
                    ? item.did_user_transfer === 0 && (
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
                      )
                    : sortUp === false && (
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
                onEndReached={this.nextDay}
                onEndReachedThreshold={0.5}
              />
            ) : (
              <Text style={styles.textMessage}>No transaction...</Text>
            )}
            {/* Transaction Month */}
            <Text style={styles.desc}>This Month</Text>
            {this.state.loading ? (
              <ActivityIndicator size="large" color="#000000" />
            ) : monthTransaction !== undefined ? (
              <FlatList
                style={{height: 250, flexGrow: 0}}
                showsVerticalScrollIndicator={false}
                data={monthTransaction}
                keyExtractor={item => item.id}
                renderItem={({item}) => {
                  return sortUp === 'red'
                    ? item.did_user_transfer === 1 && (
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
                      )
                    : sortUp === 'green'
                    ? item.did_user_transfer === 0 && (
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
                      )
                    : sortUp === false && (
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
                onEndReached={this.nextDay}
                onEndReachedThreshold={0.5}
              />
            ) : (
              <Text style={styles.textMessage}>No transaction...</Text>
            )}
          </>
        )}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() => this.setState({sortUp: 'red'})}>
            <Icon name="arrow-up" color="#FF5B37" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnFilter}
            onPress={() => this.setState({sortUp: 'green'})}>
            <Icon name="arrow-down" color="#1EC15F" size={26} />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.btnFilter, styles.btnFlex]}
            onPress={() => this.setModalVisible(true)}>
            <Text style={styles.btnText}>Filter by Date</Text>
          </TouchableOpacity>
          {this.state.showDateFromPicker && (
            <DateTimePicker
              testID="dateFromPicker"
              value={this.state.dateFromPicker}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={this.onChangeFrom}
            />
          )}
          {this.state.showDateToPicker && (
            <DateTimePicker
              testID="dateToPicker"
              value={this.state.dateToPicker}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={this.onChangeTo}
            />
          )}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.contentModal}>
              <View style={styles.row}>
                <View style={styles.flex}>
                  <Text style={styles.descModal}>From</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({showDateFromPicker: true})}>
                    <Text style={styles.descDate}>
                      {this.state.dateFrom
                        ? moment(this.state.dateFromPicker).format('YYYY-MM-DD')
                        : 'Select a date'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.descModal}>To</Text>
                  <TouchableOpacity
                    onPress={() => this.setState({showDateToPicker: true})}>
                    <Text style={styles.descDate}>
                      {this.state.dateTo
                        ? moment(this.state.dateToPicker).format('YYYY-MM-DD')
                        : 'Select a date'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.btnSize}>
                  <Button
                    text="Cancel"
                    textColor="#4D4B57"
                    color="#E5E8ED"
                    onPress={() => this.setModalVisible(false)}
                  />
                </View>
                <View style={styles.gap}>
                  <Button
                    text="Apply"
                    disabled={
                      !this.state.dateFrom ||
                      !this.state.dateTo ||
                      this.state.loading
                    }
                    textColor={
                      !this.state.dateFrom ||
                      !this.state.dateTo ||
                      this.state.loading
                        ? '#88888F'
                        : 'white'
                    }
                    color={
                      !this.state.dateFrom ||
                      !this.state.dateTo ||
                      this.state.loading
                        ? '#DADADA'
                        : '#6379F4'
                    }
                    onPress={this.filterByDate}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
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
    fontFamily: 'NunitoSans-Bold',
    backgroundColor: '#6379F4',
    borderRadius: 8,
    paddingLeft: 8,
    color: 'white',
    paddingVertical: 3,
  },
  btnFilter: {
    backgroundColor: 'white',
    elevation: 3,
    padding: 15,
    alignItems: 'center',
    borderRadius: 12,
    marginRight: 5,
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
  textMessage: {
    fontFamily: 'NunitoSans-SemiBold',
    color: '#8F8F8F',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentModal: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
  },
  gap: {
    flex: 1,
  },
  btnSize: {marginRight: 20},
  flex: {
    flex: 1,
  },
  descModal: {
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
  },
  descDate: {
    fontFamily: 'NunitoSans-Bold',
    color: '#4D4B57',
    fontSize: 16,
    marginBottom: 40,
    marginTop: 5,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  transactionToday,
  pagingGetTransactionToday,
  transactionWeek,
  pagingGetTransactionWeek,
  transactionMonth,
  pagingGetTransactionMonth,
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionHistory);
