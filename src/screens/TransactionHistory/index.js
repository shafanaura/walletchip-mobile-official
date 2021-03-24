import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
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

export class TransactionHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      show: false,
      value: '',
      modalVisible: false,
      sortUp: false,
      loading: false,
    };
  }
  async componentDidMount() {
    await this.props.transactionToday(this.props.auth.token);
    this.props.transactionWeek(this.props.auth.token);
    this.props.transactionMonth(this.props.auth.token);
  }
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
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
  render() {
    const {modalVisible} = this.state;
    const {date, show, sortUp} = this.state;
    const {
      todayTransaction,
      weekTransaction,
      monthTransaction,
    } = this.props.transaction;
    return (
      <View style={styles.container}>
        {/* Transaction Today */}
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
        <Text style={styles.desc}>Week</Text>
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
        <Text style={styles.desc}>Month</Text>
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

        {/* Transaction Month */}
        {/* <Text style={styles.desc}>This Month</Text>
        {monthTransaction !== undefined ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={monthTransaction}
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
            onEndReached={this.nextMonth}
            onEndReachedThreshold={0.5}
          />
        ) : (
          <Text style={styles.textMessage}>No transaction...</Text>
        )} */}
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
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
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
                  <TouchableOpacity>
                    <Text style={styles.descDate}>Select a date</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.flex}>
                  <Text style={styles.descModal}>To</Text>
                  <TouchableOpacity>
                    <Text style={styles.descDate}>Select a date</Text>
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
                    textColor="white"
                    color="#6379F4"
                    onPress={() =>
                      this.setState({
                        show: !show,
                      })
                    }
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
