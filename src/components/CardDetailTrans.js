import React, {Component} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import listTransaction from '../utils/listTransaction';

export class CardDetailTrans extends Component {
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  render() {
    return (
      <View>
        <FlatList
          inverted={true}
          data={listTransaction}
          keyExtractor={item => item.id}
          renderItem={({item}) => {
            return (
              <View style={styles.wrapHeader}>
                <View style={styles.row}>
                  <Image source={{uri: item.picture}} style={styles.avatar} />
                  <View style={styles.descAvatar}>
                    <Text style={styles.textName}>
                      {item.firstName} {item.lastName}
                    </Text>
                    <Text style={styles.category}>Transfer</Text>
                  </View>
                </View>
                <Text
                  style={[
                    styles.total,
                    item.userAs === 'sender'
                      ? styles.textDanger
                      : styles.textPrimary,
                  ]}>
                  {item.userAs === 'sender' ? '-' : '+'}Rp
                  {this.onChangeRupiah(item.total)}
                </Text>
              </View>
            );
          }}
        />
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
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
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
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  textName: {
    fontFamily: 'NunitoSans-SemiBold',
    fontSize: 18,
  },
  category: {
    fontFamily: 'NunitoSans-Regular',
    color: '#646464',
  },
  total: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 18,
  },
  container: {
    flex: 1,
  },
  textDanger: {
    color: '#FF5B37',
  },
  textPrimary: {
    color: '#1EC15F',
  },
});

export default CardDetailTrans;
