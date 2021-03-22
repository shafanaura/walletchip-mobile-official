import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList, Image, Text, View, TextInput, StyleSheet} from 'react-native';
import CardContact from '../../components/CardContact';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {
  getContact,
  getContactQuickAccess,
  createTransferData,
} from '../../redux/actions/user';

export class SearchReceiver extends Component {
  gotoInputAmount(id) {
    this.props.createTransferData({receiverId: id});
    this.props.navigation.navigate('InputAmount');
  }
  async componentDidMount() {
    this.props.getContact(this.props.auth.token);
    this.props.getContactQuickAccess(this.props.auth.token);
  }
  render() {
    const {allContact, quickAccess} = this.props.user;
    return (
      <View style={styles.container}>
        <Icon name="search" size={24} color="#A9A9A9" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Search receiver here"
        />
        <Text style={styles.textQuick}>Quick Access</Text>
        <View style={styles.wrapText}>
          {quickAccess === undefined ? (
            <Text style={styles.textMessage}>{this.props.user.message}</Text>
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              horizontal
              data={quickAccess}
              keyExtractor={item => item.id}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={this.gotoInputAmount}
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
        <Text style={styles.textDesc}>17 Contacts Founds</Text>
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
        />
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
});

const mapDispatchToProps = {
  getContact,
  getContactQuickAccess,
  createTransferData,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchReceiver);
