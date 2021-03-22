import React, {Component} from 'react';
import {Text, StyleSheet, View, ScrollView, TextInput} from 'react-native';
import {Formik} from 'formik';
import {connect} from 'react-redux';
import {updatePhone} from '../../redux/actions/user';
import {showMessage} from '../../helpers/showMessage';

import InputText from '../../components/Form/InputTextPhone';
import Button from '../../components/Button';

class AddPhone extends Component {
  state = {
    loading: false,
  };
  onSubmit = async values => {
    this.setState({loading: true});
    const {token} = this.props.auth;
    const {phone} = values;
    await this.props.updatePhone(token, phone);
    if (this.props.user.errorMsg === '') {
      this.setState({loading: false});
      showMessage(this.props.user.message, 'success');
      this.props.navigation.navigate('ManagePhone');
    } else {
      this.setState({loading: false});
      showMessage(this.props.user.errorMsg);
    }
  };
  phoneValidation(values) {
    const errors = {};
    const {phone} = values;

    if (!phone) {
      errors.msg = 'Phone number Required';
    } else if (phone.length < 10) {
      errors.msg = 'Minimum 10 digits phone number';
    }
    return errors;
  }
  render() {
    return (
      <Formik
        initialValues={{
          phone: '',
        }}
        validate={values => this.phoneValidation(values)}
        onSubmit={values => this.onSubmit(values)}>
        {({handleChange, handleSubmit, handleBlur, values, errors}) => (
          <View style={styles.container}>
            <View>
              <Text style={styles.text}>
                Add at least one phone number for the transfer ID so you can
                start transfering your money to another user.
              </Text>
              <View>
                <InputText
                  icon="phone"
                  keyboardType="number-pad"
                  placeholder="Enter your phone number"
                  sizeIcon={25}
                  onChange={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                  error={errors.msg}
                />
                <View style={styles.gap} />
                {errors.msg ? (
                  <Text style={styles.textError}>{errors.msg}</Text>
                ) : null}
                <View style={styles.gap} />
              </View>
            </View>
            <Button
              onPress={handleSubmit}
              disabled={values.phone === ''}
              color={values.phone === '' ? '#DADADA' : '#6379F4'}
              textColor={values.phone === '' ? '#88888F' : 'white'}
              text="Submit"
            />
          </View>
        )}
      </Formik>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.user,
});

const mapDispatchToProps = {updatePhone};

export default connect(mapStateToProps, mapDispatchToProps)(AddPhone);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
  },
  text: {
    fontSize: 15,
    fontFamily: 'NunitoSans-Regular',
    color: '#7A7886',
    marginBottom: 40,
    textAlign: 'center',
  },
  gap: {
    height: 20,
  },
  textError: {
    fontFamily: 'NunitoSans-Regular',
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});
