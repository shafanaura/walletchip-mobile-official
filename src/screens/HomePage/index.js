import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardContact from '../../components/CardContact';
import {connect} from 'react-redux';
import {getUser} from '../../redux/actions/user';
import http from '../../helpers/http';

const ButtonTrans = props => {
  return (
    <TouchableOpacity style={styles.btn} {...props}>
      <Icon name={props.icon} size={28} color="#6379F4" />
      <Text style={styles.descBtn}>{props.title}</Text>
    </TouchableOpacity>
  );
};

export class HomePage extends Component {
  state = {
    showResults: undefined,
    loading: false,
  };
  async componentDidMount() {
    await this.props.getUser(this.props.auth.token);
    const response = await http(this.props.auth.token).get(
      'api/transaction-history?limit=6',
    );
    this.setState({
      showResults: response.data.results,
    });
  }
  gotoDetail = () => {
    this.props.navigation.navigate('DetailTransaction');
  };
  gotoReceiver = () => {
    this.props.navigation.navigate('SearchReceiver');
  };
  gotoHistory = () => {
    this.props.navigation.navigate('TransactionHistory');
  };
  gotoTopUp = () => {
    this.props.navigation.navigate('TopUp');
  };
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  render() {
    const {balance, phone} = this.props.user.results;
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.cardBalance} onPress={this.gotoDetail}>
          <Text style={styles.desc}>Balance</Text>
          <Text style={styles.balance}>Rp{this.onChangeRupiah(balance)}</Text>
          <Text style={styles.desc}>
            {phone ? `+62 ${phone}` : 'No phone number'}
          </Text>
        </TouchableOpacity>
        <View style={styles.rowBtn}>
          <ButtonTrans
            icon="arrow-up"
            title="Transfer"
            onPress={this.gotoReceiver}
          />
          <ButtonTrans onPress={this.gotoTopUp} icon="plus" title="Top Up" />
        </View>
        <View style={styles.wrapCard}>
          <View style={styles.row}>
            <Text style={styles.textBold}>Transaction History</Text>
            <TouchableOpacity onPress={this.gotoHistory}>
              <Text style={styles.textLink}>See all</Text>
            </TouchableOpacity>
          </View>
          {this.state.showResults !== undefined ? (
            <FlatList
              showsVerticalScrollIndicator={false}
              style={{minHeight: 290, maxHeight: 290}}
              data={this.state.showResults}
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

const mapDispatchToProps = {getUser};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
