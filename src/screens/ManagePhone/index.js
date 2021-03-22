import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';

import {connect} from 'react-redux';
import {updatePhone} from '../../redux/actions/user';
import {showMessage} from '../../helpers/showMessage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Import Components

class ManagePhone extends Component {
  state = {
    loading: false,
  };

  onSubmit = async () => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    const phone = '0000000000';
    await this.props.updatePhone(token, phone);
    if (this.props.user.errorMsg === '') {
      this.setState({loading: false});
      showMessage(this.props.user.message, 'success');
      this.props.navigation.navigate('SignIn');
    } else {
      this.setState({loading: false});
      showMessage(this.props.user.errorMsg);
    }
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />
        <Text style={styles.subtitle}>
          You can only delete the phone number and then you must add another
          phone number.
        </Text>
        <View style={styles.card}>
          <TouchableOpacity
            style={{
              width: '90%',
            }}>
            <Text style={styles.btnTitle}>Primary</Text>
            <Text style={styles.btnPhone}>+62-813-9387-7946</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this.onSubmit}
            style={{
              width: '10%',
            }}>
            <Image
              style={{width: 24, height: 24}}
              source={require('../../assets/icons/trash.png')}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {updatePhone};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePhone);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
  },
  subtitle: {
    color: 'gray',
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
    fontSize: 15,
    lineHeight: 25,
  },
  card: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    marginTop: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  btnTitle: {
    color: 'gray',
    fontFamily: 'NunitoSans-Regular',
    marginBottom: 8,
    fontSize: 15,
  },
  btnPhone: {
    fontFamily: 'NunitoSans-Bold',
    fontWeight: 'bold',
    fontSize: 17,
  },
});
