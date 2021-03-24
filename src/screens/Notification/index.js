import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import CardInfo from '../../components/CardInfo';
import LayoutDetail from '../../components/LayoutDetail';
import listTransaction from '../../utils/listTransaction';

export class Notification extends Component {
  onChangeRupiah = angka => {
    var reverse = angka.toString().split('').reverse().join(''),
      ribuan = reverse.match(/\d{1,3}/g);
    ribuan = ribuan.join('.').split('').reverse().join('');
    return ribuan;
  };
  render() {
    return (
      <View style={styles.container}>
        <LayoutDetail desc="Today">
          <FlatList
            style={{marginBottom: 40}}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={listTransaction}
            renderItem={({item}) => (
              <CardInfo
                detail={`Rp${this.onChangeRupiah(item.total)}`}
                title={`Transfered from ${
                  item.firstName + ' ' + item.lastName
                }`}>
                <Icon
                  size={24}
                  color={item.userAs === 'sender' ? '#FF5B37' : '#1EC15F'}
                  name={item.userAs === 'sender' ? 'arrow-up' : 'arrow-down'}
                />
              </CardInfo>
            )}
          />
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

export default Notification;
