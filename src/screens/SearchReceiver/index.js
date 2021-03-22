import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {FlatList, Image, Text, View, TextInput, StyleSheet} from 'react-native';
import listTransaction from '../../utils/listTransaction';
import CardContact from '../../components/CardContact';
import {TouchableOpacity} from 'react-native-gesture-handler';

export class SearchReceiver extends Component {
  gotoInputAmount = () => {
    this.props.navigation.navigate('InputAmount');
  };
  render() {
    return (
      <View style={styles.container}>
        <Icon name="search" size={24} color="#A9A9A9" style={styles.icon} />
        <TextInput
          style={styles.textInput}
          placeholder="Search receiver here"
        />
        <Text style={styles.textQuick}>Quick Access</Text>
        <View style={styles.wrapText}>
          <FlatList
            showsVerticalScrollIndicator={false}
            horizontal
            data={listTransaction}
            keyExtractor={item => item.id}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={this.gotoInputAmount}
                  style={styles.wrapHeader}>
                  <Image source={{uri: item.picture}} style={styles.avatar} />
                  <Text style={styles.textName}>{item.firstName}</Text>
                  <Text style={styles.number}>{item.phoneNumber}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
        <Text style={styles.textQuick}>All Contacts</Text>
        <Text style={styles.textDesc}>17 Contacts Founds</Text>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={listTransaction}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <CardContact
                onPress={this.gotoInputAmount}
                picture={item.picture}
                firstName={item.firstName}
                lastName={item.lastName}
                detail={item.phoneNumber}
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
    maxWidth: 100,
    maxHeight: 150,
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
    marginTop: 20,
    marginBottom: 10,
  },
});

export default SearchReceiver;
