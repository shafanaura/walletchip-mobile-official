import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  FlatList,
  Image,
  Text,
  View,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import CardContact from '../../components/CardContact';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  getContact,
  getContactQuickAccess,
  pagingGetContact,
} from '../../redux/actions/user';
import {selectReceiver} from '../../redux/actions/transaction';

export class SearchReceiver extends Component {
  state = {
    search: '',
    loading: false,
    message: '',
  };
  gotoInputAmount(id) {
    this.props.selectReceiver(id);
    this.props.navigation.navigate('InputAmount');
  }
  async componentDidMount() {
    this.props.getContact(this.props.auth.token);
    this.props.getContactQuickAccess(this.props.auth.token);
  }
  next = async () => {
    if (
      this.props.user.pageInfoContact.currentPage <
      this.props.user.pageInfoContact.totalPage
    ) {
      const {search} = this.state;
      this.props.pagingGetContact(
        this.props.auth.token,
        search,
        this.props.user.pageInfoContact.currentPage + 1,
      );
    }
  };
  search = async value => {
    this.setState({loading: true, search: value});
    await this.props.getContact(this.props.auth.token, value);
    if (this.props.user.allContact.length > 0) {
      this.setState({
        message: '',
        loading: false,
      });
    } else {
      this.setState({
        message: `${value} Not Found`,
        loading: false,
      });
    }
  };
  render() {
    const {allContact, quickAccessContact} = this.props.user;
    return (
      <View style={styles.container}>
        <Icon name="search" size={24} color="#A9A9A9" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Search receiver here"
          onChangeText={value => this.search(value)}
        />
        <Text style={styles.textQuick}>Quick Access</Text>
        <View style={styles.wrapText}>
          {quickAccessContact === undefined ? (
            <Text style={styles.textMessage}>{this.props.user.message}</Text>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              horizontal
              data={quickAccessContact}
              keyExtractor={item => item.transactionDate}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => this.gotoInputAmount(item.id)}
                    style={styles.wrapHeader}>
                    <Image source={{uri: item.picture}} style={styles.avatar} />
                    <Text style={styles.textName}>{item.first_name}</Text>
                    <Text style={styles.number}>{item.phone}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
        <Text style={styles.textQuick}>All Contacts</Text>
        <Text style={styles.textDesc}>
          {this.props.user.pageInfoContact.totalData} Contacts Founds
        </Text>
        {this.state.loading ? (
          <ActivityIndicator size="large" color="#000000" />
        ) : this.state.message !== '' ? (
          <Text>{this.state.message}</Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={allContact}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <CardContact
                  onPress={() => this.gotoInputAmount(item.id)}
                  picture={item.picture}
                  firstName={
                    item.first_name === null ? item.username : item.first_name
                  }
                  lastName={item.last_name !== null && item.last_name}
                  detail={item.phone}
                />
              );
            }}
            onEndReached={this.next}
            onEndReachedThreshold={0.5}
          />
        )}
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
  textInput: {
    backgroundColor: '#E7E9EC',
    paddingLeft: 50,
    fontFamily: 'NunitoSans-Regular',
    borderRadius: 12,
    position: 'relative',
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    zIndex: 1,
    top: 20,
    left: 25,
  },
  textQuick: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
    color: '#514F5B',
  },
  wrapHeader: {
    padding: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    elevation: 2,
    borderRadius: 10,
    marginRight: 20,
    width: 100,
    height: 150,
    marginBottom: 20,
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  row: {
    flexDirection: 'row',
  },
  textName: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 18,
    paddingVertical: 5,
  },
  number: {
    fontFamily: 'NunitoSans-Regular',
    color: '#646464',
    textAlign: 'center',
  },
  textDesc: {
    fontFamily: 'NunitoSans-Regular',
    marginVertical: 10,
    color: '#8F8F8F',
  },
  wrapText: {
    marginVertical: 20,
  },
  textMessage: {
    fontFamily: 'NunitoSans-SemiBold',
    color: '#8F8F8F',
    fontSize: 18,
  },
});

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
  transaction: state.transaction,
});

const mapDispatchToProps = {
  getContact,
  getContactQuickAccess,
  selectReceiver,
  pagingGetContact,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceiver);
