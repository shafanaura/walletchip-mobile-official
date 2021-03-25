import React, {Component} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardContact from '../../components/CardContact';
import Chart from '../../components/Chart';
import {connect} from 'react-redux';
import {
  totalTransaction,
  transactionHistory,
} from '../../redux/actions/transaction';
export class DetailTransaction extends Component {
  async componentDidMount() {
    await this.props.transactionHistory(this.props.auth.token);
    await this.props.totalTransaction(this.props.auth.token);
  }
  gotoHistory() {
    this.props.navigation.navigate('TransactionHistory');
  }
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  found = data => {
    return data === 20;
  };
  render() {
    const {total} = this.props.transaction;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <View style={styles.row}>
            {total && (
              <>
                <View style={styles.cardContent}>
                  <Icon name="arrow-down" size={28} color="#1EC15F" />
                  <Text style={styles.textDesc}>Income</Text>
                  <Text style={styles.textTotal}>
                    Rp{this.onChangeRupiah(total.income)}
                  </Text>
                </View>
                <View style={styles.cardContent}>
                  <Icon name="arrow-up" size={28} color="#FF5B37" />
                  <Text style={styles.textDesc}>Expense</Text>
                  <Text style={styles.textTotal}>
                    Rp{this.onChangeRupiah(total.expense)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
        <Text style={styles.textBold}>In This Week</Text>
        <Chart />
        <View style={styles.rowCard}>
          <Text style={styles.textBold}>Transaction History</Text>
          <TouchableOpacity onPress={() => this.gotoHistory()}>
            <Text style={styles.textLink}>See all</Text>
          </TouchableOpacity>
        </View>
        {this.props.transaction.results !== undefined ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={this.props.transaction.results}
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
          />
        ) : (
          <Text style={styles.textMessage}>
            You has no transaction history...
          </Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
  },
  card: {
    padding: 20,
    justifyContent: 'space-between',
    borderRadius: 20,
    backgroundColor: '#6379F4',
    height: 130,
    marginBottom: 5,
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
    marginVertical: 5,
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
  textMessage: {
    fontFamily: 'NunitoSans-SemiBold',
    color: '#8F8F8F',
    fontSize: 18,
    textAlign: 'center',
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transaction: state.transaction,
});

const mapDispatchToProps = {totalTransaction, transactionHistory};

export default connect(mapStateToProps, mapDispatchToProps)(DetailTransaction);
