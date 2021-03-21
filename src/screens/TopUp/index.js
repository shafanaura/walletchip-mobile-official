import React, {Component} from 'react';
import {StyleSheet, Text, View, Modal, TextInput} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import Button from '../../components/Button';
import CardInfo from '../../components/CardInfo';
import LayoutDetail from '../../components/LayoutDetail';
import listTopUp from '../../utils/listTopUp';

const CardTopUp = props => {
  return (
    <View style={styles.wrapHeader}>
      <View style={styles.rowCard}>
        <Text style={styles.number}>{props.number}</Text>
        <Text style={styles.step}>{props.step}</Text>
      </View>
    </View>
  );
};

export class TopUp extends Component {
  state = {
    isEnabled: false,
    modalVisible: false,
    profile: null,
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  render() {
    const {modalVisible, value} = this.state;
    return (
      <View style={styles.container}>
        <CardInfo title="Virtual Account Number" detail="2389 081393877946">
          <TouchableOpacity
            style={styles.btn}
            onPress={() => this.setModalVisible(true)}>
            <Icon name="plus" size={28} color="#6379F4" />
          </TouchableOpacity>
        </CardInfo>
        <Text style={styles.desc}>
          We provide you virtual account number for top up via nearest ATM.
        </Text>
        <LayoutDetail desc="How to Top-Up">
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id}
            data={listTopUp}
            renderItem={({item}) => (
              <CardTopUp number={item.id} step={item.text} />
            )}
          />
        </LayoutDetail>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.rowModal}>
              <Text style={styles.textAmount}>Amount</Text>
              <TextInput
                keyboardType="number-pad"
                style={styles.input}
                placeholder="0.00"
              />
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
                  <Button text="Confirm" textColor="white" color="#6379F4" />
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
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EBEEF2',
    padding: 10,
    borderRadius: 10,
  },
  desc: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 16,
    color: '#7A7886',
    textAlign: 'center',
    marginVertical: 10,
  },
  wrapHeader: {
    padding: 10,
    height: 80,
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 10,
    marginVertical: 10,
    justifyContent: 'center',
  },
  number: {
    fontFamily: 'NunitoSans-Bold',
    color: '#6379F4',
    textAlign: 'center',
    fontSize: 18,
    marginHorizontal: 10,
  },
  step: {
    color: '#7A7886',
    fontSize: 16,
    fontFamily: 'NunitoSans-Bold',
    marginLeft: 10,
    flex: 1,
  },
  rowCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gap: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  rowModal: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  btnSize: {marginRight: 20},
  row: {
    flexDirection: 'row',
  },
  input: {
    fontSize: 32,
    fontFamily: 'NunitoSans-Bold',
    color: '#000',
    marginVertical: 26,
    textAlign: 'center',
  },
  textAmount: {
    fontSize: 18,
    fontFamily: 'NunitoSans-Bold',
  },
});

export default TopUp;
