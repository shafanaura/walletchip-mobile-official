import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Avatar from '../assets/image/avatar.jpg';

export class HeaderHome extends Component {
  render() {
    return (
      <View style={styles.wrapHeader}>
        <View style={styles.row}>
          <Image source={Avatar} style={styles.avatar} />
          <View style={styles.descAvatar}>
            <Text style={styles.hello}>Hello,</Text>
            <Text style={styles.title}>Robert Chandler</Text>
          </View>
        </View>
        <Icon name="bell" size={28} color="#4D4B57" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapHeader: {
    padding: 10,
    height: 80,
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
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
  descAvatar: {
    justifyContent: 'center',
    marginLeft: 10,
  },
  hello: {
    fontFamily: 'NunitoSans-Regular',
    color: '#646464',
    fontSize: 16,
  },
  title: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 16,
  },
});

export default HeaderHome;
