import React, {Component} from 'react';
import {StyleSheet, Text, View, ActivityIndicator} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardInfo from '../../components/CardInfo';
import LayoutDetail from '../../components/LayoutDetail';

import {connect} from 'react-redux';
import {
  transactionToday,
  pagingGetTransactionToday,
} from '../../redux/actions/transaction';

export class Notification extends Component {
  state = {
    loading: false,
  };
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  async componentDidMount() {
    this.setState({loading: true});
    await this.props.transactionToday(this.props.auth.token);
    this.setState({loading: false});
  }
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
  render() {
    return (
      <View style={styles.container}>
        <LayoutDetail desc="Today">
          {this.state.loading ? (
            <ActivityIndicator size="large" color="#000000" />
          ) : this.props.transaction.errorMsg !== '' ? (
            <Text>{this.props.transaction.errorMsg}</Text>
          ) : (
            <FlatList
              style={{marginBottom: 40}}
              showsVerticalScrollIndicator={false}
              keyExtractor={item => item.id}
              data={this.props.transaction.todayTransaction}
              renderItem={({item}) => (
                <CardInfo
                  detail={`Rp${this.onChangeRupiah(item.amount)}`}
                  title={`Transfered from ${item.another_user}`}>
                  <Icon
                    size={24}
                    color={item.did_user_transfer === 1 ? '#FF5B37' : '#1EC15F'}
                    name={
                      item.did_user_transfer === 1 ? 'arrow-up' : 'arrow-down'
                    }
                  />
                </CardInfo>
              )}
              onEndReached={this.nextDay}
              onEndReachedThreshold={0.5}
            />
          )}
        </LayoutDetail>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: 'white',
    flex: 1,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  transaction: state.transaction,
});

const mapDispatchToProps = {transactionToday, pagingGetTransactionToday};

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
